import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
const { width, height } = Dimensions.get('window');
import TabNavigation from '../../navigation/TabNavigtaion';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
const MapScreen = () => {
  const navigation = useNavigation();
  const [circleRadius, setCircleRadius] = useState(500);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      try {
        let position = await Location.getCurrentPositionAsync({});
        if (position && position.coords) {
          setLocation(position);
          console.log(position);
        } else {
          console.log('Failed to get location');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handelBackPressed = () => {
    navigation.navigate('Home');
  };
  const handleIncreaseCircle = () => {
    setCircleRadius(circleRadius + 100);
  };

  const handleDecreaseCircle = () => {
    if (circleRadius > 100) {
      setCircleRadius(circleRadius - 100);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity>
          <AntDesign
            style={{ marginTop: '5%' }}
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
        {isLoading ? (
          // Use BlurView component to create a blurred loading screen
          <BlurView intensity={100} tint="dark" style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color="gray" />
          </BlurView>
        ) : (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location?.coords.latitude ?? 35.8288,
              longitude: location?.coords.longitude ?? 10.6407,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            {location && (
              <>
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
                <Circle
                  center={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  radius={circleRadius}
                  strokeColor="rgba(0, 0, 255, 0.3)"
                  fillColor="rgba(0, 0, 255, 0.05)"
                />
              </>
            )}
          </MapView>
        )}
        <View style={styles.circleButtonsContainer}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={handleIncreaseCircle}
          >
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={handleDecreaseCircle}
          >
            <AntDesign name="minus" size={24} color="white" />
          </TouchableOpacity>
        </View>
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
  circleButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80,
    height: 50,
    backgroundColor: '#0008',
    borderRadius: 25,
    paddingHorizontal: 10,
  },

  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
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
