import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomCard from '../../components/customCard/CustomCard';
import { Colors } from '../../constants/Colors';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { FontSize } from '../../constants/FontSize';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import VerticalStoreCard from '../../components/verticalCard/StoreCard';
const DATA = [
  {
    id: '1',
    storeName: 'My Store 1',
    distance: '2 km away',
    location: '123 Main Street',
    voucher: '10% off',
    subCategory: 'sport',
  },
  {
    id: '2',
    storeName: 'My Store 2',
    distance: '3 km away',
    location: '456 Main Street',
    voucher: '20% off',
    subCategory: 'food',
  },
  {
    id: '3',
    storeName: 'My Store 3',
    distance: '4 km away',
    location: '789 Main Street',
    voucher: '30% off',
    subCategory: 'clothing',
  },
];
const RECOMMENDED_STORES = [
  {
    id: '4',
    storeName: 'My Store 4',
    distance: '5 km away',
    location: '987 Main Street',
    voucher: '15% off',
    subCategory: 'electronics',
  },
  {
    id: '5',
    storeName: 'My Store 5',
    distance: '6 km away',
    location: '654 Main Street',
    voucher: '25% off',
    subCategory: 'food',
  },
];

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [locationRegion, setLocationRegion] = useState(null);
  const [locationCountry, setLocationCountry] = useState(null);
  const [favoriteStores, setFavoriteStores] = useState([]);
  const addFavoriteStore = (storeData) => {
    setFavoriteStores([...favoriteStores, storeData]);
    console.log('storeData', storeData);
    navigation.navigate('Favorite', { storeData });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocationName(geocode[0].city);
      setLocationRegion(geocode[0].region);
      setLocationCountry(geocode[0].country);
    })();
  }, []);
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  const navigation = useNavigation();
  const [iconColor, setIconColor] = useState('black');
  const handleClick = () => {
    setIconColor(Colors.red);
  };
  const handleNAvigateProfilePressed = () => {
    navigation.navigate('Profile');
    console.log('profile Pressed');
  };
  return (
    <View style={{ backgroundColor: Colors.backgroundWhite, flex: 1 }}>
      <SafeAreaView>
        <View style={styles.header}>
          <MaterialIcons name="my-location" size={24} color={iconColor} />
          <Text style={styles.textLocation}>
            {locationName}, {locationRegion}
          </Text>
          <TouchableOpacity onPress={handleNAvigateProfilePressed}>
            <FontAwesome5 name="house-user" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <View style={styles.search}>
            <TextInput
              style={{
                fontSize: FontSize.xsmall,
                fontWeight: '400',
              }}
              placeholder="Recherchez des offres de folie!"
            />
            <MaterialIcons name="search" size={24} color={Colors.red} />
          </View>
        </View>
        <MaterialIcons
          name="menu-book"
          size={45}
          color={Colors.red}
          style={{ marginVertical: '2%' }}
        />
      </View>
      <View style={{ marginVertical: '5%' }}>
        <Text style={styles.categoryName}>Nouveauté</Text>
        <FlatList
          data={RECOMMENDED_STORES}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CustomCard
              storeName={item.storeName}
              distance={item.distance}
              location={item.location}
              voucher={item.voucher}
              subCategory={item.subCategory}
              onPress={() => showAlert('Store Pressed', item.storeName)}
            />
          )}
        />
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <VerticalStoreCard
              storeName={item.storeName}
              distance={item.distance}
              location={item.location}
              voucher={item.voucher}
              subCategory={item.subCategory}
              onPress={() => showAlert('Store Pressed', item.storeName)}
              onPressFavorite={() => addFavoriteStore(item)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 5,
    shadowColor: '#000',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'transparent',
    height: 50,
    alignItems: 'center',
    paddingVertical: 10,
  },
  textLocation: {
    color: Colors.red,
    fontFamily: 'inter',
    fontWeight: 'bold',
    fontSize: FontSize.small,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginVertical: '2%',

    padding: 10,
    paddingHorizontal: '10%',
    borderColor: Colors.darkred,
    backgroundColor: Colors.white,
    borderRadius: 7,
  },
  categoryName: {
    fontSize: FontSize.medium,
    color: Colors.black,
    marginHorizontal: 10,
    marginVertical: 5,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});
