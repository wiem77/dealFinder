import React, { useEffect, useState, useMemo } from 'react';
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
import { useNavigation } from '@react-navigation/native';

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';

import ViewMoreText from 'react-native-view-more-text';

import axios from 'axios';
import { baseUrl } from '../../config/config';

import Loading from '../../components/loading/Loading';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import { combineImagePaths } from '../../util/CombinedPath';

const { width, height } = Dimensions.get('window');
import { Icon, useDisclose, Toast, Button } from 'native-base';
import CustomStagger from '../../components/CustomStager/CustomStager';
const StoreScreen = ({ route }) => {
  const { selectedStore } = route.params;

  const storeName = selectedStore.store_name;
  const formattedStoreName =
    storeName.charAt(0).toUpperCase() + storeName.slice(1).toLowerCase();
  const voucherInfo = Object.values(selectedStore.vouchers);
  console.log('storeid', selectedStore.store_image);
  const items = [
    {
      color: 'indigo.500',
      iconFamily: MaterialIcons,
      iconName: 'location-pin',
      label: 'Emplacement',
    },
    {
      color: 'yellow.400',
      iconFamily: MaterialCommunityIcons,
      iconName: 'microphone',
      label: 'Microphone',
    },
  ];
  const [stores, setStores] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  const [websiteVisible, setWebsiteVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilled, setIsFilled] = useState(false);
  const { isOpen, onToggle } = useDisclose();
  const handleClick = () => {
    setIsFilled(!isFilled);
  };

  const iconColor = isFilled ? Colors.lightRed2 : 'black';
  const navigation = useNavigation();

  const handelBackPressed = () => {
    navigation.goBack();
  };
  const handleAddToFavorites = () => {};

  const handelVoirPlus = (voucherIdToFind) => {
    const selectedVoucher = voucherInfo.find(
      (voucher) => voucher._id === voucherIdToFind
    );
    console.log('selectedVoucher', selectedVoucher);
    navigation.navigate('Voucher', { selectedVoucher, selectedStore });
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

  return (
    <>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
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
              name={isFilled ? 'cards-heart' : 'cards-heart-outline'}
              size={30}
              color={iconColor}
              onPress={handleClick}
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
      {/* )} */}
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
