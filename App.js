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

<<<<<<< HEAD
export const BASE_URL = 'https://soft-crabs-rule-182-190-194-88.loca.lt';
=======
export const BASE_URL = 'https://20d2-103-196-160-81.ngrok.io';
>>>>>>> f584e96cd9a2a9d6bbab28e7e4f4fa0367186ed3
