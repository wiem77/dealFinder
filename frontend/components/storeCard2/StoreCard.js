import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('screen');
const cardWidth = width / 4;

import { useNavigation } from '@react-navigation/native';
import { combineImagePaths } from '../../util/CombinedPath';
import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoriteProvider';

export default StoreCard2 = ({ store }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const favCtx = useContext(FavoritesContext);

  useEffect(() => {
    setIsFavorite(favCtx.favorites.some((fav) => fav._id === store._id));
  }, [favCtx.favorites, store._id]);

  const handleFavoritePress = async () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      favCtx.addToFavorites(store);
    } else {
      favCtx.removeFromFavorites(store);
    }

    try {
      await AsyncStorage.setItem('favoriteColor', isFavorite ? 'black' : 'red');
    } catch (error) {
      console.log('Error updating favorite color:', error);
    }
  };

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      underlayColor={Colors.white}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Store', { selectedStore: store })}
    >
      <View style={styles.card}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={combineImagePaths(store.store_image)}
            resizeMode="cover"
            style={{
              height: cardWidth / 1,
              width: cardWidth + 150,
              marginVertical: 10,
            }}
          />
        </View>
        <View style={styles.storeInfoContainer}>
          <Text style={styles.storeName}>{store.store_name}</Text>
          <View style={styles.storeLocationContainer}>
            <AntDesign name="star" size={24} color="#FFD700" />

            <Text style={styles.storeLocationText}>{store.rating}</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={styles.storeLocationContainer}>
            <MaterialIcons name="location-on" size={24} color={Colors.grey} />
            <Text style={styles.storeLocationText}>
              {store.locations[0].city}
            </Text>
          </View>
          <TouchableOpacity onPress={handleFavoritePress}>
            <View style={styles.addToCartBtn}>
              <MaterialIcons
                name={isFavorite ? 'favorite' : 'favorite-border'}
                size={24}
                color={isFavorite ? 'red' : 'black'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
  },
  addToCartBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 8,
  },
  storeInfoContainer: {
    marginLeft: 20,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.background,
    marginTop: 10,
  },
  storeLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeLocationText: {
    fontSize: 18,
    color: Colors.black,
    marginLeft: 4,
  },
});
