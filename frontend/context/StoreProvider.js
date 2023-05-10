import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { AsyncStorage } from 'react-native';

export const StoresContext = createContext({
  stores: null,
});

export const StoresProvider = ({ children }) => {
  const [stores, setStores] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStoresData = async () => {
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

  useEffect(() => {
    let isMounted = true;

    if (!stores) {
      fetchStoresData()
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
  }, []);

  return (
    <StoresContext.Provider value={{ stores, isLoading }}>
      {children}
    </StoresContext.Provider>
  );
};

// export const StoresProvider = ({ children }) => {
//   const [stores, setStores] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const CACHE_KEY = 'stores_cache';

//   const fetchStoresData = useCallback(async () => {
//     const cachedStoresData = await AsyncStorage.getItem(CACHE_KEY);
//     if (cachedStoresData) {
//       console.log('Retrieving stores data from cache');
//       return JSON.parse(cachedStoresData);
//     }

//     try {
//       const response = await axios.get(`${baseUrl}/store/getAllStore`);
//       const storesObject = response.data.reduce((acc, cur) => {
//         acc[cur._id] = {
//           ...cur,
//           sub_categories: cur.sub_categories.reduce((subAcc, subCur) => {
//             subAcc[subCur._id] = subCur;
//             return subAcc;
//           }, {}),
//           locations: cur.locations.reduce((locAcc, locCur) => {
//             locAcc[locCur._id] = locCur;
//             return locAcc;
//           }, {}),
//           vouchers: cur.vouchers.reduce((vouAcc, vouCur) => {
//             vouAcc[vouCur._id] = vouCur;
//             return vouAcc;
//           }, {}),
//         };
//         return acc;
//       }, {});

//       console.log(storesObject);

//       await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(storesObject));
//       console.log('storesObject', storesObject);
//       return storesObject;
//     } catch (error) {
//       console.log(error);
//       throw new Error('An error occurred while fetching stores');
//     }
//   }, []);

//   useEffect(() => {
//     let isMounted = true;

//     fetchStoresData()
//       .then((storesObject) => {
//         if (isMounted) {
//           setStores(storesObject);
//           setIsLoading(false);
//           console.log('storesssss', stores);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         setIsLoading(false);
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, [fetchStoresData]);

//   const storesContextValue = useMemo(
//     () => ({ stores, isLoading }),
//     [stores, isLoading]
//   );

//   return (
//     <StoresContext.Provider value={{ storesContextValue }}>
//       {children}
//     </StoresContext.Provider>
//   );
// };
