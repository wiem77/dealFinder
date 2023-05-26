import React, { createContext, useEffect, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState();
  const [locationName, setLocationName] = useState();
  const [locationRegion, setLocationRegion] = useState();
  const [altitude, setAltitude] = useState();
  const [longitude, setLongitude] = useState();
  useEffect(() => {
    console.log('Location:', location);
  }, [location]);

  useEffect(() => {
    console.log('Location Name:', locationName);
  }, [locationName]);

  useEffect(() => {
    console.log('Location Region:', locationRegion);
  }, [locationRegion]);

  useEffect(() => {
    console.log('Altitude:', altitude);
  }, [altitude]);

  useEffect(() => {
    console.log('Longitude:', longitude);
  }, [longitude]);
  return (
    <LocationContext.Provider
      value={{
        location,
        locationName,
        locationRegion,
        altitude,
        longitude,
        setLocation,
        setLocationName,
        setLocationRegion,
        setAltitude,
        setLongitude,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
