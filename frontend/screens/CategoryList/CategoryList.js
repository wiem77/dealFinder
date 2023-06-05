import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import React, { useState, useContext, useEffect, useRef } from 'react';
import { RefreshControl } from 'react-native-web-refresh-control';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/Colors';

import { ScrollView } from 'react-native-gesture-handler';

import VerticalStoreCard from '../../components/verticalCard/StoreCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import Search from '../../components/SerachBar/Search';
import { baseUrl } from '../../config/config';
import { combineImagePaths } from '../../util/CombinedPath';

import CustomCard from '../../components/customCard/CustomCard';
import { AuthContext } from '../../context/AuthProvider';
import * as Location from 'expo-location';
import axios from 'axios';
import Loading2 from '../../components/loading2/Loading2';
import LocContext from '../../context/LocationProv';
import { useFocusEffect } from '@react-navigation/native';
export const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedStores, setSelectedStores] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    latitude,
    longitude,
    cityLocation,
    setLatitude,
    setLongitude,
    setCityLocation,
    setLocationRegion,
  } = useContext(LocContext);

  const [categories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState();
  const [isFetchingCategories, setIsFetchingCategories] = useState(false);
  const [isFetchingStores, setIsFetchingStores] = useState(false);
  const navigation = useNavigation();
  // const cityLocation = userCtx?.user?.location?.city;
  // const laltitude = userCtx.user?.location?.coordinates[0];
  // const longitude = userCtx.user?.location?.coordinates[1];
  const scrollViewRef = useRef(null);
  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };
  const handleLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      setIsLoading(false);
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    // setLocation(currentLocation);
    console.log('location', currentLocation);

    let { latitude, longitude, altitude } = currentLocation.coords;

    let geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    let { city, region } = geocode[0];
    // console.log(city, region);
    // setLocationName(city);
    setLocationRegion(region);
    setLatitude(latitude);
    setLongitude(longitude);
    setCityLocation(city);
    setIsLoading(false);
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsFetchingCategories(true);

      const response = await axios.get(
        `${baseUrl}/category/getAllCategory/${longitude}/${latitude}/${cityLocation}`
      );
      console.log(
        `${baseUrl}/category/getAllCategory/${longitude}/${latitude}/${cityLocation}`
      );
      const data = response.data;
      setCategories(data);
      console.log('Data fetched categories:', data);

      if (data.length === 0) {
        console.log('Les catégories sont vides.');
      } else {
        console.log('Les catégories ne sont pas vides.');
      }

      await AsyncStorage.setItem('categoriesData', JSON.stringify(data)); // Sauvegarder les catégories dans AsyncStorage
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingCategories(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('categoriesData');
        console.log('Stored categories data:', storedData);

        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setCategories(parsedData);
        } else {
          await fetchCategories();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoriesData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchCategories();
    }, [])
  );

  const fetchStores = async () => {
    try {
      setIsFetchingStores(true);

      const response = await axios.get(`${baseUrl}/store/getNewStore`);
      const data = response.data;
      setStores(data);

      if (data.length === 0) {
        console.log('Les stores sont vides.');
      } else {
        console.log('Les stores ne sont pas vides.');
      }

      await AsyncStorage.setItem('storesData', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingStores(false);
    }
  };

  useEffect(() => {
    const fetchStoresData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('storesData');
        console.log('Stored stores data:', storedData);

        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setStores(parsedData);
        } else {
          await fetchStores();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStoresData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchStores();
    }, [])
  );

  const handleCategoryChange = (categoryValue) => {
    setSelectedCategory(categoryValue);

    if (categoryValue) {
      const selectedCategoryObj = categories.categories.find(
        (category) => category?.category_name === categoryValue
      );

      if (selectedCategoryObj) {
        setSelectedSubCategory(
          selectedCategoryObj.subcategories[0]?.subCategory_name
        );
        setSelectedStores(selectedCategoryObj.subcategories[0]?.stores || []);
      }
    } else {
      setSelectedSubCategory(null);
      setSelectedStores(stores);
    }
    scrollToTop();
  };

  const handleSubCategoryChange = (subCategoryValue) => {
    setSelectedSubCategory(subCategoryValue);

    const selectedSubCategoryObj = categories.categories
      .find((category) => category?.category_name === selectedCategory)
      .subcategories.find(
        (subCategory) => subCategory?.subCategory_name === subCategoryValue
      );

    if (selectedSubCategoryObj) {
      setSelectedStores(selectedSubCategoryObj.stores);
      console.log(selectedSubCategoryObj.stores);
    }
  };
  const handleStoreSelected = (store_id) => {
    const selectedStore = categories.categories
      .flatMap((category) => category.subcategories)
      .flatMap((subCategory) => subCategory.stores)
      .find((store) => store._id === store_id);
    console.log('selectedStore', selectedStore);
    navigation.navigate('Store', { selectedStore: selectedStore });
  };
  const refreshing = async () => {
    setIsRefreshing(true);

    console.log('refreching');
    await fetchCategories();
    await fetchStores();

    setIsRefreshing(false);
  };

  if (!categories && !stores) {
    return (
      <View style={styles.container}>
        <Loading2 />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading2 />
      ) : (
        <>
          <SafeAreaView style={[styles.safeArea, { marginLeft: 20 }]}>
            <View style={styles.header}>
              <View>
                <Text style={styles.welcomeText}>Bienvenue</Text>
                <Text style={styles.appName}>DealFinder</Text>
              </View>
              <View style={styles.iconContainer}>
                <MaterialIcons name="location-city" size={30} color="black" />
                <Text style={{ fontSize: 15, color: Colors.background }}>
                  {cityLocation}
                </Text>
              </View>
            </View>
          </SafeAreaView>

          <View>
            <Search
              handleCategoryChange={handleCategoryChange}
              categories={categories}
            />
            <View style={styles.content}>
              {selectedCategory ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoryListContainer}
                  refreshControl={
                    <RefreshControl
                      refreshing={isRefreshing}
                      onRefresh={refreshing}
                    />
                  }
                >
                  {categories.categories
                    .find(
                      (category) => category.category_name === selectedCategory
                    )
                    .subcategories?.map((subCategory, index) => (
                      <TouchableOpacity
                        key={subCategory._id}
                        activeOpacity={0.8}
                        onPress={() =>
                          handleSubCategoryChange(subCategory.subCategory_name)
                        }
                        style={[
                          styles.categoryItem,
                          selectedSubCategory ===
                            subCategory.subCategory_name &&
                            styles.categoryItemSelected,
                          index !== categories.length - 1 &&
                            styles.categoryItemMargin,
                        ]}
                      >
                        <Text
                          style={[
                            styles.categoryText,
                            selectedSubCategory ===
                              subCategory.subCategory_name &&
                              styles.categoryTextSelected,
                          ]}
                        >
                          {subCategory.subCategory_name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              ) : (
                selectedCategory === null &&
                stores && (
                  <View style={{ flexGrow: 1, marginBottom: '40%' }}>
                    <ScrollView
                      contentContainerStyle={{ paddingBottom: '70%' }}
                      showsVerticalScrollIndicator={true}
                      refreshControl={
                        <RefreshControl
                          refreshing={isRefreshing}
                          onRefresh={refreshing}
                        />
                      }
                    >
                      <View>
                        <View style={styles.newItemsContainer}>
                          <Text style={styles.categoryName}>Nouveauté</Text>
                          <FlatList
                            data={stores.data}
                            keyExtractor={(item) => item._id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.newItemsList}
                            renderItem={({ item }) => (
                              <CustomCard
                                storeName={item.store_name}
                                voucher={
                                  Object.values(item.vouchers)[0]?.discount
                                }
                                distance={
                                  Object.values(item.locations)[0]?.city
                                }
                                subCategory={
                                  Object.values(item.sub_categories)[0]
                                    ?.subCategory_name
                                }
                                imageUri={combineImagePaths(item.store_image)}
                                onPressStore={() =>
                                  handleStoreSelected(item._id)
                                }
                              />
                            )}
                          />
                        </View>
                        {categories?.categories?.map((category) => {
                          if (
                            selectedCategory === null &&
                            category.subcategories &&
                            category.subcategories.length > 0
                          ) {
                            return (
                              <View
                                key={category.category_name}
                                style={styles.newItemsContainer}
                              >
                                <Text style={styles.categoryName}>
                                  {category.category_name}
                                </Text>
                                <FlatList
                                  data={category.subcategories[0]?.stores}
                                  keyExtractor={(item) => item._id}
                                  horizontal
                                  showsHorizontalScrollIndicator={false}
                                  contentContainerStyle={styles.newItemsList}
                                  renderItem={({ item }) => (
                                    <CustomCard
                                      storeName={item.store_name}
                                      voucher={
                                        Object.values(item.vouchers)[0]
                                          ?.discount
                                      }
                                      distance={
                                        Object.values(item.locations)[0].city
                                      }
                                      subCategory={
                                        Object.values(item.sub_categories)[0]
                                          ?.subCategory_name
                                      }
                                      onPressStore={() =>
                                        handleStoreSelected(item._id)
                                      }
                                      imageUri={combineImagePaths(
                                        item.store_image
                                      )}
                                    />
                                  )}
                                />
                              </View>
                            );
                          }
                        })}
                      </View>
                    </ScrollView>
                  </View>
                )
              )}
              <View
                style={[
                  styles.flatListContainer,
                  {
                    flex: selectedCategory === null ? 1 : 0,
                    marginTop: selectedCategory !== null ? '5%' : 15,
                  },
                ]}
              >
                <FlatList
                  data={selectedStores}
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  contentContainerStyle={styles.flatListContent}
                  renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                      <VerticalStoreCard
                        key={item._id}
                        storeName={item.store_name}
                        distance={Object.values(item.locations)[0].city}
                        voucher={Object.values(item.vouchers)[0]?.discount}
                        subCategory={
                          Object.values(item.sub_categories)[0].subCategory_name
                        }
                        imageUri={combineImagePaths(item.store_image)}
                        onPressStore={() => handleStoreSelected(item._id)}
                        onPressFavorite={() =>
                          handleFavorite(
                            userId,
                            item._id,
                            isFavorite,
                            item.store_name
                          )
                        }
                      />
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  categoryItem: { marginTop: '0%' },

  safeArea: {
    paddingHorizontal: 20,
    backgroundColor: '#FAF7F4',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: '600',
  },
  appName: {
    fontSize: 38,
    color: Colors.red,
    fontWeight: '600',
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 15,
    alignItems: 'center',
  },
  content: {
    marginTop: -1,
  },
  button: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonSelected: {
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'inter',
    textAlign: 'center',
    color: Colors.dark,
    justifyContent: 'center',
  },

  categoryListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  newItemsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },

  categoryItemSelected: {
    color: Colors.red,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: Colors.red,
  },
  categoryItemMargin: {
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    color: '#333333',
  },
  categoryTextSelected: {
    color: Colors.red,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: Colors.red,
  },
  newItemsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  newItemsList: {
    paddingVertical: 10,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatListContainer: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 10,
  },

  flatListContent: {
    paddingHorizontal: 5,
    // flexGrow: 1,
  },
  cardContainer: {
    width: '40%',
    marginHorizontal: 30,
    marginBottom: 10,
  },
});

export default styles;
