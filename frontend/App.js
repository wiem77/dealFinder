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
import { FavoritesProvider } from './context/FavoriteProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocProvider } from './context/LocationProv';
export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <NativeBaseProvider>
      <LocProvider>
        <StoresProvider>
          <CategoryProvider>
            <FavoritesProvider>
              <AuthProvider>
                <StatusBar style="auto" />
                <Navigation />
              </AuthProvider>
            </FavoritesProvider>
          </CategoryProvider>
        </StoresProvider>
      </LocProvider>
    </NativeBaseProvider>
  );
}
