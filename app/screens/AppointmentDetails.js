import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import AppBarWrapper from '../components/AppBar';
import {Wrapper} from '../components/Wrapper';
import ProgressBar from '../components/ProgressBar';
import {fetchDiagnosedDiseaseDetails} from '../services/diagnose';
import {Button} from 'react-native-paper';

export const AppointmentDetails = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {appointmentType} = route.params;
  const {appointmentId} = route.params;

  const toggle = () => {
    navigation?.toggleDrawer();
  };
  const titleCase = s =>
    s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );

  useEffect(() => {
    const getDataForSmartAppointment = async () => {
      try {
        const resp = await fetchDiagnosedDiseaseDetails({
          appointmentId,
        });
        console.log(resp.data.data.data.rows[0]);
        setData(resp.data.data.data.rows);
      } catch (e) {
        console.log(e);
      }
    };
    if (appointmentType == 'Smart') {
      getDataForSmartAppointment();
    }
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
            {!!data.length &&
              !data[0].wantExtraInfo &&
              data[0].diagnosedDisease.split(',').map((obj, index) => {
                let percentage = 0;
                let color = '#FFFF';
                if (index == 0) {
                  percentage = 70;
                  color = '#2ecc71';
                }
                if (index == 1) {
                  percentage = 20;
                  color = '#fec901';
                }
                if (index == 2) {
                  percentage = 10;
                  color = '#d03423';
                }
                return (
                  <View style={styles.resCard}>
                    <ProgressBar
                      percentage={percentage}
                      color={color}
                      textColor={color}
                      radius={28}
                    />
                    <Text style={[styles.openText, {fontSize: 19}]}>{obj}</Text>
                  </View>
                );
              })}
            {!!data.length && data[0].wantExtraInfo && (
              <View style={{flex: 1}}>
                <Text style={[styles.paragraphText]}>
                  {!!data.length && data[0].otherDetails}
                </Text>
                <Button
                  loading={false}
                  style={styles.button}
                  icon="camera"
                  mode="contained"
                  title="Submit">
                  <Text style={styles.button}>Upload</Text>
                </Button>
              </View>
            )}
            <Text style={[styles.openText]}>Provided Symptoms</Text>
            {!!data.length &&
              data[0].providedSymptoms.split(',').map((obj, index) => {
                return (
                  <View style={styles.resCard}>
                    <Text style={[styles.openText, {fontSize: 19}]}>
                      {index + 1 + '. ' + titleCase(obj)}
                    </Text>
                  </View>
                );
              })}
            <Text style={[styles.openText]}>Recomendations</Text>
            <Text style={[styles.paragraphText]}>
              {!!data.length && data[0].otherDetails}
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
    height: 75,
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
  button: {
    fontFamily: 'Gibson-Regular',
    color: 'white',
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
