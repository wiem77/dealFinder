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

import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';

import { StoresContext } from '../../context/StoreProvider';

import VerticalStoreCard from '../../components/verticalCard/StoreCard';
import CustomCard from '../../components/customCard/CustomCard';

import Loading from '../../components/loading/Loading';

import { Colors } from '../../constants/Colors';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { FontSize } from '../../constants/FontSize';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [locationRegion, setLocationRegion] = useState(null);
  const [locationCountry, setLocationCountry] = useState(null);
  const [favoriteStores, setFavoriteStores] = useState([]);
  const [iconColor, setIconColor] = useState('black');

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
  const { stores, isLoading } = useContext(StoresContext);

  console.log('stores', stores);
  const addFavoriteStore = (storeData) => {
    setFavoriteStores([...favoriteStores, storeData]);
    console.log('storeData', storeData);
    navigation.navigate('Favorite', { storeData });
  };
  const navigation = useNavigation();

  const handelStoreSelected = (store_id) => {
    const storesKeys = Object.keys(stores);
    const selectedStore = stores[storesKeys.find((key) => key === store_id)];
    console.log('selectedStore', selectedStore);
    navigation.navigate('Store', { selectedStore });
  };

  const handleNAvigateProfilePressed = () => {
    navigation.navigate('Profile');
    console.log('profile Pressed');
  };
  if (isLoading) {
    return <Loading />;
  }

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
        {stores && (
          <FlatList
            data={Object.values(stores)}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CustomCard
                storeName={item.store_name}
                distance={item.distance}
                location={Object.values(item.locations)[0].city}
                voucher={Object.values(item.vouchers)[0].name_V}
                subCategory={
                  Object.values(item.sub_categories)[0].subCategory_name
                }
                onPress={() => showAlert('Store Pressed', item.store_name)}
              />
            )}
          />
        )}

        <FlatList
          data={Object.values(stores)}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <VerticalStoreCard
              key={item._id}
              storeName={item.store_name}
              distance={item.distance}
              location={Object.values(item.locations)[0].city} // set the location
              voucher={Object.values(item.vouchers)[0].name_V} // set the voucher
              subCategory={
                Object.values(item.sub_categories)[0].subCategory_name
              }
              onPressStore={() => handelStoreSelected(item._id)}
              // onPressFavorite={() => addFavoriteStore(item)}
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
