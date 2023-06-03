import { View } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUp1';
import OtpScreen from '../screens/otpScreen/OtpScreen';
import SucessScreen from '../screens/UserVerified/SucessScreen';
import StoreScreen from '../screens/storeScreen/StoreScreen';
import VoucherScreen from '../screens/voucherScreen/VoucherScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthProvider';

import QrReservation from '../screens/reservationQR/QrReservation';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';

import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import QrCodeScreen from '../screens/qrCodeScreen/QrCodeScreen';

import TabNavigation from './TabNavigtaion';
import DrawerNavigation from './DrawerNavigation';

import Loading from '../components/loading/Loading';
import Loading2 from '../components/loading2/Loading2';

const Stack = createNativeStackNavigator();

function Root() {
  const [isTryingLogIn, setIsTryingLogIn] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken) {
        authCtx.authenticate({
          token: storedToken,
          user: JSON.parse(storedUser),
        });
      }
    }
    const timeoutId = setTimeout(() => {
      setIsTryingLogIn(false);
      <Loading />;
    }, 1000);

    fetchToken();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (isTryingLogIn) {
    return (
      <View>
        <Loading2 />
      </View>
    );
  }

  return <NavigationCheckAuth />;
}
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginIn" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="SucessScreen" component={SucessScreen} />
      <Stack.Screen name="Home" component={TabNavigation} />
      <Stack.Screen name="Store" component={StoreScreen} />
      <Stack.Screen name="QrCode" component={QrCodeScreen} />
      <Stack.Screen name="QrCpdeReservation" component={QrReservation} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Voucher" component={VoucherScreen} />
    </Stack.Navigator>
  );
}
function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
      <Stack.Screen name="Home" component={TabNavigation} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Store" component={StoreScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Voucher" component={VoucherScreen} />
      <Stack.Screen name="QrCode" component={QrCodeScreen} />
      <Stack.Screen name="QrCpdeReservation" component={QrReservation} />
    </Stack.Navigator>
  );
}
function NavigationCheckAuth() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
const Navigation = () => {
  return <Root />;
};

export default Navigation;
