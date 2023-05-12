import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import ScanQrScreen from '../Screens/ScanQrScreen/ScanQrScreen';
import { AuthContext } from '../context/AuthProvider';

const StoreStack = createNativeStackNavigator();
const StoreNavigation = () => {
  return (
    <StoreStack.Navigator screenOptions={{ headerShown: false }}>
      <StoreStack.Screen name="LoginStore" component={LoginScreen} />
      <StoreStack.Screen name="ScanQr" component={ScanQrScreen} />
    </StoreStack.Navigator>
  );
};
const AuthNavigation = () => {
  const {isLoading,}=useContext(AuthContext)
    return (
    <NavigationContainer>
      <StoreNavigation />
    </NavigationContainer>
  );
};
export default AuthNavigation;
