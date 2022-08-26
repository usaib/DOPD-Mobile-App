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
import {
  fetchDiagnosedDiseaseDetails,
  updateDiagnosedDisease,
} from '../services/diagnose';
import {Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';
import {useUserState} from '../context/userContext';
import {getPrescription} from '../services/prescriptions';
const RNFS = require('react-native-fs');

export const AppointmentDetails = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState(false);
  const [choosed, setChoosed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [source, setSource] = useState(false);
  console.log(source);
  const [view, setView] = useState(false);
  const [prescription, setPrescription] = useState([]);
  const [downloaded, setDownloaded] = useState(false);

  const {
    appointmentId,
    dateTime,
    appointmentType,
    doctorName,
    patientName,
    appointmentLink,
  } = route.params;

  useEffect(() => {
    const fetchPrescription = async () => {
      console.log(appointmentId);
      const resp = await getPrescription({appointmentId});
      console.log(resp.data.data.data.rows);
      setPrescription(resp.data.data.data.rows);
    };
    fetchPrescription();
  }, [appointmentId]);

  const userState = useUserState();

  const htmlStyles = `.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  .text {
    font-family: Arial, sans-serif;
    margin: 3px 0 0 0;
    font-weight: 400;
    color: #2a3d53;
  }
  .divider {
    background-color: #0381d1;
    height: 5px;
    margin: 20px 0;
  }
  .patientInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .info {
    display: inline-block;
  }
  .info::after {
    content: "";
    background-color: #2a3d53;
    height: 2px;
    width: inherit;
    display: block;
  }
  .medicines {
    margin-top: 30px;
    /* display: flex;
    flex-direction: column;
    flex-wrap: wrap; */
  }
  .medicines div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px 0;
  }
  .medicines div span {
  }`;
  const E_prescription = `
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>E-prescription</title>
        <style>${htmlStyles}</style>
      </head>

      <body>
        <main style="padding: 0 10px; max-width: 900px; margin: 0 auto">
          <section class="header">
            <div>
              <h2 class="text">${doctorName}</h2>
              <p class="text" style="font-size: 0.875em">
                ENT Specialist
              </p>
              <p class="text" style="font-size: 0.875em">
              </p>
            </div>
            <div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAawAAAFNCAMAAABrDqu5AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAvdQTFRFA4HRA4HRA4HRAAAAA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRA4HRMNgI8QAAAP10Uk5Ta1stAPPx7OTVpohqLP/69+a2eA389ej28urlxJVoK/74tIZJDO4bOqXts3UqWGej4efp69GU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"
                alt=""
                style="height: 100px; object-fit: cover"
              />
            </div>
          </section>
          <div class="divider"></div>
          <section class="patientInfo">
            <div>
              <span style="margin: 0; font-weight: bold; font-family: Arial, sans-serif">
                Patient Name:
              </span>
              <span class="info">${patientName}</span>
            </div>
            <div>
              <span style="margin: 0; font-weight: bold; font-family: Arial, sans-serif">
                Age:
              </span>
              <span class="info">${userState.user.age}</span>
            </div>
            <div>
              <span style="margin: 0; font-weight: bold; font-family: Arial, sans-serif">
                Date:
              </span>
              <span class="info">${new Date(dateTime).toDateString()}</span>
            </div>
          </section>
          <section class="medicines">
           
            ${
              prescription &&
              prescription.length &&
              prescription.map(data => {
                return `<div>
                    <span class="text" style="font-weight: 800">
                      ${data.medicine_inventory.name}
                    </span>
                    <span class="text">${data.timing}</span>
                    <span class="text">${data.dosage}</span>
                  </div>`;
              })
            }
            
            <div></div>
          </section>
        </main>
      </body>
    </html>`;
  // console.log(E_prescription);
  const createPDF = async () => {
    let options = {
      html: E_prescription,
      fileName: 'E-Prescription' + appointmentId,
      directory: 'Documents',
    };
    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    const source = {uri: `${file.filePath}`};
    setSource(source);
    console.log(source);
    alert(file.filePath);
  };
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
  const updateDiseases = async params => {
    try {
      console.log('these are parms', params);
      const resp = await updateDiagnosedDisease(params);
      console.log('these are resp', resp);
    } catch (e) {
      console.log(e);
    }
  };
  async function verifyFiles(filepath) {
    let exists = await RNFS.exists(filepath);
    return exists;
  }
  const handleUploadPhoto = async () => {
    try {
      setUploading(true);
      const resp = await axios.post(
        `https://puny-suits-fetch-103-196-160-155.loca.lt/api/model/uploadImage`,
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
      await updateDiseases({
        id: appointmentId,
        diagnosedDisease: resp.data.disease,
        wantExtraInfo: false,
        otherDetails: 'Please refer to our doctors',
      });
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
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
  useEffect(() => {
    checkForFiles = async () => {
      if (!source) {
        let exists = await verifyFiles(
          `/storage/emulated/0/Android/data/com.practiceproject/files/Documents/E-Prescription${appointmentId}.pdf`,
        );
        console.log('existing', exists);
        if (exists) {
          setSource({
            uri: `/storage/emulated/0/Android/data/com.practiceproject/files/Documents/E-Prescription${appointmentId}.pdf`,
          });
          setDownloaded(true);
        }
        return;
      }
      return;
    };
    checkForFiles();
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
        setChoosed(true);
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
                  if (!downloaded) {
                    console.log('Downloading prescription');
                    createPDF();
                    setDownloaded(true);
                    return;
                  }
                  setSource({
                    uri: `/storage/emulated/0/Android/data/com.practiceproject/files/Documents/E-Prescription${appointmentId}.pdf`,
                  });
                }}>
                {!downloaded ? (
                  <Image
                    source={require('../images/downloadIcon.png')}
                    style={{height: 45, width: 45}}
                  />
                ) : (
                  <Image
                    source={require('../images/check.png')}
                    style={{height: 45, width: 45}}
                  />
                )}
              </TouchableOpacity>
            </View>
            {source && (
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: '#0000EE',
                  marginLeft: 6,
                  marginTop: 5,
                }}
                onPress={() => {
                  setView(prev => !prev);
                }}>
                {`Click here to ${!view ? 'view' : 'hide'}`}
              </Text>
            )}
            {source && view && (
              <View style={styles.pdfContainer}>
                <Pdf
                  source={source}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  onError={error => {
                    console.log('here is an', error);
                    setSource(false);
                    setDownloaded(false);
                  }}
                  onPressLink={uri => {
                    console.log(`Link pressed: ${uri}`);
                  }}
                  style={styles.pdf}
                />
              </View>
            )}
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
                {new Date(dateTime).toDateString()}
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
                {new Date(dateTime).toLocaleTimeString()}
              </Text>
            </View>
          </View>

          <View style={{marginBottom: 15}}>
            <Text style={[styles.openText, {marginBottom: 20}]}>
              Appointment Slip
            </Text>
            <View style={styles.pdfCard}>
              <Image
                source={require('../images/pdfIcon.png')}
                style={{height: 50, width: 50}}
              />
              <Text style={{fontSize: 16, fontWeight: '400', marginLeft: 15}}>
                Appointment Slip
              </Text>
              <TouchableOpacity
                style={{
                  marginLeft: 'auto',
                }}
                onPress={() => {
                  console.log('Downloading Appointment Slip');
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
              {!!data.length && data[0].otherDetails
                ? data[0].otherDetails
                : 'will be highlighted if doctor mention any comment'}
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
                  if (!downloaded) {
                    console.log('Downloading prescription');
                    createPDF();
                    setDownloaded(true);
                    return;
                  }
                  setSource({
                    uri: `/storage/emulated/0/Android/data/com.practiceproject/files/Documents/E-Prescription${appointmentId}.pdf`,
                  });
                }}>
                {!downloaded ? (
                  <Image
                    source={require('../images/downloadIcon.png')}
                    style={{height: 45, width: 45}}
                  />
                ) : (
                  <Image
                    source={require('../images/check.png')}
                    style={{height: 45, width: 45}}
                  />
                )}
              </TouchableOpacity>
            </View>
            {source && (
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: '#0000EE',
                  marginLeft: 6,
                  marginTop: 5,
                }}
                onPress={() => {
                  setView(prev => !prev);
                }}>
                {`Click here to ${!view ? 'view' : 'hide'}`}
              </Text>
            )}
            {source && view && (
              <View style={styles.pdfContainer}>
                <Pdf
                  source={source}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  onError={error => {
                    console.log(error);
                    setSource(false);
                    setDownloaded(false);
                  }}
                  onPressLink={uri => {
                    console.log(`Link pressed: ${uri}`);
                  }}
                  style={styles.pdf}
                />
              </View>
            )}
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
                {new Date(dateTime).toDateString()}
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
                {new Date(dateTime).toLocaleTimeString()}
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
                Linking.openURL(
                  appointmentLink ? appointmentLink : 'https://www.google.com/',
                );
              }}>
              {appointmentLink
                ? appointmentLink
                : 'Link will be here after confirmation of an appointment'}
            </Text>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={[styles.openText, {marginBottom: 20}]}>
              Appointment Slip
            </Text>
            <View style={styles.pdfCard}>
              <Image
                source={require('../images/pdfIcon.png')}
                style={{height: 50, width: 50}}
              />
              <Text style={{fontSize: 16, fontWeight: '400', marginLeft: 15}}>
                Appointment Slip
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
              {!!data.length && data[0].otherDetails
                ? data[0].otherDetails
                : 'will be highlighted if doctor mention any comment'}
            </Text>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={{paddingHorizontal: 15}}>
          {!!data.length && !data[0].wantExtraInfo && (
            <View style={{flex: 1}}>
              <Text style={[styles.openText]}>Description</Text>
              <Text style={styles.paragraphText}>
                According to our MDT you are diagnosed with following dieseases
                with chances of.
              </Text>
            </View>
          )}
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
                    radius={30}
                  />
                  <Text style={[styles.openText, {fontSize: 19}]}>{obj}</Text>
                </View>
              );
            })}
          <Text style={[styles.openText]}>Recomendations</Text>
          <Text style={[styles.paragraphText]}>
            {!!data.length && data[0].otherDetails
              ? data[0].otherDetails
              : 'will be highlighted if there is any'}
          </Text>
          {photo && (
            <Image source={{uri: photo.uri}} style={{height: 300}}></Image>
          )}
          {!!data.length && data[0].wantExtraInfo && (
            <View
              style={{
                flex: 1,
                marginTop: 10,
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              {!uploading && (
                <Button
                  loading={false}
                  style={styles.button}
                  icon="camera"
                  mode="contained"
                  onPress={handleChoosePhoto}
                  title="Submit">
                  <Text style={styles.button}>Choose Image</Text>
                </Button>
              )}
              {choosed && (
                <Button
                  loading={uploading}
                  mode="contained"
                  style={styles.button}
                  icon="upload"
                  labelStyle={{fontWeight: '700', fontSize: 14.5}}
                  onPress={handleUploadPhoto}>
                  <Text style={styles.button}>
                    {uploading ? 'Uploading...' : 'Upload'}
                  </Text>
                </Button>
              )}
            </View>
          )}

          <Text style={[styles.openText]}>Provided Symptoms</Text>
          <View
            style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {!!data.length &&
              data[0].providedSymptoms
                .split(',')
                .sort((a, b) => a.length - b.length)
                .map((obj, index) => {
                  return (
                    <View style={styles.symptomCard}>
                      <Text
                        style={[
                          {
                            fontSize: 14,
                            fontWeight: '500',
                            color: '#FFFFFF',
                            letterSpacing: 0.5,
                          },
                        ]}>
                        {titleCase(obj)}
                      </Text>
                    </View>
                  );
                })}
          </View>
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
  pdfContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 250,
  },
  resCard: {
    backgroundColor: 'white',
    height: 75,
    marginVertical: 8,
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
    marginVertical: 5,
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
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498DB',
    borderRadius: 14,
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
