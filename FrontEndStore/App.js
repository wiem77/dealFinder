import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { customFonts } from './config/config';
import Navigation from './navigation/Navigation';
import { useFonts } from 'expo-font';
import { AuthProvider, AuthContext } from './context/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanQrScreen from './Screens/ScanQrScreen/ScanQrScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import VerificationScreen from './Screens/VerificationScreen/Verification';
import SuccessVerification from './Screens/sucessScreen/SucessVerification';
const StoreStack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  // const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <NavigationContainer>
        <StoreStack.Navigator>
          <StoreStack.Screen name="ScanQr" component={ScanQrScreen} />
          <StoreStack.Screen name="Success" component={SuccessVerification} />

          <StoreStack.Screen name="VerifF" component={VerificationScreen} />

          <StoreStack.Screen name="Login" component={LoginScreen} />
        </StoreStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
