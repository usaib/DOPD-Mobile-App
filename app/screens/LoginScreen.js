import React, {useState} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Button, TextInput, Text, Snackbar, Surface} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useUserDispatch} from '../context/userContext';
import {signIn} from '../services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles} from '../components/RegisterForm';
import {ErrorSnackbar} from '../components/Snackbar';

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
  const [passwordVisible, setPasswordVisible] = useState(true);
  const userDispatch = useUserDispatch();
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('Error in saving', e);
    }
  };

  const onSubmit = async (values, actions) => {
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
          userDispatch({
            type: 'LOGIN_SUCCESS',
            payload: {user: resp.data.data},
          });
          storeData('isAuthenticated', 'true');
          console.log('userId', resp.data.data.id, resp.data);
          const id = '' + resp.data.data.id;
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
  };

  return (
    <View style={styles.mainCont}>
      <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
      <View style={styles.header}>
        <View style={styles.imgCont}>
          <View style={styles.imgContin}>
            <Image
              source={require('../images/login.png')}
              style={{height: 30, width: 30, top: 7, left: 7}}
            />
          </View>
        </View>
        <View style={styles.tip}></View>
      </View>
      <View style={styles.subCont}>
        <Text style={styles.head}>Hey, Welcome Back!</Text>
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={[styles.subhead, {color: '#a1a1a1'}]}>
          Not have an Account ?{' '}
          <Text style={{fontWeight: '600', color: '#05375a'}}>Sign up</Text>
        </Text>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                position: 'relative',
                paddingHorizontal: 20,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <TextInput
                  theme={{roundness: 10}}
                  mode="outlined"
                  label="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  activeOutlineColor="#05375a"
                  outlineColor="#d9d9d9"
                  style={styles.textInput}
                />
                <Text style={styles.errorText}>
                  {touched.email && errors.email}
                </Text>
                <TextInput
                  theme={{roundness: 10}}
                  label="Password"
                  mode="outlined"
                  right={
                    <TextInput.Icon
                      name={passwordVisible ? 'eye' : 'eye-off'}
                      color="#0381d1"
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                  }
                  secureTextEntry={passwordVisible}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  activeOutlineColor="#05375a"
                  outlineColor="#d9d9d9"
                  style={styles.textInput}
                />
                <Text style={styles.errorText}>
                  {touched.password && errors.password}
                </Text>
                <Text
                  style={{color: '#05375a', fontWeight: '500'}}
                  onPress={() => console.log('Forgot Password')}>
                  {' '}
                  Forgot Password?
                </Text>
              </View>
              <Surface style={[styles.btnCont]}>
                <Button
                  loading={loading}
                  style={styles.submitBtn}
                  icon="lock"
                  mode="contained"
                  onPress={handleSubmit}
                  title="Submit">
                  <Text style={styles.button}>Login</Text>
                </Button>
              </Surface>
              <ErrorSnackbar
                message={'Email or Password is Invalid'}
                error={error}
                setError={setError}></ErrorSnackbar>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0381d1',
//   },
//   spinnerTextStyle: {
//     color: '#0381d1',
//   },
//   logoView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '45%',
//     width: '100%',
//     backgroundColor: '#0381d1',
//   },
//   loginView: {
//     justifyContent: 'center',
//     padding: 20,
//     width: '100%',
//     height: '55%',
//     backgroundColor: 'white',
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//   },
//   button: {
//     fontFamily: 'Gibson-Regular',
//     color: 'white',
//   },
//   title: {fontFamily: 'Gibson-Regular', color: 'white', fontSize: 40},
//   checkboxView: {
//     flexDirection: 'row',
//     bottom: 10,
//   },
//   text: {
//     bottom: -5,
//     color: '#0381d1',
//     fontFamily: 'Gibson-Regular',
//     fontSize: 16,
//   },
//   errorText: {
//     color: 'red',
//     fontFamily: 'Gibson-Regular',
//     fontSize: 16,
//   },
//   forgotText: {
//     marginLeft: 10,
//     color: '#0381d1',
//     fontFamily: 'Gibson-Regular',
//     fontSize: 16,
//   },
//   forgotPasswordView: {
//     flexDirection: 'row',
//     top: 5,
//     justifyContent: 'space-between',
//   },
// });
export default LoginScreen;
