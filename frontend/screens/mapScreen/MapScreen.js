import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
const MapScreen = () => {
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

  return (
    
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location?.coords.latitude ?? 37.78825,
        longitude: location?.coords.longitude ?? -122.4324,
        latitudeDelta: 15,
        longitudeDelta: 15,
      }}
    >
      {location && (
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="My Location"
          description="I am here"
        />
      )}
    </MapView>
  );
};

export default MapScreen;
const styles = StyleSheet.create({});
