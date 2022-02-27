import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const Splash = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <Image
        source={require('../images/logoWhite.png')}
        style={{height: 200, width: 200}}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Splash;
