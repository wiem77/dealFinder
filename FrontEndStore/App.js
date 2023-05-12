import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { customFonts } from './config/config';
import Navigation from './navigation/Navigation';
import { useFonts } from 'expo-font';
import { AuthContext, AuthProvider, uthContext } from './context/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanQrScreen from './Screens/ScanQrScreen/ScanQrScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import VerificationScreen from './Screens/VerificationScreen/Verification';
import SuccessVerification from './Screens/sucessScreen/SucessVerification';

const Stack = createNativeStackNavigator();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }
  function AuthenticatedStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ScanQr" component={ScanQrScreen} />
        <Stack.Screen name="Success" component={SuccessVerification} />
        <Stack.Screen name="Verif" component={VerificationScreen} />
      </Stack.Navigator>
    );
  }
  function Navigation() {
    const authCtx = useContext(AuthContext);
    return (
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
    );
  }
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
