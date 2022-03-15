import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useUserDispatch} from '../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBarWrapper from '../components/AppBar';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import CustomCard from '../components/Card';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

function MainScreen({navigation}) {
  const userDispatch = useUserDispatch();
  const [rippleOverflow, setRippleOverflow] = useState(false);
  const [showFab, setShowFab] = useState(true);

  const removeValue = async value => {
    try {
      await AsyncStorage.removeItem(value);
    } catch (e) {
      console.log('Error in removing', e);
    }

    console.log('Done.');
  };
  const toggle = () => {
    navigation?.toggleDrawer();
  };
  useEffect(() => {
    console.log(navigation.getState());
  }, []);

  return (
    <View style={styles.container}>
      <AppBarWrapper
        showButton={true}
        title={'Home'}
        onPress={async () => {
          userDispatch({type: 'LOGOUT'});
          await removeValue('isAuthenticated');
        }}
        showMenu={true}
        onMenuPress={toggle}
      />
      <View style={styles.cardView}></View>
      <ScrollView
        style={{
          paddingHorizontal: 20,
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
        <View style={styles.top}></View>
        <Text
          style={{
            fontSize: 15,
            color: '#a1a1a1',
            marginTop: 100,
            letterSpacing: 0.5,
            fontWeight: '600',
          }}>
          Good evening, Usaib Khan !
        </Text>
        <Text style={styles.openText}>How are you today?</Text>
        <CustomCard
          onPress={() => {
            setShowFab(true);
            navigation.navigate('Settings', {
              showFab,
              setShowFab,
            });
          }}
          width={345}
          height={180}
          backColor="#B5DEFF"
          cirBackCol="#86c6f42a"
          bottom={-10}
          right={-20}>
          <Image
            source={require('../images/robDoc.png')}
            style={styles.cardImage}
          />
          <View style={{marginTop: 55}}>
            <Text
              style={[styles.cardText, {fontWeight: '700', marginBottom: 10}]}>
              Go Smart
            </Text>
            <Text
              style={[styles.cardText, {fontSize: 15, textTransform: 'none'}]}>
              Check your symptoms and find their cause using AI.
            </Text>
          </View>
        </CustomCard>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <CustomCard width={175} height={270} backColor="#053F5E">
            <View style={{marginTop: 55}}>
              <Text
                style={[styles.cardText, {fontWeight: '700', color: '#fff'}]}>
                Check Doctors in your Area
              </Text>
            </View>
            <Image
              source={require('../images/doctors.png')}
              style={[styles.cardImage, {width: 175, right: 0}]}
            />
          </CustomCard>
          <CustomCard
            width={160}
            height={270}
            backColor="#D3E4CD"
            cirBackCol="#ADC2A927"
            bottom={-5}
            right={-20}>
            <View style={{marginTop: 55}}>
              <Text style={[styles.cardText, {fontWeight: '700'}]}>
                Explore pharmacy near you
              </Text>
            </View>
            <Image
              source={require('../images/Pharmacies.png')}
              style={[
                styles.cardImage,
                {
                  width: 160,
                  right: -6,
                  bottom: -30,
                  height: 180,
                },
              ]}
            />
          </CustomCard>
        </View>
        <CustomCard
          width={345}
          height={180}
          backColor="#FFE194"
          cirBackCol="#E8E46E57"
          bottom={-10}
          right={-20}>
          <Image
            source={require('../images/appointment.png')}
            style={[styles.cardImage, {right: 10, bottom: 0, height: 140}]}
          />
          <View style={{marginTop: 55}}>
            <Text
              style={[styles.cardText, {fontWeight: '700', marginBottom: 10}]}>
              Book an appointment
            </Text>
            <Text
              style={[styles.cardText, {fontSize: 15, textTransform: 'none'}]}>
              In-person or online video appointment
            </Text>
          </View>
        </CustomCard>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  cardView: {
    flex: 1,
    margin: 10,
  },
  Text: {
    marginLeft: 10,
    color: '#3498DB',
    fontFamily: 'Gibson-Regular',
    fontSize: 20,
  },
  button: {
    fontFamily: 'Gibson-Regular',
    color: 'white',
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
export default MainScreen;
