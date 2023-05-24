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
import React, { useState, useEffect, useRef } from 'react';
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
import Slider from '@react-native-community/slider';
const MapScreen = () => {
  const navigation = useNavigation();
  const [circleRadius, setCircleRadius] = useState(100);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const mapRef = useRef(null);

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
  const handleCircleRadiusChange = (value) => {
    setCircleRadius(value);
    console.log('value', value);
    if (mapRef.current) {
      const currentRegion = mapRef.current.props.initialRegion;
      const zoomLevel = Math.log2(
        (360 * ((circleRadius / 1000) * 2 * Math.PI)) / 256
      );
      const zoomFactor = Math.max(zoomLevel, -8); // Valeur minimale de zoom pour éviter un zoom excessif
      const deltaFactor = Math.exp(zoomFactor * Math.LN2);
      const region = {
        ...currentRegion,
        latitudeDelta: currentRegion.latitudeDelta * deltaFactor,
        longitudeDelta: currentRegion.longitudeDelta * deltaFactor,
      };
      mapRef.current.animateToRegion(region, 500);
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
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location?.coords.latitude || 35.8288,
              longitude: location?.coords.longitude || 10.6407,
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
          <Slider
            style={styles.slider}
            minimumValue={100}
            maximumValue={1000}
            step={100}
            value={circleRadius}
            onValueChange={handleCircleRadiusChange}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FFFFFF"
          />
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
    backgroundColor: '#fff',
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
    width: 200, // Adjust this value as needed
    height: 50,
    backgroundColor: '#0008',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  slider: {
    flex: 1,
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
