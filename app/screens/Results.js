import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {homeStyles} from './HomeScreen';
import ProgressBar from '../components/ProgressBar';
import AppBarWrapper from '../components/AppBar';

export default Results = ({navigation}) => {
  const toggle = () => {
    navigation?.toggleDrawer();
  };
  return (
    <View>
      <AppBarWrapper
        title={'Results'}
        onPress={() => {
          navigation.navigate('Main');
        }}
        showButton={false}
        onMenuPress={toggle}
      />
      <ScrollView style={resultStyle.scrollView}>
        <View style={[homeStyles.top, {height: 225}]}></View>
        <Text style={[homeStyles.openText, {marginTop: 100}]}>Results</Text>
        <Text style={resultStyle.openText}>
          Please note that the list below may not be complete and is provided
          solely for informational purposes and is not a qualified medical
          opinion.
        </Text>
        <View style={resultStyle.cardWrapper}>
          <View style={resultStyle.resCard}>
            <ProgressBar
              percentage={70}
              color={'#2ecc71'}
              textColor={'#2ecc71'}
            />
            <Text style={[homeStyles.openText, {marginLeft: 15, fontSize: 25}]}>
              Headache
            </Text>
          </View>
          <View style={resultStyle.resCard}>
            <ProgressBar
              percentage={20}
              color={'#fec901'}
              textColor={'#fec901'}
            />
            <Text style={[homeStyles.openText, {marginLeft: 15, fontSize: 25}]}>
              Fever
            </Text>
          </View>
          <View style={resultStyle.resCard}>
            <ProgressBar
              percentage={10}
              color={'#d03423'}
              textColor={'#d03423'}
            />
            <Text style={[homeStyles.openText, {marginLeft: 15, fontSize: 25}]}>
              Pneumonia
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const resultStyle = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  openText: {
    fontSize: 15,
    color: '#a1a1a1',
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: 20,
    textAlign: 'justify',
  },
  cardWrapper: {
    marginVertical: 50,
  },
  resCard: {
    backgroundColor: 'white',
    height: 100,
    marginVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    // width: 300,
    padding: 10,
    borderRadius: 4,
    position: 'relative',
    shadowColor: '#1b1b1b96',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
