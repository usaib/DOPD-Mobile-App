import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Button, TextInput, Text, Snackbar} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useUserDispatch} from '../context/userContext';
import {signIn} from '../services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: yup.string().max(255).required('Password is required'),
});
function LoginScreen({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const userDispatch = useUserDispatch();
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('Error in saving', e);
    }
  };
  const onDismissSnackBar = () => setError(false);

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        setLoading(true);
        console.log(values);
        try {
          const resp = await signIn({
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe,
          });

          if (resp) {
            setTimeout(() => {
              userDispatch({type: 'LOGIN_SUCCESS'});
              storeData('isAuthenticated', 'true');
              console.log(resp.data.data.userInfo.id);
              const id = '' + resp.data.data.userInfo.id;
              storeData('id', id);
              setLoading(false);
            }, 500);
          } else {
            console.log('login failed');
            setLoading(false);
            actions.resetForm({
              values: {
                password: '',
              },
            });
          }
        } catch (e) {
          console.log('An error has occurred', e);
          setLoading(false);
          setError(true);
          actions.resetForm({
            values: {
              password: '',
            },
          });
        }
        setLoading(false);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
          <Snackbar
            visible={error}
            onDismiss={onDismissSnackBar}
            duration={1000}>
            email or password is invalid
          </Snackbar>
          <View style={styles.logoView}>
            <Image
              source={require('../images/stethoscopes.png')}
              style={{height: 100, width: 100}}
            />
          </View>
          <View style={styles.loginView}>
            <TextInput
              label="Email"
              mode="outlined"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email}
            />
            <Text style={styles.errorText}>
              {touched.email && errors.email}
            </Text>
            <TextInput
              type="password"
              label="Password"
              mode="outlined"
              secureTextEntry={true}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password}
              onChangeText={handleChange('password')}
            />
            <Text style={styles.errorText}>
              {touched.password && errors.password}
            </Text>
            <View style={styles.checkboxView}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={prevState => setToggleCheckBox(!toggleCheckBox)}
                onCheckColor="#0381d1"
                tintColors={{true: '#0381d1', false: '#00000'}}
              />
              <Text style={styles.text}>Remember Me</Text>
            </View>
            <Button
              loading={loading}
              style={styles.button}
              icon="lock"
              mode="contained"
              onPress={handleSubmit}
              title="Submit">
              <Text style={styles.button}>Login</Text>
            </Button>
            <View style={styles.forgotPasswordView}>
              <Text style={styles.forgotText}>Forgot password?</Text>
              <Text style={styles.forgotText}>No account? Sign Up</Text>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0381d1',
  },
  spinnerTextStyle: {
    color: '#0381d1',
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '45%',
    width: '100%',
    backgroundColor: '#0381d1',
  },
  loginView: {
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    height: '55%',
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  button: {
    fontFamily: 'Gibson-Regular',
    color: 'white',
  },
  title: {fontFamily: 'Gibson-Regular', color: 'white', fontSize: 40},
  checkboxView: {
    flexDirection: 'row',
    bottom: 10,
  },
  text: {
    bottom: -5,
    color: '#0381d1',
    fontFamily: 'Gibson-Regular',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontFamily: 'Gibson-Regular',
    fontSize: 16,
  },
  forgotText: {
    marginLeft: 10,
    color: '#0381d1',
    fontFamily: 'Gibson-Regular',
    fontSize: 16,
  },
  forgotPasswordView: {
    flexDirection: 'row',
    top: 5,
    justifyContent: 'space-between',
  },
});
export default LoginScreen;
