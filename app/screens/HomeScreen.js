import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

import CustomCard from '../components/Card';
export const Home = () => {
  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <View style={homeStyles.top}></View>
      <Text
        style={{
          fontSize: 15,
          color: '#a1a1a1',
          marginTop: 100,
          letterSpacing: 0.5,
          fontWeight: '600',
        }}>
        Good evening, Shehzer
      </Text>
      <Text style={homeStyles.openText}>How are you today?</Text>
      <CustomCard
        width={345}
        height={180}
        backColor="#B5DEFF"
        cirBackCol="#86c6f42a"
        bottom={-10}
        right={-20}>
        <Image
          source={require('../images/robDoc.png')}
          style={homeStyles.cardImage}
        />
        <View style={{marginTop: 55}}>
          <Text
            style={[
              homeStyles.cardText,
              {fontWeight: '700', marginBottom: 10},
            ]}>
            Go Smart
          </Text>
          <Text
            style={[
              homeStyles.cardText,
              {fontSize: 15, textTransform: 'none'},
            ]}>
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
              style={[homeStyles.cardText, {fontWeight: '700', color: '#fff'}]}>
              Check Doctors in your Area
            </Text>
          </View>
          <Image
            source={require('../images/doctors.png')}
            style={[homeStyles.cardImage, {width: 175, right: 0}]}
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
            <Text style={[homeStyles.cardText, {fontWeight: '700'}]}>
              Explore pharmacies near you
            </Text>
          </View>
          <Image
            source={require('../images/Pharmacies.png')}
            style={[
              homeStyles.cardImage,
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
          style={[homeStyles.cardImage, {right: 10, bottom: 0, height: 140}]}
        />
        <View style={{marginTop: 55}}>
          <Text
            style={[
              homeStyles.cardText,
              {fontWeight: '700', marginBottom: 10},
            ]}>
            Book an appointment
          </Text>
          <Text
            style={[
              homeStyles.cardText,
              {fontSize: 15, textTransform: 'none'},
            ]}>
            In-person or online video appointment
          </Text>
        </View>
      </CustomCard>
    </ScrollView>
  );
};

const homeStyles = StyleSheet.create({
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

export default Home;
