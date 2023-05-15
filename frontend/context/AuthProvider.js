import React, { useState, createContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: ({ token, user }) => {},
  logout: () => {},
  user: {},
});
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  function authenticate({ token, user }) {
    console.log('test');
    setAuthToken(token);
    setUserInfo(user);

    setIsAuthenticated(true);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('user', JSON.stringify(user));
    console.log('userrrrrrrrr', user);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user');
  }
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    user: userInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
