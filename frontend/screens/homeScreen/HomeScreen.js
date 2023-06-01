import {
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicatorBase,
  ActivityIndicator,
} from 'react-native';

import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';

import CustomCard from '../../components/customCard/CustomCard';

import Loading from '../../components/loading/Loading';

import { Colors } from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

import { StoreContext } from '../../context/StoreProvider';

import { AuthContext } from '../../context/AuthProvider';
import { baseUrl } from '../../config/config';
import axios from 'axios';

import { CategoryContext } from '../../context/CtegoryProvider';

import { CategoryList } from '../CategoryList/CategoryList';

const showAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    { cancelable: false }
  );
};
const HomeScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNewItems, setShowNewItems] = useState(true);

  const { stores } = useContext(StoreContext);
  const { categories, isLoading, isInitialLoading } =
    useContext(CategoryContext);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

  const navigation = useNavigation();
  const handleFavorite = async (userId, storeId, isFavorite, storeName) => {
    console.log(userId, storeId, isFavorite, storeName);
    try {
      const urlADD = `${baseUrl}/users/${userId}/favorite-stores/${storeId}`;
      const urlDel = `${baseUrl}/users/${userId}/deletefavorite-stores/${storeId}`;
      if (isFavorite === false) {
        await axios.post(urlADD);
        setIsFavorite(true);
        showAlert(`${storeName}`, 'Ajouter aux favoris ');
        console.log('Added to favorite stores');
      } else {
        await axios.delete(urlDel);
        setIsFavorite(false);
        console.log('Removed from favorite stores');
      }
    } catch (error) {
      console.error(error);
      showAlert(`error`, `${error.message}`);
    }
  };

  // if (isInitialLoading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  // if (!categories) {
  //   return <Text>Chargement des catégories...</Text>;
  // }

  return (
    <>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {/* {!isLoading && categories === null && (
        <Text>Chargement des catégories...</Text>
      )} */}
      {categories && (
        <CategoryList categories={categories} showNewItems={showNewItems} />
      )}
    </>
  );
};

export default HomeScreen;
const style = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryListContainer: {
    marginBottom: 20,
  },
});
