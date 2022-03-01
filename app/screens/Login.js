import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {LoginForm} from '../components/LoginForm';
import {styles} from './Signup';
export const Login = () => {
  return (
    <View style={styles.mainCont}>
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
        <Text style={[styles.subhead, {color: '#a1a1a1'}]}>
          If you are new /{' '}
          <Text
            onPress={() => console.log('signup screen')}
            style={{fontWeight: '600', color: '#05375a'}}>
            Sign up
          </Text>
        </Text>

        <LoginForm />
      </View>
    </View>
  );
};

export default Login;
