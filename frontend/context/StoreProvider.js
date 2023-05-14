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

 

  return (
    <StoreContext.Provider value={{ stores }}>{children}</StoreContext.Provider>
  );
};

// useEffect(() => {
//   const fetchStores = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/store/getAllStore`);
//       // const data = response.data;

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
//       setStores(storesObject);
//       await AsyncStorage.setItem('stores', storesObject);
//       console.log(
//         'Data fetcheddddddddddddddd:',
//         JSON.stringify(storesObject)
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   AsyncStorage.getItem('stores')
//     .then((storesObject) => {
//       if (storesObject) {
//         setStores(storesObject);
//         console.log('testttt', storesObject);
//       } else {
//         fetchStores();
//       }
//     })
//     .catch((error) => console.error(error));
// }, []);

// export const StoresContext = createContext({
//   stores: null,
//   getStores: null,
//   getAllStores: () => {},
// });

// export const StoresProvider = ({ children }) => {
//   const [stores, setStores] = useState(null);
//   const [getStores, setGetStores] = useState(() => getAllStores);
//   async function getAllStores() {
//     if (stores) {
//       // Les données de magasin ont déjà été récupérées, inutile d'envoyer une autre requête.
//       return;
//     }

//     const stores = await getStores();
//     setStores(stores);
//     console.log('JSON.stringify(stores)', JSON.stringify(stores));
//     AsyncStorage.setItem('stores', JSON.stringify(stores));
//     setGetStores(true);
//   }

//   const value = {
//     getStores,
//     getAllStores,
//     stores,
//   };

//   return (
//     <StoresContext.Provider value={value}>{children}</StoresContext.Provider>
//   );
// };

// useEffect(() => {
//   let isMounted = true;

//   if (!stores) {
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
//   } else {
//     setIsLoading(false);
//   }

//   return () => {
//     isMounted = false;
//   };
// }, []);

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
