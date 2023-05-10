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
        const storesObject = response.data.reduce((acc, cur) => {
          acc[cur._id] = {
            ...cur,
            sub_categories: cur.sub_categories.reduce((subAcc, subCur) => {
              subAcc[subCur._id] = subCur;
              return subAcc;
            }, {}),
            locations: cur.locations.reduce((locAcc, locCur) => {
              locAcc[locCur._id] = locCur;
              return locAcc;
            }, {}),
            vouchers: cur.vouchers.reduce((vouAcc, vouCur) => {
              vouAcc[vouCur._id] = vouCur;
              return vouAcc;
            }, {}),
          };
          return acc;
        }, {});

        console.log(storesObject);
        return storesObject;
      } catch (error) {
        console.log(error);
        throw new Error('An error occurred while fetching stores');
      }
    };

    if (!stores) {
      getStores()
        .then((storesObject) => {
          if (isMounted) {
            setStores(storesObject);
            setIsLoading(false);
            console.log('storesssss', stores);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [stores]);

  return (
    <StoresContext.Provider value={{ stores, isLoading }}>
      {children}
    </StoresContext.Provider>
  );
};
