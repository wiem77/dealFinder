import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
const { width, height } = Dimensions.get('window');
import TabNavigation from '../../navigation/TabNavigtaion';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';
const MapScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handelBackPressed = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity>
          <AntDesign style={{marginTop:'5%'}}
            name="arrowleft"
            size={30}
            color="black"
            onPress={handelBackPressed}
          />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ma carte</Text>
          <Entypo name="pin" size={24} color="black" />
        </View>
      </SafeAreaView>

      <View style={styles.contentContainer}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location?.coords.latitude ?? 37.78825,
            longitude: location?.coords.longitude ?? -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="My Location"
              description={`Latitude: ${location.coords.latitude.toFixed(
                6
              )}, Longitude: ${location.coords.longitude.toFixed(6)}`}
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

export default MapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF5F5',
  },

  contentContainer: {
    flex: 1,
    marginTop: '0%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#fff', // Ajout de la couleur de fond
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 80,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 45,
      },
    }),
  },
  
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    paddingHorizontal: 2,
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: Colors.black,
  },
});

// const styles = StyleSheet.create({
//   contentContainer: {
//   borderTopLeftRadius: 30,
//   borderTopRightRadius: 30,

//   paddingHorizontal: '10%',
//   paddingVertical: height * 0.05,
//   marginTop: 100,
//   width: '100%',
//   flex: 1,
//   // alignItems: 'center',
//   ...Platform.select({
//     ios: {
//       shadowColor: '#000',
//       shadowOffset: { width: 2, height: 2 },
//       shadowOpacity: 1,
//       shadowRadius: 3.84,
//     },
//     android: {
//       elevation: 15,
//     },
//   }),
// },});
