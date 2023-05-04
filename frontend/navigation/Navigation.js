import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
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

const ConsumerStack = createNativeStackNavigator();
const ConsumerNavigation = () => {
  return (
    <ConsumerStack.Navigator screenOptions={{ headerShown: false }}>
      <ConsumerStack.Screen name="Home" component={TabNavigation} />
      <ConsumerStack.Screen name="Store" component={StoreScreen} />

      <ConsumerStack.Screen name="WelcomeScreen" component={WelcomeScreen} />

      <ConsumerStack.Screen name="Profile" component={ProfileScreen} />

      <ConsumerStack.Screen name="Voucher" component={VoucherScreen} />

      <ConsumerStack.Screen name="SignUp" component={SignUpScreen} />
      <ConsumerStack.Screen name="LoginIn" component={LoginScreen} />
      <ConsumerStack.Screen name="OtpScreen" component={OtpScreen} />
      <ConsumerStack.Screen name="SucessScreen" component={SucessScreen} />
      <ConsumerStack.Screen name="Test" component={Test} />
      <ConsumerStack.Screen name="QrCode" component={QrCodeScreen} />
    </ConsumerStack.Navigator>
  );
};
const Navigation = () => {
  return (
    <NavigationContainer>
      <ConsumerNavigation />
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
