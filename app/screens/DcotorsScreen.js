import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AppBarWrapper from '../components/AppBar';
import {SearchContainer} from '../components/SearchContainer';
import {DoctorsCard} from '../components/DoctorsCard';
import {ScrollView} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import {useIsFocused} from '@react-navigation/native';
import {fetchDoctors} from '../services/doctors';
import {ActivityIndicator, Text} from 'react-native-paper';

export const DcotorsScreen = ({navigation}) => {
  const toggle = () => {
    navigation?.toggleDrawer();
  };
  const [data, setData] = useState([]);
  const isVisible = useIsFocused();
  const [filterBy, setFilterBy] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const resp = await fetchDoctors({
          limit: 1000,
          offset: 0,
          filter: filterBy,
        });
        setData(resp.data.data.data.rows);
        setLoading(false);
        console.log(resp.data.data.data.rows);
      } catch (e) {
        setLoading(false);
        console.log('error', e);
      }
    };
    getData();
  }, [isVisible, filterBy]);
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
      <SearchContainer
        navigation={navigation}
        setFilter={setFilterBy}
        filter={filterBy}
      />
      <ScrollView
        contentContainerStyle={{
          marginTop: 20,
          marginHorizontal: 10,
          paddingBottom: 40,
        }}>
        {!!data.length > 0 && !loading ? (
          data.map((item, key) => (
            <DoctorsCard doctor={item} key={key} navigation={navigation} />
          ))
        ) : loading ? (
          <ActivityIndicator
            animating={true}
            style={{
              marginTop: 250,
            }}
            color={'#3498DB'}
            size="small"
          />
        ) : (
          <Text
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              fontSize: 20,
            }}>
            Nothing Found !
          </Text>
        )}
        {}
      </ScrollView>
    </View>
  );
};
