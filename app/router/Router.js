import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from '../stacks/AppStack';
import AuthStack from '../stacks/AuthStack';
import {useUserState} from '../context/userContext';
import Loader from '../components/Loader';
function Router() {
  const userState = useUserState();
  if (typeof userState.isAuthenticated == 'undefined') {
    return <Loader />;
  }
  return (
    <NavigationContainer>
      {userState.isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Router;
