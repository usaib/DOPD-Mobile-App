import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import AppBarWrapper from '../components/AppBar';
import ProgressBar from '../components/ProgressBar';
import {fetchDiagnosedDiseaseDetails} from '../services/diagnose';
import {Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {BASE_URL} from '../../App';

export const AppointmentDetails = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState(false);
  const {appointmentType} = route.params;
  const {appointmentId} = route.params;

  const toggle = () => {
    navigation?.toggleDrawer();
  };
  const titleCase = s =>
    s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );
  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    console.log(data);

    return data;
  };

  const handleUploadPhoto = async () => {
    try {
      const resp = await axios.post(
        `https://nine-parks-return-103-196-160-81.loca.lt/api/model/uploadImage`,
        createFormData(photo, {userId: '1'}),
      );
      console.log(resp.data);
      setData([
        {
          diagnosedDisease: resp.data.disease,
          providedSymptoms: data[0].providedSymptoms,
          wantExtraInfo: false,
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };
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

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      includeExtra: true,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('Response', response.assets[0].base64.slice(0, 10));
      if (response.assets[0]) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const dynamicDetailsRendering = appointmentType => {
    if (appointmentType == 'In-person') {
      return (
        <ScrollView contentContainerStyle={{paddingHorizontal: 15}}>
          <View style={{marginBottom: 15}}>
            <Text style={[styles.openText, {marginBottom: 20}]}>
              E-Prescription
            </Text>
            <View style={styles.pdfCard}>
              <Image
                source={require('../images/pdfIcon.png')}
                style={{height: 50, width: 50}}
              />
              <Text style={{fontSize: 16, fontWeight: '400', marginLeft: 15}}>
                E-prescription
              </Text>
              <TouchableOpacity
                style={{
                  marginLeft: 'auto',
                }}
                onPress={() => {
                  console.log('Downloading prescription');
                }}>
                <Image
                  source={require('../images/downloadIcon.png')}
                  style={{height: 45, width: 45}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={[styles.openText, {marginBottom: 20}]}>
              Description
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 6,
                marginBottom: 20,
              }}>
              <Image
                source={require('../images/calendar.png')}
                style={{height: 20, width: 20}}
              />
              <Text
                style={[styles.paragraphText, {marginLeft: 13, fontSize: 16}]}>
                Wednesday, 11 March
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 6,
                marginBottom: 20,
              }}>
              <Image
                source={require('../images/clock.png')}
                style={{height: 20, width: 20}}
              />
              <Text
                style={[styles.paragraphText, {marginLeft: 13, fontSize: 16}]}>
                5:00pm
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 6,
              }}>
              <Image
                source={require('../images/locationIcon.png')}
                style={{height: 20, width: 20}}
              />
              <Text
                style={[styles.paragraphText, {marginLeft: 13, fontSize: 16}]}>
                Liaquat National Hospital, Karachi
              </Text>
            </View>
          </View>

          <View style={{marginBottom: 15}}>
            <Text style={[styles.openText, {marginBottom: 20}]}>
              Appointment Fee
            </Text>
            <View style={styles.pdfCard}>
              <Image
                source={require('../images/pdfIcon.png')}
                style={{height: 50, width: 50}}
              />
              <Text style={{fontSize: 16, fontWeight: '400', marginLeft: 15}}>
                Appointment Fee
              </Text>
              <TouchableOpacity
                style={{
                  marginLeft: 'auto',
                }}
                onPress={() => {
                  console.log('Downloading Appointment Fee');
                }}>
                <Image
                  source={require('../images/downloadIcon.png')}
                  style={{height: 45, width: 45}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={[styles.openText]}>Recomendations</Text>
            <Text style={[styles.paragraphText]}>
              Visit again after one week
            </Text>
          </View>
        </ScrollView>
      );
    }
    if (appointmentType == 'Online') {
      return (
        <ScrollView contentContainerStyle={{paddingHorizontal: 15}}>
          <View style={{marginBottom: 15}}>
            <Text style={[styles.openText, {marginBottom: 20}]}>
              E-Prescription
            </Text>
            <View style={styles.pdfCard}>
              <Image
                source={require('../images/pdfIcon.png')}
                style={{height: 50, width: 50}}
              />
              <Text style={{fontSize: 16, fontWeight: '400', marginLeft: 15}}>
                E-prescription
              </Text>
              <TouchableOpacity
                style={{
                  marginLeft: 'auto',
                }}
                onPress={() => {
                  console.log('Downloading prescription');
                }}>
                <Image
                  source={require('../images/downloadIcon.png')}
                  style={{height: 45, width: 45}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={[styles.openText, {marginBottom: 20}]}>
              Description
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 6,
                marginBottom: 20,
              }}>
              <Image
                source={require('../images/calendar.png')}
                style={{height: 20, width: 20}}
              />
              <Text
                style={[styles.paragraphText, {marginLeft: 13, fontSize: 16}]}>
                Wednesday, 11 March
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 6,
              }}>
              <Image
                source={require('../images/clock.png')}
                style={{height: 20, width: 20}}
              />
              <Text
                style={[styles.paragraphText, {marginLeft: 13, fontSize: 16}]}>
                5:00pm
              </Text>
            </View>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={[styles.openText, {marginBottom: 20}]}>
              Appointment Link
            </Text>
            <Text style={styles.paragraphText}>
              Join the following link on time for the meeting.
            </Text>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#0000EE',
                marginLeft: 6,
                marginTop: 5,
              }}
              onPress={() => {
                Linking.openURL('https://www.google.com/');
              }}>
              https://www.google.com/
            </Text>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={[styles.openText, {marginBottom: 20}]}>
              Appointment Fee
            </Text>
            <View style={styles.pdfCard}>
              <Image
                source={require('../images/pdfIcon.png')}
                style={{height: 50, width: 50}}
              />
              <Text style={{fontSize: 16, fontWeight: '400', marginLeft: 15}}>
                Appointment Fee
              </Text>
              <TouchableOpacity
                style={{
                  marginLeft: 'auto',
                }}
                onPress={() => {
                  console.log('Downloading Appointment Fee');
                }}>
                <Image
                  source={require('../images/downloadIcon.png')}
                  style={{height: 45, width: 45}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={[styles.openText]}>Recomendations</Text>
            <Text style={[styles.paragraphText]}>
              Visit again after one week
            </Text>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={{paddingHorizontal: 15}}>
          <Text style={[styles.openText]}>Description</Text>
          <Text style={styles.paragraphText}>
            According to our MDT you are diagnosed with following dieseases with
            chances of.
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
                    radius={35}
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
                icon="upload"
                labelStyle={{fontWeight: '700', fontSize: 14.5}}
                mode="contained"
                title="Submit">
                Upload
              </Button>
            </View>
          )}
          <Text style={[styles.openText]}>Provided Symptoms</Text>
          <View
            style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {!!data.length &&
              data[0].providedSymptoms.split(',').map((obj, index) => {
                return (
                  <View style={styles.symptomCard}>
                    <Text
                      style={[
                        {
                          fontSize: 16,
                          fontWeight: '600',
                          color: '#2a3d53',
                          letterSpacing: 0.5,
                        },
                      ]}>
                      {titleCase(obj)}
                    </Text>
                  </View>
                );
              })}
          </View>
          <Text style={[styles.openText]}>Recomendations</Text>
          <Text style={[styles.paragraphText]}>
            {!!data.length && data[0].otherDetails}
          </Text>
        </ScrollView>
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
    paddingVertical: 5,
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
    marginLeft: 6,
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
  symptomCard: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebecf08f',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  pdfCard: {
    backgroundColor: '#d3d3d346',
    display: 'flex',
    alignItems: 'center',

    flexDirection: 'row',
    height: 70,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
});

export default AppointmentDetails;
