import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';

const StoreStack = createNativeStackNavigator();
const StoreNavigation = () => {
  return (
    <StoreStack.Navigator screenOptions={{ headerShown: false }}>
      <StoreStack.Screen name="LoginStore" component={LoginScreen} />
    </StoreStack.Navigator>
  );
};
const Navigation = () => {
  return (
    <NavigationContainer>
      <StoreNavigation />
    </NavigationContainer>
  );
};
export default Navigation;
