import React from 'react';
import {View, StyleSheet} from 'react-native';

function Settings() {
  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        {/* <Image source={require('./tw.png')} style={{height: 100, width: 100}} /> */}
      </View>
      <View style={styles.loginView}>
        {/* <Text style={styles.Text}>Welcome Back :) !</Text>
        <Button
          style={styles.button}
          icon="lock"
          mode="contained"
          onPress={async () => {
            userDispatch({type: 'LOGOUT'});
            await removeValue('isAuthenticated');
          }}
          title="Submit">
          <Text style={styles.Text}>Logout</Text>
        </Button> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498DB',
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '100%',
    backgroundColor: '#3498DB',
  },
  loginView: {
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  Text: {
    marginLeft: 10,
    color: '#3498DB',
    fontFamily: 'Gibson-Regular',
    fontSize: 20,
  },
  button: {
    fontFamily: 'Gibson-Regular',
    color: 'white',
  },
});
export default Settings;
