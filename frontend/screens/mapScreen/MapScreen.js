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
import axios from 'axios';
import { BlurView } from 'expo-blur';
import { baseUrl } from '../../config/config';
const MapScreen = () => {
  const navigation = useNavigation();
  const [circleRadius, setCircleRadius] = useState(500);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState([]);
  async function getStoresLocations() {
    try {
      const response = await axios.get(
        `${baseUrl}/store/getAllStoreWithLocations`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

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

      try {
        const response = await axios.get(
          `${baseUrl}/store/getAllStoreWithLocations`
        );
        setStores(response.data);
      } catch (error) {
        console.log(error);
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
          <BlurView intensity={500} tint="dark" style={styles.loadingIndicator}>
            <ActivityIndicator size="100%" color="white" />
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
                {stores.map((store) => (
                  <Marker
                    key={store._id}
                    coordinate={{
                      latitude: store.locations[0].coordinates[1],
                      longitude: store.locations[0].coordinates[0],
                    }}
                    title={store.store_name}
                    description={store.email}
                  />
                ))}
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
    bottom: '15%',
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
