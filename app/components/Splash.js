import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

const Splash = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <Image
        source={require('../images/logoWhite.png')}
        style={{height: 200, width: 200}}
      />
      <Text style={styles.Text}>DIGITAL OUTPATIENT DEPARTMENT</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498DB',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  Text: {
    marginLeft: 10,
    color: '#FFFFFF',
    fontFamily: 'Gibson-BoldItalic',
    fontSize: 17,
  },
});

export default Splash;
