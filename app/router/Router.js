import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from '../stacks/AppStack';
import AuthStack from '../stacks/AuthStack';
import {useUserState} from '../context/userContext';
import Loader from '../components/Loader';
import Splash from '../components/Splash';

function Router() {
  const userState = useUserState();
  if (typeof userState.isAuthenticated == 'undefined') {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      {true ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Router;
