import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import ViewMoreText from 'react-native-view-more-text';
import CustomBtn from '../../components/customBtn/CustomBtn';
const StoreScreen = () => {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [vouchers, setVouchers] = useState([
    { id: 1, title: 'Voucher 1', description: 'This is voucher 1' },
    { id: 2, title: 'Voucher 2', description: 'This is voucher 2' },
    { id: 3, title: 'Voucher 3', description: 'This is voucher 3' },
  ]);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const phoneNumber = '+1 123-456-7890';
  const emailAddress = '+1 123-456-7890'
  const websiteUrl = '+1 123-456-7890'
  const [emailVisible, setEmailVisible] = useState(false);
  const [websiteVisible, setWebsiteVisible] = useState(false);

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
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity style={styles.backButton}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.headerImageContainer}>
        <Image
          source={require('../../assets/image/Store1.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.storeName}>Store1</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <TouchableOpacity onPress={togglePhoneVisible}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="phone" size={24} color="black" />
              </View>
            </TouchableOpacity>
            {phoneVisible && (
              <TouchableOpacity onPress={togglePhoneVisible}>
                <Text style={styles.phoneNumber}>{phoneNumber}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={toggleEmailVisible}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="email" size={24} color="black" />
              </View>
            </TouchableOpacity>
            {emailVisible && (
              <TouchableOpacity onPress={toggleEmailVisible}>
                <Text style={styles.emailAddress}>{emailAddress}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={toggleWebsiteVisible}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="language" size={24} color="black" />
              </View>
            </TouchableOpacity>
            {websiteVisible && (
              <TouchableOpacity onPress={toggleWebsiteVisible}>
                <Text style={styles.websiteUrl}>{websiteUrl}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.starRatingContainer}></View>
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <Text style={styles.descriptionText}>
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
                  fermentum. Sed vehicula, lectus eget lacinia euismod, erat
                  purus gravida libero, in euismod purus urna at mauris.
                  Suspendisse suscipit, odio a ullamcorper faucibus, augue risus
                  pretium felis, sit amet tristique velit velit sit amet metus.
                </Text>
              </ViewMoreText>
            </ScrollView>
          </View>
          <View style={styles.voucherConatiner}>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={styles.descriptionText}>Coupons</Text>
              <MaterialCommunityIcons
                name="tag-text-outline"
                size={24}
                color="black"
              />
            </View>
            <FlatList
              data={vouchers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.voucherTitle}>{item.title}</Text>
                  <Text style={styles.voucherDescription}>
                    {item.description}
                  </Text>
                  <TouchableOpacity onPress={() => console.log('voucher')}>
                    <Text
                      style={{
                        fontFamily: 'inter',
                        fontStyle: 'italic',
                        fontWeight: '100',
                        fontSize: FontSize.small,
                        color: Colors.green,
                      }}
                    >
                      En Savoir plus
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <Text
            style={{ color: Colors.text, fontWeight: 'bold', fontSize: 28 }}
          ></Text>

          <TouchableOpacity
            onPress={() => console.log('Cart')}
            style={{
              backgroundColor: Colors.green,
            }}
          ></TouchableOpacity>
        </View>
        <CustomBtn
          style={styles.btnContainer}
          text={'Ajouter Aux Favoris '}
          onPress={console.log('test')}
        />
      </View>
    </View>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  storeName: {
    color: Colors.black,
    fontSize: width * 0.09,
    fontFamily: 'poppins',
    fontWeight: '400',
    marginTop: height * 0.0,
    fontStyle: 'italic',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',

    borderColor: Colors.text,
    // borderRadius: '2%',
    padding: '2%',
    marginLeft: '5%',
    marginTop: height * 0.02,
  },
  headerImage: {
    marginTop: '-30%',
    width: '100%',
    height: width,
  },

  contentContainer: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,

    backgroundColor: '#FBF5F5',
    paddingHorizontal: '5%',
    paddingVertical: height * 0.05,
    marginTop: -width * 0.34,
    flex: 1,
  },
  storeName: {
    color: Colors.black,
    fontSize: width * 0.09,
    fontFamily: 'poppins',
    fontWeight: '400',
    marginTop: height * 0.0,
    fontStyle: 'italic',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  descriptionText: {
    color: Colors.black,
    fontWeight: '600',

    fontSize: width * 0.04,
  },
  starRatingContainer: {
    flex: 0.2,
  },
  scrollViewContainer: {
    height: height * 0.2,
    marginTop: height * 0.02,
  },
  description: {
    color: Colors.text,
    letterSpacing: 0.25,
    lineHeight: height * 0.03,
    fontSize: width * 0.04,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: height * 0.03,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: '2%',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
  },
  addToCartButtonText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  seeMoreText: {
    color: Colors.lightRed2,
    fontFamily: 'poppins',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  btnContainer: {
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    marginVertical: wp('6%'),
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  buttonText: {
    fontFamily: 'inter',
    fontSize: FontSize.small,
    fontWeight: '400',
    color: Colors.black,
  },
});
