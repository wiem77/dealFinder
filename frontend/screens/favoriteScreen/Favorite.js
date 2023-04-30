import React, { useState } from 'react';
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
import Imgtest from '../../assets/image/Store1.png';
const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

const Favorite = () => {
  const [favoriteStores, setFavoriteStores] = useState([
    {
      id: 1,
      name: 'Store1',
      distance: '10 min away',
      discount: '15%',
      image: Imgtest,
    },
    {
      id: 2,
      name: 'Store2',
      distance: '5 min away',
      discount: '10%',
      image: Imgtest,
    },
  ]);

  const handleRemoveFavorite = (storeId) => {
    setFavoriteStores((prevStores) =>
      prevStores.filter((store) => store.id !== storeId)
    );
  };

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
        {favoriteStores.length === 0 ? (
          <Text style={styles.noFavoritesText}>Pas de favoris</Text>
        ) : (
          <FlatList
            data={favoriteStores}
            renderItem={({ item }) => (
              <StoreCard2
                store={item}
                onRemoveFavorite={handleRemoveFavorite}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
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
    flex: 1,

    paddingVertical: 10,
    paddingHorizontal: 10,
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
