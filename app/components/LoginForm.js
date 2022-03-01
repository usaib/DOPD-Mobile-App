import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TextInput, Button, Surface} from 'react-native-paper';
import {Formik} from 'formik';
import {loginSchema} from '../auth/FormValidation';
import {styles} from './RegisterForm';
export const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  return (
    <Formik
      initialValues={{
        Email: '',
        Password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={values => {
        console.log(values);
      }}>
      {props => (
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
              onChangeText={props.handleChange('Email')}
              onBlur={props.handleBlur('Email')}
              value={props.values.Email}
              activeOutlineColor="#05375a"
              outlineColor="#d9d9d9"
              style={styles.textInput}
            />
            <Text style={styles.errorText}>
              {props.touched.Email && props.errors.Email}
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
              onChangeText={props.handleChange('Password')}
              onBlur={props.handleBlur('Password')}
              value={props.values.Password}
              activeOutlineColor="#05375a"
              outlineColor="#d9d9d9"
              style={styles.textInput}
            />
            <Text style={styles.errorText}>
              {props.touched.Password && props.errors.Password}
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
              mode="contained"
              // loading="True"
              onPress={props.handleSubmit}
              style={styles.submiBtn}>
              Log in
            </Button>
            <Button
              loading={loading}
              style={styles.button}
              icon="lock"
              mode="contained"
              onPress={handleSubmit}
              title="Submit">
              <Text style={styles.button}>Login</Text>
            </Button>
          </Surface>
        </View>
      )}
    </Formik>
  );
};
