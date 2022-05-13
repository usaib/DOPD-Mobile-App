import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import History from '../screens/History';
import AppointmentDetails from '../screens/AppointmentDetails';

const Stack = createNativeStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Appointment History"
        component={History}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Appointment Details"
        component={AppointmentDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default HistoryStack;
