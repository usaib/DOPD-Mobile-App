import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Settings from '../screens/Settings';
import MainScreen from '../screens/MainScreen';
import DrawerList from '../components/DrawerList';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#e91e63',
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
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
        fontFamily: 'Gibson-Regular',
      }}
      drawerContent={props => <DrawerList {...props} />}>
      <Drawer.Screen
        name="Main"
        options={{headerShown: false}}
        component={MainScreen}
        labelStyle={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
          fontFamily: 'Gibson-Regular',
        }}
      />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};
export default AppStack;
