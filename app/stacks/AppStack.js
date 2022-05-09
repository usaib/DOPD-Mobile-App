import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Settings from '../screens/Settings';
import MainScreen from '../screens/MainScreen';
import DrawerList from '../components/DrawerList';
import {Icon} from 'react-native-elements';
import HomeStack from './HomeStack';
import History from '../screens/History';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        itemStyle: {marginVertical: 5},
        fontFamily: 'Gibson-Regular',
      }}
      drawerLabelStyle={{
        fontFamily: 'Gibson-Regular',
      }}
      drawerItemStyle={{
        fontFamily: 'Gibson-Regular',
      }}
      labelStyle={{
        fontFamily: 'Gibson-Regular',
      }}
      style={{
        itemStyle: {marginVertical: 5},
        fontFamily: 'Gibson-Regular',
      }}
      drawerContent={props => <DrawerList {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Icon
              name="home"
              type="feather"
              color={'#3498DB'}
              onPress={() => onDelete(symptom)}
            />
          ),
        }}
        component={HomeStack}
        labelStyle={{
          itemStyle: {marginVertical: 5},
          fontFamily: 'Gibson-Regular',
        }}
      />
      <Drawer.Screen
        name="Appointment History"
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Icon
              name="history"
              color={'#3498DB'}
              onPress={() => onDelete(symptom)}
            />
          ),
        }}
        component={History}
        labelStyle={{
          itemStyle: {marginVertical: 5},
          fontFamily: 'Gibson-Regular',
        }}
      />
      {/* <Drawer.Screen
        name="Settings"
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Icon
              name="settings"
              color={'#3498DB'}
              onPress={() => onDelete(symptom)}
            />
          ),
        }}
        component={Settings}
        labelStyle={{
         
          itemStyle: {marginVertical: 5},
          fontFamily: 'Gibson-Regular',
        }}
      /> */}
    </Drawer.Navigator>
  );
};
export default AppStack;
