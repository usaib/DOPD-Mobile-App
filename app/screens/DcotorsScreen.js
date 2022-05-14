import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AppBarWrapper from '../components/AppBar';
import {SearchContainer} from '../components/SearchContainer';
import {DoctorsCard} from '../components/DoctorsCard';
import {ScrollView} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import {useIsFocused} from '@react-navigation/native';
import {fetchDoctors} from '../services/doctors';
import {ActivityIndicator} from 'react-native-paper';

export const DcotorsScreen = ({navigation}) => {
  const toggle = () => {
    navigation?.toggleDrawer();
  };
  const [data, setData] = useState([]);
  const isVisible = useIsFocused();

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetchDoctors({
          limit: 10,
          offset: 0,
        });
        setData(resp.data.data.data.rows);
        console.log(resp.data.data.data.rows);
      } catch (e) {
        console.log('error', e);
      }
    };
    getData();
  }, [isVisible]);
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
        {!!data.length ? (
          data.map((item, key) => <DoctorsCard doctor={item} key={key} />)
        ) : (
          <ActivityIndicator
            animating={true}
            style={{
              marginTop: 250,
            }}
            color={'#3498DB'}
            size="small"
          />
        )}
      </ScrollView>
    </View>
  );
};
