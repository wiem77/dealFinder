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

// export const AuthContext = createContext({
//   user: null,

//   signIn: () => {},
//   signOut: () => {},
// });

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);

// const signIn = async (email, password) => {
//   console.log('email', email, password);
//   try {
//     const response = await axios.post(`${baseUrl}/signIn`, {
//       email: email.toLowerCase(),
//       password,
//     });
//     console.log('response:', response.data.accessToken);

//     setUser(response.data.user);
//     setRole(response.data.role);
//     return response.data.role;
//   } catch (error) {
//     if (error.response && error.response.status === 400) {
//       throw new Error('Invalid email or password');
//     } else {
//       console.log('Server error:', error);
//       throw new Error(
//         'An error occurred while signing in. Please try again later.'
//       );
//     }
//   }
// };

//   const signOut = () => {
//     setUser(null);
//     setRole(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, role, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider;
