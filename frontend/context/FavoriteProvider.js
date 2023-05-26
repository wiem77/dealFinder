import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from AsyncStorage on component mount
    loadFavorites();
  }, []);

  useEffect(() => {
    // Save favorites to AsyncStorage whenever it changes
    saveFavorites();
  }, [favorites]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.log('Error loading favorites from AsyncStorage:', error);
    }
  };

  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.log('Error saving favorites to AsyncStorage:', error);
    }
  };

  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFromFavorites = (item) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== item.id)
    );
  };
  console.log(favorites);
  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };
