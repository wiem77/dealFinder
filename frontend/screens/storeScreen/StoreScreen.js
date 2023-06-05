import React, { useEffect, useState, useMemo, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  Entypo,
} from '@expo/vector-icons';

import ViewMoreText from 'react-native-view-more-text';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { baseUrl } from '../../config/config';

import { Button } from 'native-base';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import { combineImagePaths } from '../../util/CombinedPath';
import { FavoritesContext } from '../../context/FavoriteProvider';
import { AuthContext } from '../../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');

const StoreScreen = ({ route }) => {
  const { selectedStore } = route.params;
  const storeName = selectedStore.store_name;
  const formattedStoreName =
    storeName.charAt(0).toUpperCase() + storeName.slice(1).toLowerCase();
  const voucherInfo = Object.values(selectedStore.vouchers);
  const [hasToken, setHasToken] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  const [websiteVisible, setWebsiteVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const favoritesContext = useContext(FavoritesContext);
  const { favorites, addToFavorites, removeFromFavorites } = favoritesContext;
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          if (parsedFavorites.includes(selectedStore)) {
            setIsFavorite(true);
            await AsyncStorage.setItem(
              'favoriteColor',
              isFavorite ? 'red' : 'black'
            );
          }
        }
      } catch (error) {
        console.log('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [selectedStore]);

  useEffect(() => {
    const updateFavorites = async () => {
      try {
        if (isFavorite && !favorites.includes(selectedStore)) {
          addToFavorites(selectedStore);
        } else if (!isFavorite && favorites.includes(selectedStore)) {
          removeFromFavorites(selectedStore);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        await AsyncStorage.setItem(
          'favoriteColor',
          favorites.includes(selectedStore) ? 'red' : 'black'
        );
      } catch (error) {
        console.log('Error updating favorites:', error);
      }
    };

    updateFavorites();
  }, [favorites, selectedStore]);

  useEffect(() => {
    const loadFavoriteColor = async () => {
      try {
        const favoriteColor = await AsyncStorage.getItem('favoriteColor');
        console.log(favoriteColor);
        if (favoriteColor) {
          setIsFavorite(favoriteColor === 'red');
        }
      } catch (error) {
        console.log('Error loading favorite color:', error);
      }
    };

    loadFavoriteColor();
  }, []);

  const iconColor = isFavorite ? 'red' : 'black';
  const navigation = useNavigation();

  const handelBackPressed = () => {
    navigation.goBack();
  };

  const handelVoirPlus = (voucherIdToFind) => {
    const selectedVoucher = voucherInfo.find(
      (voucher) => voucher._id === voucherIdToFind
    );
    const imageStore = selectedStore.store_image;
    console.log('selectedVoucher', selectedVoucher);
    navigation.navigate('Voucher', { selectedVoucher, imageStore });
  };

  const toggleEmailVisible = () => {
    setEmailVisible(!emailVisible);
  };

  const toggleWebsiteVisible = () => {
    setWebsiteVisible(!websiteVisible);
  };

  const togglePhoneVisible = () => {
    setPhoneVisible(!phoneVisible);
  };

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderViewMore = (onPress) => (
    <Text style={styles.seeMoreText} onPress={onPress}>
      Voir plus
    </Text>
  );

  const renderViewLess = (onPress) => (
    <Text style={styles.seeMoreText} onPress={onPress}>
      Voir moins
    </Text>
  );
  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        removeFromFavorites(selectedStore);
      } else {
        addToFavorites(selectedStore);
      }
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
      setIsFilled(!prevIsFavorite);

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      await AsyncStorage.setItem(
        'favoriteColor',
        !prevIsFavorite ? 'red' : 'black'
      );
    } catch (error) {
      console.log('Error handling favorite:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <TouchableOpacity>
            <AntDesign
              name="arrowleft"
              size={35}
              color="black"
              onPress={handelBackPressed}
            />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.imageContainer}>
          <Image
            source={combineImagePaths(selectedStore.store_image)}
            style={styles.storeImage}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5%',
            }}
          >
            <Text
              style={{
                color: Colors.background,
                fontSize: width * 0.09,
                fontFamily: 'poppins',
                fontWeight: '400',
                paddingRight: '4%',
              }}
            >
              {formattedStoreName}
            </Text>
            <MaterialCommunityIcons
              name={isFavorite ? 'cards-heart' : 'cards-heart-outline'}
              size={30}
              color={iconColor}
              onPress={handleFavoriteClick}
            />
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: Colors.background,
              borderBottomColorColor: Colors.background,
            }}
          >
            <Text
              style={{
                color: Colors.background,
                fontWeight: '600',
                fontSize: 18,
                textDecorationLine: 'underline',
                padding: 5,
                marginVertical: '1%',
              }}
            >
              Contact :
            </Text>
            <View style={styles.contactContainer}>
              <View style={styles.contactItem}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={togglePhoneVisible}
                >
                  <FontAwesome name="phone" size={24} color={Colors.black} />
                </TouchableOpacity>
                {phoneVisible && (
                  <TouchableOpacity onPress={togglePhoneVisible}>
                    <Text style={styles.contactText}>
                      {selectedStore.phone}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.contactItem}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={toggleEmailVisible}
                >
                  <FontAwesome
                    name="envelope-o"
                    size={24}
                    color={Colors.black}
                  />
                </TouchableOpacity>
                {emailVisible && (
                  <TouchableOpacity onPress={toggleEmailVisible}>
                    <Text style={styles.contactText}>
                      {selectedStore.email}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.contactItem}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={toggleWebsiteVisible}
                >
                  <FontAwesome name="globe" size={24} color={Colors.black} />
                </TouchableOpacity>
                {websiteVisible && (
                  <TouchableOpacity onPress={toggleWebsiteVisible}>
                    <Text style={styles.contactText}>
                      {selectedStore.webSite}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: Colors.background,
                fontWeight: '600',
                fontSize: 18,
                textDecorationLine: 'underline',
                marginVertical: '3%',
                padding: 5,
              }}
            >
              Description :
            </Text>
            <MaterialCommunityIcons
              name="storefront-outline"
              size={26}
              color="black"
            />
          </View>
          <ScrollView>
            <ViewMoreText
              numberOfLines={2}
              renderViewMore={renderViewMore}
              renderViewLess={renderViewLess}
              onAfterCollapse={toggleIsExpanded}
              onAfterExpand={toggleIsExpanded}
            >
              <Text style={styles.description}>
                {selectedStore.description}
              </Text>
            </ViewMoreText>
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              color: Colors.background,
              fontWeight: '600',
              fontSize: 18,
              textDecorationLine: 'underline',
              padding: 5,
              marginVertical: '3%',
            }}
          >
            Coupons :
          </Text>
          <MaterialCommunityIcons
            name="tag-text-outline"
            size={26}
            color="black"
          />
        </View>

        {selectedStore && voucherInfo.length > 0 ? (
          <FlatList
            data={voucherInfo}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.voucherTitle}>{item.name_V}</Text>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.voucherDescription}>
                    {item.description}
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="rose"
                    onPress={() => handelVoirPlus(item._id)}
                    style={{ width: 150 }}
                  >
                    <Text
                      style={{
                        fontFamily: 'inter',
                        fontStyle: 'italic',
                        fontWeight: '100',
                        fontSize: FontSize.small,
                        color: Colors.white,
                      }}
                    >
                      {' '}
                      En Savoir plus
                    </Text>
                  </Button>
                  <TouchableOpacity onPress={() => handelVoirPlus(item._id)}>
                    <Text
                      style={{
                        fontFamily: 'inter',
                        fontStyle: 'italic',
                        fontWeight: '100',
                        fontSize: FontSize.small,
                        color: Colors.background,
                      }}
                    ></Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item._id.toString()}
            style={styles.vouchersList}
          />
        ) : selectedStore ? (
          <Text
            style={{
              margin: '20%',
              fontFamily: 'inter',
              fontStyle: 'italic',
              fontWeight: '100',
              fontSize: FontSize.small,
              color: Colors.background,
            }}
          >
            Pas de coupon valable
          </Text>
        ) : (
          <ActivityIndicator size="large" color={Colors.black} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF5F5',
    paddingHorizontal: 20,
    paddingTop: 30,
    marginVertical: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  storeImage: {
    width: 500,
    height: 210,
    resizeMode: 'contain',
  },
  detailsContainer: {
    marginBottom: 5,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  storeDescription: {
    fontSize: 18,
    marginBottom: 10,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  contactButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.white,
    fontStyle: 'italic',
    marginTop: 4,
    textDecorationLine: 'underline',
    borderRadius: 5,
    color: Colors.black,
  },

  vouchersList: {
    flexGrow: 1,
  },
  voucherTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    marginTop: 0,
  },
  voucherDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    color: Colors.black,
    fontWeight: '400',
    fontSize: 16,
    fontFamily: 'inter',
  },
  contactText: {
    textDecorationLine: 'underline',
    borderRadius: 5,
    color: Colors.black,
    marginTop: '10%',
    fontSize: 18,
    alignItems: 'center',
  },
  contactItem: {
    marginTop: '3%',
    marginBottom: '3%',
    alignItems: 'center',
  },
});

export default StoreScreen;
