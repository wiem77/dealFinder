import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const StoreContext = createContext();

export const StoresProvider = ({ children }) => {
  const [stores, setStores] = useState();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${baseUrl}/store/getAllStore`);
        const data = response.data;

        setStores(data);
        await AsyncStorage.setItem('stores', JSON.stringify(data));
        console.log('Data fetched:', JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    };

    AsyncStorage.getItem('stores')
      .then((storesData) => {
        if (storesData) {
          setStores(JSON.parse(storesData));
          console.log('storesData:', JSON.parse(storesData));
        } else {
          fetchStores();
        }
      })
      .catch((error) => console.error(error));
  }, []);
  function RemoveStore() {
    AsyncStorage.removeItem('stores');
    setStores(null);
    console.log('deleted Store');
  }

  return (
    <StoreContext.Provider value={{ stores, RemoveStore }}>
      {children}
    </StoreContext.Provider>
  );
};
