import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TextInput, Button, Surface} from 'react-native-paper';
import {Formik} from 'formik';
import {registerSchema} from '../auth/FormValidation';
export const RegisterForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  return (
    <Formik
      initialValues={{
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        PhoneNumber: '',
      }}
      validationSchema={registerSchema}
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
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 2.5, marginRight: 10}}>
                <TextInput
                  theme={{roundness: 10}}
                  mode="outlined"
                  label="First name"
                  onChangeText={props.handleChange('FirstName')}
                  onBlur={props.handleBlur('FirstName')}
                  value={props.values.FirstName}
                  activeOutlineColor="#05375a"
                  outlineColor="#d9d9d9"
                  style={styles.textInput}
                />
                <Text style={styles.errorText}>
                  {props.touched.FirstName && props.errors.FirstName}
                </Text>
              </View>
              <View style={{flex: 2.5, marginLeft: 10}}>
                <TextInput
                  theme={{roundness: 10}}
                  mode="outlined"
                  label="Last name"
                  onChangeText={props.handleChange('LastName')}
                  onBlur={props.handleBlur('LastName')}
                  value={props.values.LastName}
                  activeOutlineColor="#05375a"
                  outlineColor="#d9d9d9"
                  style={styles.textInput}
                />
                <Text style={styles.errorText}>
                  {props.touched.LastName && props.errors.LastName}
                </Text>
              </View>
            </View>

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
            <TextInput
              theme={{roundness: 10}}
              mode="outlined"
              label="PhoneNumber"
              keyboardType="numeric"
              onChangeText={props.handleChange('PhoneNumber')}
              onBlur={props.handleBlur('PhoneNumber')}
              value={props.values.PhoneNumber}
              activeOutlineColor="#05375a"
              outlineColor="#d9d9d9"
              style={styles.textInput}
            />
            <Text style={styles.errorText}>
              {props.touched.PhoneNumber && props.errors.PhoneNumber}
            </Text>
          </View>
          <Surface style={[styles.btnCont]}>
            <Button
              mode="contained"
              // loading="true"
              onPress={props.handleSubmit}
              style={styles.submitBtn}>
              Sign up
            </Button>
          </Surface>
        </View>
      )}
    </Formik>
  );
};
export const styles = StyleSheet.create({
  textInput: {
    color: '#1b1b1b',
    backgroundColor: 'white',
    height: 45,
    fontSize: 15,
  },
  spinnerTextStyle: {
    color: '#0381d1',
  },
  errorText: {
    color: '#E74C3C',
    marginVertical: 2,
    fontSize: 13,
  },
  btnCont: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c9c9c9',
    position: 'absolute',
    width: Dimensions.get('window').width,
    bottom: 239,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#d4d4d4',
    shadowOffset: {
      width: 0,
      height: -1.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  button: {
    fontFamily: 'Gibson-Regular',
    color: 'white',
  },
  submitBtn: {
    padding: 8.5,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#0381d1',
    alignSelf: 'stretch',
    shadowColor: 'transparent',
  },
  mainCont: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 85,
    width: 50,
    height: 50,
    marginLeft: 20,
    position: 'relative',
  },
  imgCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    backgroundColor: '#FFE194',
    borderRadius: 13,
    position: 'absolute',
    top: 0,
    padding: 6.5,
  },
  imgContin: {
    height: 50,
    width: 50,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#0381d1',
    borderRadius: 25,
  },
  tip: {
    height: 15,
    transform: [{rotate: '45deg'}],
    width: 15,
    backgroundColor: '#FFE194',
    position: 'absolute',
    bottom: -16,
    right: 4,
    zIndex: -1,
  },
  subCont: {
    position: 'relative',
    marginTop: 30,
    height: Dimensions.get('window').height,
  },
  head: {
    fontSize: 25,
    color: '#05375a',
    fontWeight: '600',
    paddingLeft: 20,
    marginBottom: 12,
  },
  subhead: {
    marginBottom: 12,
    paddingLeft: 20,
    fontSize: 15,
  },
});
