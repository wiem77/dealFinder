import React, { useEffect, useState } from 'react';
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
import { baseUrl } from '../../config/config';
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';
import axios from 'axios';
import ViewMoreText from 'react-native-view-more-text';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/loading/Loading';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

const { width, height } = Dimensions.get('window');
const StoreScreen = () => {
  // const { store } = route.params;

  const [iconColor, setIconColor] = useState();
  const [stores, setStores] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  const [websiteVisible, setWebsiteVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const handelBackPressed = () => {
    navigation.navigate('Home');
  };
  const handleAddToFavorites = () => {};

  const handleClick = () => {
    if (iconColor === Colors.black) {
      setIconColor(Colors.red);
    } else {
      setIconColor(Colors.black);
    }
  };

  const handelVoirPlus = () => {
    navigation.navigate('Voucher');
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
  async function getStores() {
    try {
      const response = await axios.get(
        `${baseUrl}/store/findOneStoreById/645399f2c246c646ace05c5a`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   getStores().then((data) => setStores(data));
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 10000);
  // }, []);

  // useEffect(() => {
  //   if (!isLoading && stores.store) {
  //     const formattedAddress = stores.store.locations[0]?.formattedAddress;
  //     console.log('formattedAddress', formattedAddress);
  //   }
  // }, [isLoading, stores]);
  useEffect(() => {
    let isMounted = true;
    getStores()
      .then((data) => {
        if (isMounted) {
          setStores(data);
          setIsLoading(false);

          if (data.store) {
            const formattedAddress = data.store.locations[0]?.formattedAddress;
            console.log('formattedAddress', formattedAddress);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <SafeAreaView>
            <TouchableOpacity>
              <AntDesign
                name="arrowleft"
                size={30}
                color="black"
                onPress={handelBackPressed}
              />
            </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/image/Store1.png')}
              style={styles.storeImage}
            />
          </View>
          <View style={styles.detailsContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: width * 0.09,
                  fontFamily: 'poppins',
                  fontWeight: '400',
                  marginTop: height * 0.0,
                  fontStyle: 'italic',
                }}
              >
                {stores.store.store_name}
              </Text>
              <MaterialCommunityIcons
                name="cards-playing-heart-outline"
                size={24}
                color={iconColor}
                onPress={handleClick}
              />
            </View>
            <View style={styles.contactContainer}>
              <View style={styles.contactItem}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={togglePhoneVisible}
                >
                  <FontAwesome name="phone" size={24} color={Colors.text} />
                </TouchableOpacity>
                {phoneVisible && (
                  <TouchableOpacity onPress={togglePhoneVisible}>
                    <Text style={styles.contactText}>{stores.store.phone}</Text>
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
                    color={Colors.text}
                  />
                </TouchableOpacity>
                {emailVisible && (
                  <TouchableOpacity onPress={toggleEmailVisible}>
                    <Text style={styles.contactText}>{stores.store.email}</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.contactItem}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={toggleWebsiteVisible}
                >
                  <FontAwesome name="globe" size={24} color={Colors.text} />
                </TouchableOpacity>
                {websiteVisible && (
                  <TouchableOpacity onPress={toggleWebsiteVisible}>
                    <Text style={styles.contactText}>
                      {stores.store.webSite}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View>
              <Text
                style={{
                  color: Colors.background,
                  fontWeight: '600',
                  fontSize: 18,
                  textDecorationLine: 'underline',
                  marginVertical: '3%',
                }}
              >
                Desciption
                <MaterialCommunityIcons
                  name="storefront-outline"
                  size={24}
                  color="black"
                />
              </Text>
              <ScrollView>
                <ViewMoreText
                  numberOfLines={2}
                  renderViewMore={renderViewMore}
                  renderViewLess={renderViewLess}
                  onAfterCollapse={toggleIsExpanded}
                  onAfterExpand={toggleIsExpanded}
                >
                  <Text style={styles.description}>
                    {stores.store.description}
                  </Text>
                </ViewMoreText>
              </ScrollView>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: Colors.background,
                fontWeight: '600',
                fontSize: 18,
                textDecorationLine: 'underline',
              }}
            >
              Coupons
            </Text>
            <MaterialCommunityIcons
              name="tag-text-outline"
              size={24}
              color="black"
            />
          </View>

          {stores.store && stores.store.vouchers.length > 0 ? (
            <FlatList
              data={stores.store.vouchers}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.voucherTitle}>{item.name_V}</Text>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.voucherDescription}>
                      {item.description}
                    </Text>
                    <TouchableOpacity onPress={handelVoirPlus}>
                      <Text
                        style={{
                          fontFamily: 'inter',
                          fontStyle: 'italic',
                          fontWeight: '100',
                          fontSize: FontSize.small,
                          color: Colors.background,
                        }}
                      >
                        En Savoir plus
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item._id.toString()}
              style={styles.vouchersList}
            />
          ) : stores.store ? (
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
      )}
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
    height: 200,
    resizeMode: 'contain',
  },
  detailsContainer: {
    marginBottom: 20,
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
    borderBottomColorColor: Colors.background,
  },

  contactButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.white,
  },

  vouchersList: {
    flex: 1,
  },
  voucherTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  voucherDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  contactItem: {
    alignItems: 'center',
    marginTop: 2,
  },
  contactText: {
    backgroundColor: Colors.white,
    fontStyle: 'italic',
    marginTop: 4,
    textDecorationLine: 'underline',
    borderRadius: 5,
    color: Colors.black,
  },
});

export default StoreScreen;
