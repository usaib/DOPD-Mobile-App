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

export const BASE_URL = 'https://04e1-27-96-92-112.ngrok.io';
