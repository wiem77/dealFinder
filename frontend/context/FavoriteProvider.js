// import React, { createContext, useState, useEffect, useContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { baseUrl } from '../config/config';
// import axios from 'axios';
// import { AuthContext } from './AuthProvider';
// const FavoritesContext = createContext();

// const FavoritesProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     loadFavorites();
//   }, []);

//   const loadFavorites = async () => {
//     try {
//       const storedFavorites = await AsyncStorage.getItem('favorites');
//       if (storedFavorites) {
//         setFavorites(JSON.parse(storedFavorites));
//       }
//     } catch (error) {
//       console.error('Error loading favorites from AsyncStorage:', error);
//     }
//     setIsLoading(false);
//   };

//   const addToFavorites = async (storeId, token, userID) => {
//     if (!favorites.includes(storeId)) {
//       const newFavorites = [...favorites, storeId];
//       setFavorites(newFavorites);
//       try {
//         if (token) {
//           await axios.put(
//             `${baseUrl}/users/${userID}/favorite-stores/${storeId}`,
//             { favorites: newFavorites },
//             { headers: { 'x-access-token': token } }
//           );
//         } else {
//           await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
//         }
//       } catch (error) {
//         console.error('Error saving favorites:', error);
//       }
//     }
//   };

//   const removeFromFavorites = async (storeId, token, userID) => {
//     if (favorites.includes(storeId)) {
//       const newFavorites = favorites.filter((favorite) => favorite !== storeId);
//       setFavorites(newFavorites);
//       try {
//         if (token) {
//           await axios.put(
//             `${baseUrl}/users/${userID}/favorite-stores/${storeId}`,
//             { favorites: newFavorites },
//             { headers: { 'x-access-token': token } }
//           );
//         } else {
//           await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
//         }
//       } catch (error) {
//         console.error('Error saving favorites:', error);
//       }
//     } else {
//       console.warn("Le magasin n'est pas présent dans les favoris.");
//     }
//   };

//   console.log('favorites', favorites);
//   return (
//     <FavoritesContext.Provider
//       value={{
//         favorites,
//         addToFavorites,
//         removeFromFavorites,

//         isLoading,
//       }}
//     >
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// export { FavoritesContext, FavoritesProvider };
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    retrieveFavoritesFromStorage();
  }, []);

  const saveFavoritesToStorage = async (favorites) => {
    try {
      const jsonFavorites = JSON.stringify(favorites);
      await AsyncStorage.setItem('favorites', jsonFavorites);
    } catch (error) {
      console.log('Error saving favorites to AsyncStorage:', error);
    }
  };

  const retrieveFavoritesFromStorage = async () => {
    try {
      const jsonFavorites = await AsyncStorage.getItem('favorites');
      const parsedFavorites = jsonFavorites ? JSON.parse(jsonFavorites) : [];
      setFavorites(parsedFavorites);
    } catch (error) {
      console.log('Error retrieving favorites from AsyncStorage:', error);
    }
  };

  const addToFavorites = (store) => {
    setFavorites((prevFavorites) => [...prevFavorites, store]);
  };

  const removeFromFavorites = (store) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav !== store)
    );
  };

  useEffect(() => {
    saveFavoritesToStorage(favorites);
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
