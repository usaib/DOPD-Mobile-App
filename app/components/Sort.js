import React from 'react';
import {View} from 'react-native';
import {Checkbox} from '../components/Checkbox';
export const Sort = ({sortBy, setSortBy}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        marginBottom: 20,
      }}>
      <Checkbox
        title={'Doctors near me'}
        onPress={() => {
          setSortBy(prevState => ({
            ...prevState,
            'Doctors near me': !sortBy['Doctors near me'],
          }));
        }}
        status={sortBy['Doctors near me']}
      />
      <Checkbox
        title={'Female Doctors'}
        onPress={() => {
          setSortBy(prevState => ({
            ...prevState,
            'Female Doctors': !sortBy['Female Doctors'],
          }));
        }}
        status={sortBy['Female Doctors']}
      />
      <Checkbox
        title={'Male Doctors'}
        onPress={() => {
          setSortBy(prevState => ({
            ...prevState,
            'Male Doctors': !sortBy['Male Doctors'],
          }));
        }}
        status={sortBy['Male Doctors']}
      />
      <Checkbox
        title={'Most Rated'}
        onPress={() => {
          setSortBy(prevState => ({
            ...prevState,
            'Most Rated': !sortBy['Most Rated'],
          }));
        }}
        status={sortBy['Most Rated']}
      />
      <Checkbox
        title={'Most Experienced'}
        onPress={() => {
          setSortBy(prevState => ({
            ...prevState,
            'Most Experienced': !sortBy['Most Experienced'],
          }));
        }}
        status={sortBy['Most Experienced']}
      />
    </View>
  );
};
