import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
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
const ConsumerStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginIn" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="SucessScreen" component={SucessScreen} />
      <Stack.Screen name="Home" component={TabNavigation} />
      <Stack.Screen name="QrCode" component={QrCodeScreen} />
      <Stack.Screen name="Store" component={StoreScreen} />

      <Stack.Screen name="Profile" component={ProfileScreen} />

      <Stack.Screen name="Voucher" component={VoucherScreen} />
    </Stack.Navigator>
  );
}
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabNavigation} />
      <Stack.Screen name="Store" component={StoreScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Voucher" component={VoucherScreen} />
      <Stack.Screen name="QrCode" component={QrCodeScreen} />
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
  return <NavigationCheckAuth />;
};

export default Navigation;

const styles = StyleSheet.create({});
