import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
export const Specializations = ({filterBy, setFilterBy}) => {
  const specializations = [
    {feild: 'Skin Specialist', icon: require('../images/dermatology.png')},
    {feild: 'Gynecologist', icon: require('../images/gynecologist.png')},
    {feild: 'Orthopedic Surgeon', icon: require('../images/orthopedic.png')},
    {feild: 'Urologist', icon: require('../images/urologist.png')},
    {feild: 'ENT Specialist', icon: require('../images/ENT.png')},
    {feild: 'Child Specialist', icon: require('../images/child.png')},
    {feild: 'Neurologist', icon: require('../images/neurologist.png')},
    {feild: 'General Physician', icon: require('../images/general.png')},
    {feild: 'Eye Specialist', icon: require('../images/eye-open.png')},
    {feild: 'Heart Specialist', icon: require('../images/heart.png')},
    {feild: 'Dentist', icon: require('../images/dentist.png')},
  ];

  return (
    <View style={specializationStyles.main}>
      {specializations.map((data, key) => (
        <TouchableOpacity
          style={[
            specializationStyles.specCard,
            {
              backgroundColor:
                filterBy == data.feild ? 'rgba(3, 129, 209, 0.1)' : '#fff',
            },
          ]}
          key={key}
          onPress={() => setFilterBy(data.feild)}>
          <View style={specializationStyles.imgCont}>
            <Image source={data.icon} style={{height: 25, width: 25}} />
          </View>
          <Text style={[globalStyles.cardsubHeading, {flexShrink: 1}]}>
            {data.feild}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const specializationStyles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    //justifyContent: 'space-between',
    marginTop: 20,
  },
  specCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 8,
    height: 45,
    width: 170,
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 5,
    overflow: 'hidden',
  },
  imgCont: {
    backgroundColor: 'rgba(3, 129, 209, 0.2)',
    height: 35,
    width: 35,
    borderRadius: 17.5,
    marginRight: 15,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
