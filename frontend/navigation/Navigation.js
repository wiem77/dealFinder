import { StyleSheet, Image, View } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUp1';
import OtpScreen from '../screens/otpScreen/OtpScreen';
import SucessScreen from '../screens/UserVerified/SucessScreen';
import Test from '../screens/Test';
import TabNavigation from './TabNavigtaion';
import MapScreen from '../screens/mapScreen/MapScreen';
import Loading from '../components/loading/Loading';

import QrCodeScreen from '../screens/qrCodeScreen/QrCodeScreen';
import StoreScreen from '../screens/storeScreen/StoreScreen';
import VoucherScreen from '../screens/voucherScreen/VoucherScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Favorite from '../screens/favoriteScreen/Favorite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthProvider';
import * as SplashScreen from 'expo-splash-screen';
import IconButton from '../components/iconButton/IconBtn';
import QrReservation from '../screens/reservationQR/QrReservation';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import DrawerNavigation from './DrawerNavigation';

const ConsumerStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

function Root() {
  const [isTryingLogIn, setIsTryingLogIn] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      console.log('storedToken', storedToken);
      console.log('storedUser', storedUser);

      if (storedToken) {
        authCtx.authenticate({
          token: storedToken,
          user: JSON.parse(storedUser),
        });
      }
    }
    const timeoutId = setTimeout(() => {
      setIsTryingLogIn(false);
      SplashScreen.hideAsync();
    }, 1000);

    fetchToken();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (isTryingLogIn) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../assets/loading.gif')} />
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
  const authCtx = useContext(AuthContext);
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
const ConsumerNavigation = () => {
  return (
    <ConsumerStack.Navigator screenOptions={{ headerShown: false }}>
      <ConsumerStack.Screen name="Home" component={TabNavigation} />

      <ConsumerStack.Screen name="Store" component={StoreScreen} />

      <ConsumerStack.Screen name="Profile" component={ProfileScreen} />

      <ConsumerStack.Screen name="Voucher" component={VoucherScreen} />

      <ConsumerStack.Screen name="SignUp" component={SignUpScreen} />
      <ConsumerStack.Screen name="LoginIn" component={LoginScreen} />
      <ConsumerStack.Screen name="OtpScreen" component={OtpScreen} />
      <ConsumerStack.Screen name="SucessScreen" component={SucessScreen} />
      <ConsumerStack.Screen name="Test" component={Test} />
    </ConsumerStack.Navigator>
  );
};
const Navigation = () => {
  return <Root />;
};

export default Navigation;
