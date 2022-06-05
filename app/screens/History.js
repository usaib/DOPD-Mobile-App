import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
} from 'react-native';
import AppBarWrapper from '../components/AppBar';
import HistoryItems from '../components/HistoryItems';
import {fetchAppointments} from '../services/appointments';
import {ScrollView} from 'react-native-gesture-handler';

export const History = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [refreshed, setRefreshed] = useState(true);

  const toggle = () => {
    navigation?.toggleDrawer();
  };
  const onRefresh = () => {
    setData([]);
    setRefreshed(prev => !prev);
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const resp = await fetchAppointments();
        setData(resp.data.data.data.rows);
        console.log(resp.data.data.data.rows);
        setLoading(false);
        setRefreshing(false);
      } catch (e) {
        console.log('error', e);
        setLoading(false);
      }
    };
    getData();
  }, [refreshed]);
  const ItemView = obj => {
    return (
      // Flat List Item
      <HistoryItems
        doctorName={obj.item.doctor.name}
        appointmentId={obj.item.id}
        appointmentLink={obj.item.appointmentLink}
        patientName={obj.item.user.name}
        dateTime={obj.item.dateTime}
        createdAt={obj.item.createdAt}
        appointmentType={obj.item.type}
        appointmentStatus={obj.item.status}
        navigation={navigation}
      />
    );
  };

  return (
    <View style={homeStyles.container}>
      <AppBarWrapper
        title={'Appointment History'}
        onPress={() => {
          navigation.navigate('Main');
        }}
        showMenu={true}
        showButton={false}
        onMenuPress={toggle}
      />
      <ScrollView
        contentContainerStyle={{flex: 1, marginTop: 5, paddingLeft: 15}}>
        {/* {loading ? (
          <ActivityIndicator
            animating={true}
            style={{
              marginTop: 250,
            }}
            color={'#3498DB'}
            size="small"
          />
        ) : (
          data.length &&
          data.map(obj => (
            <HistoryItems
              doctorName={obj.doctor.name}
              appointmentId={obj.id}
              patientName={obj.user.name}
              dateTime={obj.dateTime}
              appointmentType={obj.type}
              appointmentStatus={obj.status}
              navigation={navigation}
            />
          ))
        )} */}
        <FlatList
          data={data}
          keyExtractor={(obj, index) => index.toString()}
          enableEmptySections={true}
          renderItem={ItemView}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </ScrollView>
    </View>
  );
};

export const homeStyles = StyleSheet.create({
  sectionHeading: {
    fontSize: 22,
    color: '#000',
    lineHeight: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  cardHeading: {
    fontSize: 18,
    color: '#000',
    lineHeight: 20,
  },
  cardsubHeading: {
    fontSize: 15,
    lineHeight: 16,
    color: '#ffffaa',
  },
  submitBtn: {
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: 'transparent',
  },
  top: {
    height: 170,
    width: Dimensions.get('window').width - 30,
    backgroundColor: '#B5DEFF35',
    position: 'absolute',
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 20,
  },
  openText: {
    fontSize: 28,
    color: '#05375a',
    fontWeight: '600',
    marginVertical: 12,
    letterSpacing: 0.5,
  },

  cardText: {
    fontWeight: '400',
    fontSize: 18,
    letterSpacing: 0.5,
    color: '#05375a',
    maxWidth: 230,
    textTransform: 'capitalize',
    marginHorizontal: 20,
  },
  cardImage: {
    height: 150,
    width: 160,
    position: 'absolute',
    right: 5,
    bottom: 0,
  },
  itemStyle: {
    fontSize: 20,
    padding: 10,
  },
});

export default History;
