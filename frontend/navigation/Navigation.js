import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import OtpScreen from '../screens/otpScreen/OtpScreen';
import SucessScreen from '../screens/UserVerified/SucessScreen';

const ConsumerStack = createNativeStackNavigator();
const ConsumerNavigation = () => {
  return (
    <ConsumerStack.Navigator screenOptions={{ headerShown: false }}>
      <ConsumerStack.Screen name="SucessScreen" component={SucessScreen} />
      <ConsumerStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <ConsumerStack.Screen name="LoginIn" component={LoginScreen} />
      <ConsumerStack.Screen name="OtpScreen" component={OtpScreen} />
      <ConsumerStack.Screen name="SignUp" component={SignUpScreen} />
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
