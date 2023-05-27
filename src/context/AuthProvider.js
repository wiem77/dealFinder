import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: ({ token, user }) => {},
  logout: () => {},
  user: {},
});

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setUserInfo(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  function authenticate({ token, user }) {
    setAuthToken(token);
    setUserInfo(user);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  function logout() {
    setAuthToken('');
    setUserInfo({});
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  console.log(userInfo);
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    user: userInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
