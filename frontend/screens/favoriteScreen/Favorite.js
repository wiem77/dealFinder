import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import StoreCard2 from '../../components/storeCard2/StoreCard';

import Colors from '../../constants/Colors';

import { AuthContext } from '../../context/AuthProvider';
import { FavoritesContext } from '../../context/FavoriteProvider';
const { width } = Dimensions.get('window');

const Favorite = () => {
  const authCtx = useContext(AuthContext);
  const favCtx = useContext(FavoritesContext);
  const token = authCtx.token;
  console.log(token);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <MaterialIcons name="favorite" size={28} color={'#000'} />
          <Text style={styles.headerTitle}>Favoris</Text>
          <View style={{ width: 28 }} />
        </View>
        <View style={styles.promoContainer}>
          <Text style={styles.promoText}>
            Vos choix préférés, toujours à portée de main !
          </Text>
        </View>
      </SafeAreaView>

      <View style={styles.contentContainer}>
        {favCtx.favorites?.length === 0 ? (
          <Text style={styles.noFavoritesText}>Pas de favoris</Text>
        ) : (
          <FlatList
            data={favCtx.favorites}
            renderItem={({ item }) => <StoreCard2 store={item} />}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF5F5',
    paddingHorizontal: 20,
    paddingTop: 30,
    marginVertical: 10,
  },
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
  },
  contentContainer: {
    flexGrow: 1,

    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: '50%',
  },
  promoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  promoText: {
    fontFamily: 'inter',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  noFavoritesText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
