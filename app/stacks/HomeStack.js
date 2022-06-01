import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../screens/Settings';
import MainScreen from '../screens/MainScreen';
import Results from '../screens/Results';
import {DcotorsScreen} from '../screens/DcotorsScreen';
import {SearchFilter} from '../screens/SearchFilter';
import AppointmentDetails from '../screens/AppointmentDetails';
import {Appointment} from '../screens/Appointment';
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
        name="FindDoctors"
        component={DcotorsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchFilter"
        component={SearchFilter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Results"
        component={Results}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Appointment"
        component={Appointment}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
