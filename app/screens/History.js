import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import AppBarWrapper from '../components/AppBar';
import {Wrapper} from '../components/Wrapper';
import HistoryItems from '../components/HistoryItems';
import {fetchAppointments} from '../services/appointments';
import {ActivityIndicator} from 'react-native-paper';

export const History = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);

  const toggle = () => {
    navigation?.toggleDrawer();
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const resp = await fetchAppointments();
        setData(resp.data.data.data.rows);
        setLoading(false);
        console.log(resp.data.data.data.rows);
      } catch (e) {
        console.log('error', e);
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <View style={homeStyles.container}>
      <View style={{marginBottom: 20}}>
        <AppBarWrapper
          title={'Appointment History'}
          onPress={() => {
            navigation.navigate('Main');
          }}
          showMenu={true}
          showButton={false}
          onMenuPress={toggle}
        />
      </View>

      <Wrapper>
        {loading ? (
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
              patientName={obj.user.name}
              dateTime={obj.dateTime}
              appointmentType={obj.type}
              appointmentStatus={obj.status}
            />
          ))
        )}
      </Wrapper>
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
});

export default History;
