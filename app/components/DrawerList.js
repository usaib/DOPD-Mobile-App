import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';

const DrawerList = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <View style={styles.porfileView}>
        <Image
          source={require('../images/user.png')}
          style={styles.sideMenuProfileIcon}
        />
        <Text
          // onPress={() => {}}
          style={styles.text}>
          Usaib Khan
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Visit Us"
          labelStyle={{
            fontFamily: 'Gibson-Regular',
          }}
          icon={() => (
            <Icon
              name="world-o"
              type="fontisto"
              color={'#3498DB'}
              onPress={() => onDelete(symptom)}
            />
          )}

          //   onPress={}
        />
        {/* <View style={styles.customItem}>
          <Text
            style={{
              fontFamily: 'Gibson-Regular',
            }}
            // onPress={() => {}}
          >
            Rate Us
          </Text>
          <Image
            source={require('../images/star.png')}
            style={styles.iconStyle}
          />
        </View> */}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Gibson-Regular',
  },
  porfileView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    width: '100%',
    backgroundColor: '#0381f0',
  },
  text: {
    bottom: -5,
    color: '#FFFFFF',
    fontFamily: 'Gibson-Regular',
    fontSize: 16,
  },
});

export default DrawerList;
