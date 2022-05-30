import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Button, Surface} from 'react-native-paper';
import {globalStyles} from '../styles/globalStyles';
import AppBarWrapper from '../components/AppBar';
import moment from 'moment';
export const Appointment = ({navigation}) => {
  const toggle = () => {
    navigation?.toggleDrawer();
  };
  const doctor = {
    imageUrl:
      'https://res.cloudinary.com/drl7zvkyf/image/upload/v1651947848/digitalOPD/doctor-removebg-preview_xx3ij1.png',
    name: 'Anees Allana',
    rating: '4.1',
    specialization: 'ENT',
    locatedAt: 'Liaquat National Hospital',
    workingHours: ['8:00', '10:00', '13:00', '15:00'],
  };
  const docDetails = [
    {
      id: '1',
      doctorId: '1',
      weekday: 'Monday',
      startTime: '05:00',
      endTime: '08:00',
    },
    {
      id: '1',
      doctorId: '1',
      weekday: 'Tuesday',
      startTime: '05:00',
      endTime: '08:00',
    },
    {
      id: '1',
      doctorId: '1',
      weekday: 'Friday',
      startTime: '04:00',
      endTime: '08:00',
    },
  ];
  const [time, setTime] = useState([]);
  const [appointment, setAppointment] = useState({
    day: '',
    time: '',
    date: '',
  });
  const [schedules, setSchedules] = useState([]);
  const createTimeSlots = (from, to) => {
    let startTime = moment(from, 'HH:mm');
    let endTime = moment(to, 'HH:mm');
    let arr = [];
    while (startTime <= endTime) {
      arr.push(new moment(startTime).format('HH:mm'));
      startTime.add(30, 'minutes');
    }
    return arr;
  };

  const dayHandler = item => {
    const filter = docDetails.filter(doc => doc.weekday === item.weekday);
    const slots = createTimeSlots(filter[0].startTime, filter[0].endTime);
    setTime(slots);
    setAppointment({
      day: filter[0].weekday,
      time: filter[0].startTime,
      date: item.date,
    });
  };
  const submitHandler = time => {
    setAppointment(prevState => {
      return {...prevState, time: time};
    });
  };
  useEffect(() => {
    const slots = createTimeSlots(
      docDetails[0].startTime,
      docDetails[0].endTime,
    );
    setTime(slots);
    let dates = [];
    var startdate = moment().format('DD-MM-YYYY');
    for (let i = 0; i < 20; i++) {
      var new_date = moment(startdate, 'DD-MM-YYYY').add(i, 'days');
      var weekDayName = moment(new_date).format('dddd');
      for (let j = 0; j < docDetails.length; j++) {
        if (docDetails[j].weekday == weekDayName) {
          const date = new_date.format('DD-MM-YYYY');
          dates.push({weekday: weekDayName, date: date});
        }
      }
    }
    setSchedules(dates);
    setAppointment(prevState => {
      return {
        ...prevState,
        date: dates[0].date,
        day: dates[0].weekday,
        time: slots[0],
      };
    });
  }, []);

  return (
    <View style={globalStyles.container}>
      <AppBarWrapper
        title={'Appointment'}
        onPress={() => {
          navigation.navigate('FindDoctors');
        }}
        showMenu={true}
        showButton={false}
        onMenuPress={toggle}
      />
      <ScrollView
        contentContainerStyle={{
          marginTop: 20,
          marginHorizontal: 20,
          paddingBottom: 40,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <View style={appointmentStyles.imageContainer}>
            <Image
              source={{
                uri: doctor.imageUrl,
              }}
              style={{
                marginTop: 1.5,
                objectFit: 'contain',
                width: 110,
                height: 110,
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 15,
              marginTop: 5,
            }}>
            <Text style={globalStyles.cardHeading}>Dr. {doctor.name}</Text>
            <Text
              style={[
                globalStyles.cardsubHeading,
                {
                  color: '#a9a9a9',
                  marginTop: 7,
                  fontSize: 15,
                  fontWeight: '600',
                },
              ]}>
              {doctor.specialization}
            </Text>
            <Text
              style={[
                globalStyles.cardsubHeading,
                {
                  color: '#a9a9a9',
                  marginTop: 7,
                  fontSize: 15,
                  fontWeight: '600',
                },
              ]}>
              {doctor.locatedAt}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
          }}>
          <Text style={[globalStyles.cardHeading, {fontSize: 22}]}>
            Schedules
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}>
              {schedules.map((item, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    dayHandler(item);
                  }}>
                  <View
                    style={[
                      appointmentStyles.day,
                      {
                        backgroundColor:
                          item.date === appointment.date
                            ? '#0381d1'
                            : 'transparent',
                        borderColor:
                          item.date === appointment.date
                            ? 'transparent'
                            : '#d9d9d9',
                      },
                    ]}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color:
                          item.date === appointment.date ? '#fff' : '#2a3d539f',
                        letterSpacing: 0.5,
                      }}>
                      {item.weekday.slice(0, 3)}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color:
                          item.date === appointment.date ? '#fff' : '#2a3d539f',
                        marginTop: 10,
                        letterSpacing: 0.5,
                      }}>
                      {item.date.slice(0, 2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: 30,
          }}>
          <Text style={[globalStyles.cardHeading, {fontSize: 22}]}>
            Working Hours
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}>
              {time.map((time, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    submitHandler(time);
                  }}>
                  <View
                    style={[
                      appointmentStyles.time,
                      {
                        backgroundColor:
                          time === appointment.time ? '#0381d1' : 'transparent',
                      },
                    ]}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color: time === appointment.time ? '#fff' : '#2a3d539f',
                        letterSpacing: 0.5,
                      }}>
                      {time}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <Surface style={[appointmentStyles.btnCont]}>
        <Button
          style={appointmentStyles.submitBtn}
          labelStyle={{textTransform: 'capitalize'}}
          mode="contained"
          onPress={() => {
            console.log('Appointment', appointment);
          }}
          title="Submit">
          <Text
            style={[
              globalStyles.cardsubHeading,
              {color: '#fff', fontWeight: '500'},
            ]}>
            Book an Appointment
          </Text>
        </Button>
      </Surface>
    </View>
  );
};

const appointmentStyles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#0381d1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 10,
    height: 92,
    width: 95,
    borderRadius: 8,
    overflow: 'hidden',
  },
  time: {
    height: 35,
    borderRadius: 8,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    paddingHorizontal: 25,
    marginTop: 15,
    marginRight: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    height: 70,
    borderRadius: 8,
    width: 85,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    paddingHorizontal: 25,
    marginTop: 15,
    marginRight: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCont: {
    height: 120,
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
