import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { baseUrl } from '../config/config';
const Test = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [locationRegion, setLocationRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocationName(geocode[0].city);
      setLocationRegion(geocode[0].region);

      // Envoi de la localisation au serveur avec Axios
      axios
        .post(`${baseUrl}/location/addLocation`, {
          type: 'Point',
          coordinates: [location.coords.longitude, location.coords.latitude],
          formattedAddress: `${geocode[0].city}, ${geocode[0].region}`,
          city: geocode[0].city,
          country: geocode[0].country,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: '50%',
        }}
      >
        <MaterialIcons name="location-on" size={24} color="black" />
        {locationName && (
          <Text styel={{ fontSize: 50, color: 'black' }}>
            {locationName}, {locationRegion} ,test
          </Text>
        )}
      </View>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
