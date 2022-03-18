import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {RegisterForm} from '../components/RegisterForm';

export const Signup = ({navigation}) => {
  return (
    <View style={styles.mainCont}>
      <View style={styles.header}>
        <View style={styles.imgCont}>
          <View style={styles.imgContin}>
            <Image
              source={require('../images/signup.png')}
              style={{height: 34, width: 34, top: 5, left: 4}}
            />
          </View>
        </View>
        <View style={styles.tip}></View>
      </View>
      <View style={styles.subCont}>
        <Text style={styles.head}>Let's get you started!</Text>
        <Text style={styles.subhead}>
          First, create your DigitalOPD account
        </Text>
        <RegisterForm navigation={navigation} />
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
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

export default Signup;
