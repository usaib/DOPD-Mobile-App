import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {HistoryCard} from './HistoryCard';
import {IconButton} from 'react-native-paper';

export default function HistoryItems() {
  return (
    <HistoryCard
      minHeight={80}
      width={'95%'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      }}>
      <View style={styles.cardContainer}>
        <View style={styles.iconContainer}>
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
            }}>
            <Text
              style={[styles.cardTitle, {alignSelf: 'center', fontSize: 20}]}>
              20
            </Text>
            <Text
              style={[
                styles.cardTitle,
                {alignSelf: 'center', fontWeight: '400'},
              ]}>
              April
            </Text>
          </View>
        </View>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>Dr. Paresh Rawal</Text>

          <Text
            style={[
              styles.cardTitle,
              {
                fontSize: 13,
                color: '#c4c4c4',
                alignSelf: 'flex-start',
                fontWeight: '000',
              },
            ]}>
            Monday, 5:40 pm
          </Text>
          <Text
            style={[
              styles.cardTitle,
              {
                fontSize: 13,
                color: '#c4c4c4',
                alignSelf: 'flex-start',
                fontWeight: '000',
              },
            ]}>
            In-Person Appointment
          </Text>
          <Text
            style={[
              styles.cardTitle,
              {
                fontSize: 13,
                color: '#c4c4c4',
                alignSelf: 'flex-start',
                fontWeight: '000',
              },
            ]}>
            Patient Name: Shehzer Abbasi
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="account-details"
            color={'#0381d1'}
            size={30}
            onPress={() => console.log('Pressed')}
          />
        </View>
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
    // backgroundColor: '#ff12',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  iconContainer: {
    flex: 1,
    width: '10%',
    flexDirection: 'column',
    marginTop: 10,
  },

  cardTitleContainer: {
    width: '60%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#2A3D57',
    fontFamily: 'Nunito',
    fontWeight: '800',
    alignSelf: 'flex-start',
    fontSize: 16,
  },
});
