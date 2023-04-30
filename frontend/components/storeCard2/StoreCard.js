import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2;
import { useNavigation } from '@react-navigation/native';
import Imgtest from '../../assets/image/Store1.png';
export default StoreCard2 = ({ store, onRemoveFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      onRemoveFavorite(store.id);
    }
  };

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      underlayColor={Colors.white}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Store')}
    >
      <View style={styles.card}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={store.image}
            resizeMode="cover"
            style={{ height: cardWidth / 1.5, width: cardWidth + 50 }}
          />
        </View>
        <View style={styles.storeInfoContainer}>
          <Text style={styles.storeName}>{store.name}</Text>
          <View style={styles.storeLocationContainer}>
            <MaterialIcons name="location-on" size={14} color={Colors.grey} />
            <Text style={styles.storeLocationText}>{store.distance}</Text>
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
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {store.discount}%
          </Text>
          <TouchableOpacity onPress={handleFavoritePress}>
            <View style={styles.addToCartBtn}>
              <MaterialIcons
                name={isFavorite ? 'favorite' : 'favorite-border'}
                size={24}
                color="red"
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  storeLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeLocationText: {
    fontSize: 14,
    color: Colors.grey,
    marginLeft: 4,
  },
});
