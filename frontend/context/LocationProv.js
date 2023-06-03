import React, { createContext, useState } from 'react';

const LocContext = createContext();

export const LocProvider = ({ children }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [cityLocation, setCityLocation] = useState('');
  const [locationRegion, setLocationRegion] = useState('');
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
