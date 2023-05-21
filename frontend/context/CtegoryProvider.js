import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${baseUrl}/category/getAllCategory`);
        const data = response.data;

        setCategories(data);
        await AsyncStorage.setItem('categories', JSON.stringify(data));
        console.log('Data fetched categories:', JSON.stringify(data));

        if (data.length === 0) {
          console.log('Les catégories sont vides.');
        } else {
          console.log('Les catégories ne sont pas vides.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    AsyncStorage.getItem('categories')
      .then((catData) => {
        if (catData) {
          setCategories(JSON.parse(catData));
          console.log('categories:', JSON.parse(catData));

          if (JSON.parse(catData).length === 0) {
            console.log(catData);
            console.log('Les catégories sont vides.');
          } else {
            console.log('Les catégories ne sont pas vides.');
          }
        } else {
          fetchCategory();
        }
      })
      .catch((error) => console.error(error));
  }, []);

  function RemoveCat() {
    setCategories(null);
    AsyncStorage.removeItem('categories');
    console.log('deleted Cat');
  }
  return (
    <CategoryContext.Provider value={{ categories, RemoveCat }}>
      {children}
    </CategoryContext.Provider>
  );
};
