import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../config/config';

export const StoresContext = createContext({
  stores: null,
});

export const StoresProvider = ({ children }) => {
  const [stores, setStores] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getStores = async () => {
      try {
        const response = await axios.get(`${baseUrl}/store/getAllStore`);
        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error('An error occurred while fetching stores');
      }
    };

    getStores()
      .then((data) => {
        if (isMounted) {
          setStores(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StoresContext.Provider value={{ stores, isLoading }}>
      {children}
    </StoresContext.Provider>
  );
};
