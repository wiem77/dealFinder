import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LocContext = createContext();

export const LocProvider = ({ children }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [cityLocation, setCityLocation] = useState('');
  const [locationRegion, setLocationRegion] = useState('');

  useEffect(() => {
    const saveDataToStorage = async () => {
      try {
        const data = {
          latitude,
          longitude,
          cityLocation,
          locationRegion,
        };
        await AsyncStorage.setItem('locationData', JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    };

    saveDataToStorage();
  }, [latitude, longitude, cityLocation, locationRegion]);

  return (
    <LocContext.Provider
      value={{
        latitude,
        setLatitude,
        longitude,
        locationRegion,
        setLocationRegion,
        setLongitude,
        cityLocation,
        setCityLocation,
      }}
    >
      {children}
    </LocContext.Provider>
  );
};

export default LocContext;
