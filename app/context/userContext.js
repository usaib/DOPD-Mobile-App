import React from 'react';
import {createContext, useContext, useReducer, useEffect} from 'react';
import {fetchUser} from '../services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'UPDATE_USER':
      return {...state, isAuthenticated: true, user: action.payload.user};
    case 'TOKEN_REFRESH':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
  }

  return null;
};

const getData = async key => {
  try {
    console.log(key);
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return false;
  }
};

const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  useEffect(() => {
    async function getUser() {
      const isAuthenticated = !!(await getData('isAuthenticated'));
      const id = await getData('id');
      if (isAuthenticated === false) {
        dispatch({type: 'LOGOUT'});
      }
      if (isAuthenticated) {
        const resp = await fetchUser({id: id});
        console.log('id 2 fetchesssss', resp.data);
        if (resp) {
          dispatch({type: 'UPDATE_USER', payload: {user: resp.data.data}});
        } else {
          dispatch({type: 'LOGOUT'});
        }
      }
    }

    getUser();
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};
const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
};

const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
};

export {UserProvider, useUserState, useUserDispatch};
