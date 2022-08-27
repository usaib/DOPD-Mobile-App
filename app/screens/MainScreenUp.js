import React, {useState} from 'react';
import {View, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import {useUserDispatch, useUserState} from '../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBarWrapper from '../components/AppBar';
import {Avatar} from 'react-native-paper';
import CustomCard from '../components/Card';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

function MainScreen({navigation}) {
  const userDispatch = useUserDispatch();
  const userState = useUserState();
  console.log('userstate', userState);
  const [rippleOverflow, setRippleOverflow] = useState(false);
  const [showFab, setShowFab] = useState(true);

  const removeValue = async value => {
    try {
      await AsyncStorage.removeItem(value);
    } catch (e) {
      console.log('Error in removing', e);
    }
    console.log('Done');
  };
  const toggle = () => {
    navigation?.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <AppBarWrapper
        showButton={true}
        title={'Home'}
        onPress={async () => {
          userDispatch({type: 'LOGOUT'});
          await removeValue('isAuthenticated');
          await removeValue('id');
        }}
        showMenu={true}
        onMenuPress={toggle}
      />

      <ScrollView
        contentContainerStyle={{
          alignSelf: 'center',
        }}>
        <View style={styles.top}>
          <Text
            style={{
              fontSize: 15,
              color: '#a1a1a1',
              marginTop: 100,
              letterSpacing: 0.5,
              fontWeight: '600',
            }}>
            Good afternoon, {userState.user ? userState.user.name : ''} !
          </Text>
          <Text style={styles.openText}>How are you today?</Text>
        </View>

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
          <CustomCard
            onPress={() => {
              navigation.navigate('FindDoctors');
            }}
            width={345}
            height={180}
            backColor="#053F5E">
            <View style={{marginTop: 55, width: 200}}>
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
        </View>
      </ScrollView>
    </View>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  top: {
    height: 170,
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#B5DEFF35',
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 10,
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
