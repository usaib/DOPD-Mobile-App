import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import AppBarWrapper from '../components/AppBar';
import {Wrapper} from '../components/Wrapper';
import ProgressBar from '../components/ProgressBar';

export const AppointmentDetails = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const {appointmentType} = route.params;

  const toggle = () => {
    navigation?.toggleDrawer();
  };

  useEffect(() => {
    const getData = async () => {};
    getData();
  }, []);

  const dynamicDetailsRendering = appointmentType => {
    if (appointmentType == 'In-person') {
      return (
        <Wrapper>
          <Text style={[styles.openText]}>E-Prescription</Text>
          <Text style={[styles.paragraphText]}>
            1. Tab Panadol 2 Tablets (twice a day)
          </Text>
          <Text style={[styles.paragraphText]}>
            2. Tab Jardin-D once daily (at night)
          </Text>
          <Text style={[styles.paragraphText]}>
            3. Take Steam 1-2 times a day
          </Text>
          <Text style={[styles.openText]}>Recomendations</Text>
          <Text style={[styles.paragraphText]}>Visit again after one week</Text>
          <Text style={[styles.openText]}>Appointment Slip</Text>
        </Wrapper>
      );
    }
    if (appointmentType == 'Online') {
      return (
        <Wrapper>
          <Text style={[styles.openText]}>E-Prescription</Text>
          <Text style={[styles.paragraphText]}>
            1. Tab Panadol 2 Tablets (twice a day)
          </Text>
          <Text style={[styles.paragraphText]}>
            2. Tab Jardin-D once daily (at night)
          </Text>
          <Text style={[styles.paragraphText]}>
            3. Take Steam 1-2 times a day
          </Text>
          <Text style={[styles.openText]}>Description</Text>
          <Text style={[styles.paragraphText]}>
            11 March @ 5:00pm with Dr. Anees Allana
          </Text>
          <Text style={[styles.openText]}>Appointment Link</Text>
          <Text style={[styles.openText]}>Appointment Fee</Text>
        </Wrapper>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <Wrapper>
            <Text style={[styles.openText]}>Description</Text>
            <Text style={styles.paragraphText}>
              According to our MDT you are diagnosed with following dieseases
              with chances of.
            </Text>
            <View style={styles.resCard}>
              <ProgressBar
                color={'#FFF123'}
                textColor={'#FFF123'}
                radius={30}
                percentage={60}
              />
              <Text style={[styles.openText, {fontSize: 25}]}>Influenza</Text>
            </View>
            <Text style={[styles.openText]}>Provided Symptoms</Text>
            <Text style={[styles.paragraphText]}>1. Continous Sneezing</Text>
            <Text style={[styles.paragraphText]}>2. Headache</Text>
            <Text style={[styles.paragraphText]}>3. High Fever</Text>
            <Text style={[styles.openText]}>Recomendations</Text>
            <Text style={[styles.paragraphText]}>
              Visit our ENT specialist Dr. Anees Allana
            </Text>
          </Wrapper>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20}}>
        <AppBarWrapper
          title={'Appointment Details'}
          onPress={() => {
            navigation.navigate('Appointment History');
          }}
          showMenu={false}
          showButton={false}
          onMenuPress={toggle}
        />
      </View>
      {dynamicDetailsRendering(appointmentType)}
    </View>
  );
};

export const styles = StyleSheet.create({
  sectionHeading: {
    fontSize: 22,
    color: '#000',
    lineHeight: 30,
  },
  resCard: {
    backgroundColor: 'white',
    height: 70,
    marginVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '95%',
    padding: 10,
    borderRadius: 4,
    position: 'relative',
    shadowColor: '#1b1b1b96',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    fontSize: 22,
    color: '#05375a',
    fontWeight: '600',
    marginVertical: 12,
    letterSpacing: 0.5,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  paragraphText: {
    fontSize: 15,
    color: '#a1a1a1',
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: 20,
    marginLeft: 6,
    alignSelf: 'flex-start',
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

export default AppointmentDetails;
