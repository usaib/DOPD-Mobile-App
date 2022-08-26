import React, {useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Searchbar} from 'react-native-paper';
import {globalStyles} from '../styles/globalStyles';
export const SearchContainer = ({navigation, setFilter, filter}) => {
  const [searchQuery, setSearchQuery] = useState('');
  console.log('now this ', filter, setFilter);
  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={searchBarStyles.main}>
      <TouchableOpacity
        style={searchBarStyles.location}
        onPress={() => {
          console.log('location');
        }}>
        <Image
          source={require('../images/location.png')}
          style={{height: 20, width: 20, marginRight: 4}}
        />
        <Text style={globalStyles.cardsubHeading}>Karachi, Pakistan</Text>
      </TouchableOpacity>
      <View style={searchBarStyles.searchBar}>
        <Searchbar
          placeholder="Search for Doctors..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{
            elevation: 0,
            minWidth: 300,
            backgroundColor: '#f2f2f2',
            fontSize: 15,
            borderRadius: 8,
          }}
          placeholderTextColor="rgba(42, 61, 89, 0.5)"
          iconColor="rgba(42, 61, 89, 0.5)"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchFilter', {
              setFilter,
              filter: filter,
            });
          }}>
          <Image
            source={require('../images/filter.png')}
            style={{height: 35, width: 35, marginLeft: 8}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const searchBarStyles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    marginTop: 20,
    marginHorizontal: 10,
    minHeight: 100,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  searchBar: {
    alignSelf: 'flex-start',
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
