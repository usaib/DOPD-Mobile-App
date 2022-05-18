import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {styles} from './MainScreen';
import ProgressBar from '../components/ProgressBar';
import AppBarWrapper from '../components/AppBar';
import Spinner from 'react-native-loading-spinner-overlay';
import {prediction} from '../services/models';
import {useUserState} from '../context/userContext';
import {createAppointment} from '../services/appointments';
import {createDiagnosedDisease} from '../services/diagnose';

export default Results = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {symptomsList} = route.params;
  const userState = useUserState();
  const [wantInfo, setWantInfo] = useState(false);
  const toggle = () => {
    navigation?.toggleDrawer();
  };
  const titleCase = s =>
    s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );
  useEffect(() => {
    const getResults = async (values, actions) => {
      console.log(values);
      try {
        const resp = await prediction({
          symptoms: symptomsList,
        });
        console.log('response', resp.data);
        const appointment = await createAppointment({
          userId: userState.user.id,
          doctorName: 'Smart',
          dateTime: new Date(),
          type: 'Smart',
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(appointment.data);
        let wantImageInput = resp.data.predictions.some(data => {
          if (
            titleCase(data) == 'Pneumonia' ||
            titleCase(data) == 'Tuberculosis' ||
            titleCase(data) == 'Covid-19' ||
            titleCase(data) == 'Osteoarthritis'
          ) {
            return true;
          } else return false;
        });
        setWantInfo(wantImageInput);
        const diagnosedDisease = await createDiagnosedDisease({
          appointmentId: appointment.data.data.data,
          providedSymptoms: symptomsList.toString(),
          diagnosedDisease: resp.data.predictions.toString(),
          wantExtraInfo: wantImageInput,
          givenExtraInfo: false,
          otherDetails: wantImageInput
            ? 'Upload Image of you X-ray for further Inquiry'
            : 'Please refer to our doctors',
        });
        if (resp) {
          setTimeout(() => {
            setLoading(false);
            setData(resp.data.predictions);
          }, 2000);
        } else {
          console.log('failed');
          setLoading(false);
        }
      } catch (e) {
        console.log('An error has occurred', e);
        setLoading(false);
      }
    };
    getResults();
  }, [symptomsList]);

  return (
    <View>
      <Spinner
        visible={loading}
        animation="none"
        textContent="Analyzing results..."
        overlayColor="rgba(0, 0, 0, 0.5)"
        textStyle={resultStyle.spinnerTextStyle}
      />
      <AppBarWrapper
        title={'Results'}
        onPress={() => {
          navigation.navigate('Main');
        }}
        showButton={false}
        onMenuPress={toggle}
      />
      <ScrollView style={resultStyle.scrollView}>
        <View style={[styles.top, {height: 225}]}></View>
        <Text style={[styles.openText, {marginTop: 100}]}>Results</Text>
        {!wantInfo ? (
          <Text style={resultStyle.openText}>
            Please note that the list below may not be complete and is provided
            solely for informational purposes and is not a qualified medical
            opinion.
          </Text>
        ) : (
          <Text style={resultStyle.openText}>
            Please go to Appointment History and check further details.
          </Text>
        )}
        <View style={resultStyle.cardWrapper}>
          {data &&
            !wantInfo &&
            data.map((obj, index) => {
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
                <View style={resultStyle.resCard}>
                  <ProgressBar
                    percentage={percentage}
                    color={color}
                    textColor={color}
                  />
                  <Text
                    style={[styles.openText, {marginLeft: 15, fontSize: 25}]}>
                    {obj}
                  </Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

const resultStyle = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  openText: {
    fontSize: 15,
    color: '#a1a1a1',
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: 20,
    textAlign: 'justify',
  },
  cardWrapper: {
    marginVertical: 50,
  },
  spinnerTextStyle: {
    color: '#000000',
  },
  resCard: {
    backgroundColor: 'white',
    height: 100,
    marginVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    // width: 300,
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
});
