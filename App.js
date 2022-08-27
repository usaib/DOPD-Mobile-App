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
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  setTimeout(() => SplashScreen.hide(), 500);
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export const BASE_URL = 'https://rich-icons-live-39-57-212-87.loca.lt';
