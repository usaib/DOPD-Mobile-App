import React, {useState} from 'react';
import {View} from 'react-native';
import AppBarWrapper from '../components/AppBar';
import {SearchContainer} from '../components/SearchContainer';
import {DoctorsCard} from '../components/DoctorsCard';
import {ScrollView} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
export const DcotorsScreen = ({navigation}) => {
  const toggle = () => {
    navigation?.toggleDrawer();
  };
  const [data, setData] = useState([
    {
      name: 'Dr. Thomas',
      imageUrl:
        'https://res.cloudinary.com/drl7zvkyf/image/upload/v1651947848/digitalOPD/doctor-removebg-preview_xx3ij1.png',
      specialty: 'General Practitioner',
      rating: '4.9',
      experience: '3 years',
    },
    {
      name: 'Dr. Thomas',
      imageUrl:
        'https://res.cloudinary.com/drl7zvkyf/image/upload/v1651947848/digitalOPD/doctor-removebg-preview_xx3ij1.png',
      specialty: 'General Practitioner',
      rating: '4.9',
      experience: '3 years',
    },
    {
      name: 'Dr. Thomas',
      imageUrl:
        'https://res.cloudinary.com/drl7zvkyf/image/upload/v1651947848/digitalOPD/doctor-removebg-preview_xx3ij1.png',
      specialty: 'General Practitioner',
      rating: '4.9',
      experience: '3 years',
    },
    {
      name: 'Dr. Thomas',
      imageUrl:
        'https://res.cloudinary.com/drl7zvkyf/image/upload/v1651947848/digitalOPD/doctor-removebg-preview_xx3ij1.png',
      specialty: 'General Practitioner',
      rating: '4.9',
      experience: '3 years',
    },
  ]);
  return (
    <View style={globalStyles.container}>
      <AppBarWrapper
        title={'Find Doctors'}
        onPress={() => {
          navigation.navigate('Main');
        }}
        showMenu={true}
        showButton={false}
        onMenuPress={toggle}
      />
      <SearchContainer navigation={navigation} />
      <ScrollView
        contentContainerStyle={{
          marginTop: 20,
          marginHorizontal: 10,
          paddingBottom: 40,
        }}>
        {data.map((item, key) => (
          <DoctorsCard doctor={item} key={key} />
        ))}
      </ScrollView>
    </View>
  );
};
