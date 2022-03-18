import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TextInput, Button, Surface} from 'react-native-paper';
import {Formik} from 'formik';
import {registerSchema} from '../auth/FormValidation';
import DropDownPicker from 'react-native-dropdown-picker';
import {create} from '../services/users';
import {ErrorSnackbar} from './Snackbar';

export const RegisterForm = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [genderSelected, setGenderSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [color, setColor] = useState('#EE4B2B');

  const [gender, setGender] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ]);

  const onSubmit = async (values, actions) => {
    setLoading(true);
    console.log(values);
    try {
      const resp = await create({
        email: values.email,
        password: values.password,
        name: values.name,
        fathername: values.fathername,
        contact_number: values.number,
        age: values.age,
        gender: value,
      });

      if (!resp.data.msg.error) {
        setTimeout(() => {
          setColor('#0381d1');

          setErrorMessage(resp.data.msg);
          setLoading(false);
          setError(true);
          console.log(resp.data);
        }, 700);
      } else {
        console.log('Failed To Create User');
        console.log(resp.data.msg);
        setErrorMessage(resp.data.msg.msg);
        setLoading(false);
        setError(true);
      }
    } catch (e) {
      setErrorMessage(e.msg);
      console.log(e);

      console.log('An error has occurred', e);
      setLoading(false);
      setError(true);
    }
    setLoading(false);
    setColor('#EE4B2B');
  };
  return (
    <Formik
      initialValues={{
        name: '',
        fathername: '',
        email: '',
        password: '',
        number: '',
        age: '',
      }}
      validationSchema={registerSchema}
      onSubmit={onSubmit}>
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
              onChangeText={props.handleChange('email')}
              onBlur={props.handleBlur('email')}
              value={props.values.email}
              activeOutlineColor="#05375a"
              outlineColor="#d9d9d9"
              style={styles.textInput}
            />
            <Text style={styles.errorText}>
              {props.touched.email && props.errors.email}
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
                  label="Your name"
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  value={props.values.name}
                  activeOutlineColor="#05375a"
                  outlineColor="#d9d9d9"
                  style={styles.textInput}
                />
                <Text style={styles.errorText}>
                  {props.touched.name && props.errors.name}
                </Text>
              </View>
              <View style={{flex: 2.5, marginLeft: 10}}>
                <TextInput
                  theme={{roundness: 10}}
                  mode="outlined"
                  label="Father's Name"
                  onChangeText={props.handleChange('fathername')}
                  onBlur={props.handleBlur('fathername')}
                  value={props.values.fathername}
                  activeOutlineColor="#05375a"
                  outlineColor="#d9d9d9"
                  style={styles.textInput}
                />
                <Text style={styles.errorText}>
                  {props.touched.fathername && props.errors.fathername}
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
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              value={props.values.password}
              activeOutlineColor="#05375a"
              outlineColor="#d9d9d9"
              style={styles.textInput}
            />
            <Text style={styles.errorText}>
              {props.touched.password && props.errors.password}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 3.5, marginRight: 10}}>
                <TextInput
                  theme={{roundness: 10}}
                  mode="outlined"
                  label="Phone Number"
                  keyboardType="numeric"
                  onChangeText={props.handleChange('number')}
                  onBlur={props.handleBlur('number')}
                  value={props.values.number}
                  activeOutlineColor="#05375a"
                  outlineColor="#d9d9d9"
                  style={styles.textInput}
                />
                <Text style={styles.errorText}>
                  {props.touched.number && props.errors.number}
                </Text>
              </View>
              <View style={{flex: 1.5, marginRight: 10}}>
                <TextInput
                  theme={{roundness: 10}}
                  mode="outlined"
                  label="Age"
                  keyboardType="numeric"
                  onChangeText={props.handleChange('age')}
                  onBlur={props.handleBlur('age')}
                  value={props.values.age}
                  activeOutlineColor="#05375a"
                  outlineColor="#d9d9d9"
                  style={styles.textInput}
                />
                <Text style={styles.errorText}>
                  {props.touched.age && props.errors.age}
                </Text>
              </View>
            </View>
            <DropDownPicker
              open={open}
              value={value}
              placeholder="Gender"
              items={gender}
              setOpen={setOpen}
              style={{
                borderColor: '#c9c9c9',
              }}
              setValue={setValue}
              setItems={setGender}
              onChangeValue={value => {
                setGenderSelected(false);
              }}
              onClose={() => {
                if (value) {
                  setGenderSelected(false);
                } else {
                  setGenderSelected(true);
                }
              }}
              labelProps={{
                label: 'Gender',
              }}
            />
            {genderSelected && (
              <Text style={styles.errorText}>Gender is required</Text>
            )}
          </View>
          <Surface style={[styles.btnCont]}>
            <Button
              mode="contained"
              loading={loading}
              onPress={props.handleSubmit}
              style={styles.submitBtn}>
              Sign up
            </Button>
          </Surface>
          <ErrorSnackbar
            message={errorMessage}
            error={error}
            color={color}
            setError={setError}></ErrorSnackbar>
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
