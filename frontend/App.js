import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { customFonts } from './config/config';
import Navigation from './navigation/Navigation';
import { AuthContext, AuthProvider } from './context/AuthProvider';
import { StoresProvider } from './context/StoreProvider';
import 'react-native-gesture-handler';
import { CategoryProvider } from './context/CtegoryProvider';
export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <StoresProvider>
      <CategoryProvider>
        <AuthProvider>
          <StatusBar style="auto" />
          <Navigation />
        </AuthProvider>
      </CategoryProvider>
    </StoresProvider>
  );
}
