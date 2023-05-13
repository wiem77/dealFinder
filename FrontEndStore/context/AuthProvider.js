import React, { createContext, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: ({ token, store }) => {},
  logout: () => {},
  store: {},
});
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [storeInfo, setStoreInfo] = useState();
  const [issAuthenticated, setIsAuthenticated] = useState(false);
  function authenticate({ token, store }) {
    setAuthToken(token);
    setStoreInfo(store);
    setIsAuthenticated(true);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('store', JSON.stringify(store));
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('store');
  }
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    store: storeInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
