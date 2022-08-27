import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {HistoryCard} from './HistoryCard';
import {IconButton} from 'react-native-paper';

export default function HistoryItems({
  doctorName,
  patientName,
  appointmentType,
  doctorSpecialization,
  dateTime,
  appointmentStatus,
  navigation,
  appointmentId,
  appointmentLink,
  createdAt,
}) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const setColour = status => {
    if (status == 'cancelled') {
      return '#FF0000';
    }
    if (status == 'pending') {
      return '#FFA500';
    }
    if (status == 'completed') {
      return '#90EE90';
    }
    if (status == 'confirmed') {
      return '#0381d1';
    }
  };

  const onPress = () => {
    navigation.navigate('Appointment Details', {
      appointmentType,
      appointmentId,
      dateTime,
      doctorName,
      patientName,
      appointmentLink,
      doctorSpecialization,
      appointmentStatus,
    });
  };
  return (
    <HistoryCard
      minHeight={80}
      width={'95%'}
      onPressCard={onPress}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#B5DEFF4F',
          borderRadius: 10,
          width: 60,
          height: 60,
          marginRight: 15,
        }}>
        <Text style={[styles.cardTitle, {alignSelf: 'center', fontSize: 20}]}>
          {new Date(createdAt).getDate().toString()}
        </Text>
        <Text
          style={[styles.cardTitle, {alignSelf: 'center', fontWeight: '400'}]}>
          {monthNames[new Date(createdAt).getMonth().toString()]}
        </Text>
      </View>
      <View style={styles.cardTitleContainer}>
        <Text style={styles.cardTitle}>{doctorName}</Text>

        <Text
          style={[
            styles.cardTitle,
            {
              fontSize: 15,
              color: '#a9a9a9',
              alignSelf: 'flex-start',
              fontWeight: '500',
            },
          ]}>
          {days[new Date(createdAt).getDay().toString()]} ,
          {new Date(createdAt).toLocaleTimeString()}
        </Text>
        <Text
          style={[
            styles.cardTitle,
            {
              fontSize: 15,
              color: '#0381d1',
              alignSelf: 'flex-start',
              fontWeight: '900',
            },
          ]}>
          {appointmentType} Appointment
        </Text>
        <Text
          style={[
            styles.cardTitle,
            {
              fontSize: 15,
              color: '#a9a9a9',
              alignSelf: 'flex-start',
              fontWeight: '500',
            },
          ]}>
          Patient Name: {patientName}
        </Text>
      </View>
      <View
        style={{
          height: 30,
          paddingVertical: 6,
          paddingHorizontal: 6,
          marginTop: 'auto',
          marginBottom: 'auto',
          marginLeft: 'auto',
          borderRadius: 5,
          backgroundColor: setColour(appointmentStatus),
        }}>
        {/* <IconButton
            icon="account-details"
            color={'#0381d1'}
            size={30}
            onPress={() => console.log('Pressed')}
          /> */}
        <Text
          style={[
            styles.cardTitle,
            {
              fontSize: 14,
              color: '#fff',
              fontWeight: '700',
            },
          ]}>
          {appointmentStatus}
        </Text>
      </View>
    </HistoryCard>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    width: '35%',
    flexDirection: 'column',
    marginTop: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flex: 1,
    width: '10%',
    flexDirection: 'column',
    marginTop: 10,
  },

  cardTitleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#2A3D57',
    fontFamily: 'Nunito',
    fontWeight: '800',
    alignSelf: 'flex-start',
    fontSize: 18,
  },
});
