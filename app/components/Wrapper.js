import React from 'react';
import {ScrollView, View, StyleSheet, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
export const Wrapper = props => {
  return (
    <View style={wrapper.wrapperContainer}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={wrapper.wrapper}>
          {props.children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const wrapper = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    paddingBottom: 60,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#f9f9f9',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: 20,
    paddingBottom: 40,
  },
});
