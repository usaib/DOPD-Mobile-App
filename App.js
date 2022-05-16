// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */
import 'react-native-gesture-handler';
import React from 'react';
import Router from './app/router/Router';
import {UserProvider} from './app/context/userContext';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning:...']);
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export const BASE_URL = 'https://soft-crabs-rule-182-190-194-88.loca.lt';
