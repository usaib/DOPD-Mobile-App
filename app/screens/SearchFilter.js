import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import AppBarWrapper from '../components/AppBar';
import {globalStyles} from '../styles/globalStyles';
import {Sort} from '../components/Sort';
import {Specializations} from '../components/Specializations';
import {Surface, Button} from 'react-native-paper';
import {styles} from '../components/RegisterForm';
export const SearchFilter = ({navigation}) => {
  const toggle = () => {
    navigation?.toggleDrawer();
  };
  const [sortBy, setSortBy] = useState({
    'Doctors near me': false,
    'Female Doctors': false,
    'Male Doctors': false,
    'Most Rated': false,
    'Most Experienced': false,
  });
  const [filterBy, setFilterBy] = useState(null);

  const filterSearch = () => {
    console.log('filter by', filterBy);
    console.log('Sort by', sortBy);
  };
  return (
    <View style={globalStyles.container}>
      <AppBarWrapper
        title={'Filter'}
        onPress={() => {
          navigation.navigate('FindDoctors');
        }}
        showMenu={true}
        showButton={false}
        onMenuPress={toggle}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 10,
        }}>
        <View style={{paddingHorizontal: 20, marginTop: 30, marginBottom: 20}}>
          <Text style={globalStyles.cardHeading}>Sort</Text>
          <Sort sortBy={sortBy} setSortBy={setSortBy} />
          <Text style={globalStyles.cardHeading}>All Specializations</Text>
          <Specializations filterBy={filterBy} setFilterBy={setFilterBy} />
        </View>
        <Surface style={[searcFilterStyles.btnCont]}>
          <Button
            mode="contained"
            labelStyle={{
              textTransform: 'capitalize',
              fontWeight: '600',
              fontSize: 16,
            }}
            onPress={filterSearch}
            style={searcFilterStyles.submitBtn}
            disabled={
              !(Object.values(sortBy).some(item => item === true) && filterBy)
            }>
            Apply Filter
          </Button>
        </Surface>
      </ScrollView>
    </View>
  );
};
const searcFilterStyles = StyleSheet.create({
  btnCont: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c9c9c9',
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
  submitBtn: {
    padding: 8.5,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#0381d1',
    alignSelf: 'stretch',
    shadowColor: 'transparent',
  },
});
