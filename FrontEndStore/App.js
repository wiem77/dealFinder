import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { customFonts } from './config/config';
import Navigation from './navigation/Navigation';
import { useFonts } from 'expo-font';
import { AuthContext, AuthProvider } from './context/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanQrScreen from './Screens/ScanQrScreen/ScanQrScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import VerificationScreen from './Screens/VerificationScreen/Verification';
import SuccessVerification from './Screens/sucessScreen/SucessVerification';
import IconButton from './components/iconButton/IconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
const Stack = createNativeStackNavigator();
// SplashScreen.preventAutoHideAsync();

export default function App() {
  function Root() {
    const [isTryingLogIn, setIsTryingLogIn] = useState(true);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
      async function fetchToken() {
        const storedToken = await AsyncStorage.getItem('token');
        const storedStore = await AsyncStorage.getItem('store');

        console.log('storedToken', storedToken);
        console.log('storedStore', storedStore);

        if (storedToken) {
          authCtx.authenticate({
            token: storedToken,
            store: JSON.parse(storedStore),
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
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image source={require('./assets/image/loading.gif')} />
        </View>
      );
    }

    return <Navigation />;
  }
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
    const authCtx = useContext(AuthContext);
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ScanQr"
          component={ScanQrScreen}
          options={{
            headerRight: () => (
              <IconButton
                icon="exit"
                color={'black'}
                size={28}
                onPress={authCtx.logout}
              />
            ),
          }}
        />
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
      <Root />
    </AuthProvider>
  );
}
