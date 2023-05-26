import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { customFonts } from './config/config';
import Navigation from './navigation/Navigation';
import { AuthContext, AuthProvider } from './context/AuthProvider';
import { StoresProvider } from './context/StoreProvider';
import 'react-native-gesture-handler';
import { CategoryProvider } from './context/CtegoryProvider';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { LocationProvider } from './context/LocationProvider';
export default function App() {
  const newColorTheme = {
    brand: {
      900: '#8287af',
      800: '#7c83db',
      700: '#b3bef6',
    },
  };
  const theme = extendTheme({ colors: newColorTheme });
  const [fontsLoaded] = useFonts(customFonts);
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <NativeBaseProvider theme={theme}>
      <LocationProvider>
        <StoresProvider>
          <CategoryProvider>
            <AuthProvider>
              <StatusBar style="auto" />
              <Navigation />
            </AuthProvider>
          </CategoryProvider>
        </StoresProvider>
      </LocationProvider>
    </NativeBaseProvider>
  );
}
