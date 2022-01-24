/**
 * @format
 */
import * as React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.log(DefaultTheme);
const theme = {
  ...DefaultTheme,
  roundness: 12,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0381d1',
    accent: '#0381d1',
    background: '#F0F3F4',
  },
};
export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
