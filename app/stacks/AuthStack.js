import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import Signup from '../screens/Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
