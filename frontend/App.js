import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { customFonts } from './config/config';

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'poppins', fontSize: 18 }}>Hello, world!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
