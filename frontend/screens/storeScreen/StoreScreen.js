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
} from 'react-native';

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';

import ViewMoreText from 'react-native-view-more-text';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

const { width, height } = Dimensions.get('window');
const StoreScreen = () => {
  // const { store } = route.params;

  const [iconColor, setIconColor] = useState();
  const [vouchers, setVouchers] = useState([]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  const [websiteVisible, setWebsiteVisible] = useState(false);

  const navigation = useNavigation();

  const phoneNumber = '+1 123-456-7890';
  const emailAddress = '+1 123-456-7890';
  const websiteUrl = '+1 123-456-7890';

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

  useEffect(() => {
    const dummyVouchers = [
      {
        id: 1,
        title: '50% off on shoes',
        description: 'Valid for all shoes in the store',
      },
      {
        id: 2,
        title: 'Buy one get one free',
        description: 'Valid for all items in the store',
      },
      {
        id: 3,
        title: '20% off on accessories',
        description: 'Valid for all accessories in the store',
      },
    ];

    setVouchers(dummyVouchers);
  }, []);

  return (
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
            Store
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
                <Text style={styles.contactText}>{phoneNumber}</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.contactItem}>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={toggleEmailVisible}
            >
              <FontAwesome name="envelope-o" size={24} color={Colors.text} />
            </TouchableOpacity>
            {emailVisible && (
              <TouchableOpacity onPress={toggleEmailVisible}>
                <Text style={styles.contactText}>{emailAddress}</Text>
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
                <Text style={styles.contactText}>{websiteUrl}</Text>
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
              numberOfLines={1}
              renderViewMore={renderViewMore}
              renderViewLess={renderViewLess}
              onAfterCollapse={toggleIsExpanded}
              onAfterExpand={toggleIsExpanded}
            >
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas cursus mi vitae tellus fringilla, nec aliquam nulla
                fermentum. Sed vehicula, lectus eget lacinia euismod, erat purus
                gravida libero, in euismod purus urna at mauris. Suspendisse
                suscipit, odio a ullamcorper faucibus, augue risus pretium
                felis, sit amet tristique velit velit sit amet metus.
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

      <FlatList
        data={vouchers}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.voucherTitle}>{item.title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.voucherDescription}>{item.description}</Text>
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
        keyExtractor={(item) => item.id.toString()}
        style={styles.vouchersList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF5F5',
    paddingHorizontal: 20,
    paddingTop: 30,
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
