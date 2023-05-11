import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { customFonts } from './config/config';
import Navigation from './navigation/Navigation';
import { useFonts } from 'expo-font';
export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <Navigation />
    </>
  );
}
