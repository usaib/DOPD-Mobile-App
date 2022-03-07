import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../screens/Settings';
import MainScreen from '../screens/MainScreen';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
