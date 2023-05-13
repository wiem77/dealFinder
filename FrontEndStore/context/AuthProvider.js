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
    setStoreInfo(JSON.stringify(store));
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

//   const [userInfo, setUserInfo] = useState(null);
//   const [token, setToken] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const login = (accesscode) => {
//     setIsLoading(true);
//     axios
//       .post(`${baseUrl}/store/loginStore`, {
//         accesscode,
//       })
//       .then((res) => {
//         let userInfo = res.data;
//         setUserInfo(userInfo);
//         console.log('userInfo', userInfo);
//         setToken(res.data.accessToken);

//         AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
//         AsyncStorage.setItem('userToken', res.data.accessToken);

//         console.log(res.data.accessToken);
//       })
//       .catch((e) => {
//         console.log(`login error ${e}`);
//       });
//   };

//   //   const login = async (accesscode) => {
//   //     try {
//   //       const res = await axios.post(`${baseUrl}/store/loginStore`, {
//   //         accesscode,
//   //       });
//   //       setUser(res.data.store);
//   //       axios.defaults.headers.common[
//   //         'Authorization'
//   //       ] = `Bearer ${res.data.accessToken}`;

//   //       console.log('User logged in:', res.data.store); // add this

//   //       return true;
//   //     } catch (error) {
//   //       console.error(error);
//   //       return false;
//   //     }
//   //   };

//   //   const login = async (accesscode) => {
//   //     try {
//   //       const res = await axios.post(`${baseUrl}/store/loginStore`, {
//   //         accesscode,
//   //       });
//   //       setUser(res.data.store);
//   //       axios.defaults.headers.common[
//   //         'Authorization'
//   //       ] = `Bearer ${res.data.accessToken}`;

//   //       return true;
//   //     } catch (error) {
//   //       console.error(error);
//   //       return false;
//   //     }
//   //   };

//   const logout = async () => {
//     setIsLoading(true);
//     setToken(null);
//     AsyncStorage.removeItem('userInfo');
//     AsyncStorage.removeItem('userToken');
//     setIsLoading(false);
//     // try {
//     //   await axios.post(`${baseUrl}/store/logout`);
//     //   setUser(null);
//     //   delete axios.defaults.headers.common['Authorization'];
//     //   return true;
//     // } catch (error) {
//     //   console.error(error);
//     //   return false;
//     // }
//   };

//   const isLoggedIn = async () => {
//     try {
//       setIsLoading(true);
//       let userToken = await AsyncStorage.getItem('userToken');
//       let userInfo = await AsyncStorage.getItem('userInfo');
//       userInfo = JSON.parse(userInfo);
//       if (userInfo) {
//         setToken(userToken);
//         setUserInfo(userInfo);
//       }
//       setIsLoading(false);
//     } catch (error) {
//       console.log('is logged', error);
//     }
//   };
//   const values = {
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         login,
//         logout,isLoading,userInfo,token
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };