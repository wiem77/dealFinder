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
  Platform,
} from 'react-native';

import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import ViewMoreText from 'react-native-view-more-text';


import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import CustomBtn from '../../components/customBtn/CustomBtn';
import CustomCard from '../../components/customCard/CustomCard';

const { width, height } = Dimensions.get('window');
// const DATA = [
//   {
//     id: '1',
//     storeName: 'My Store 1',
//     distance: '2 km away',
//     location: '123 Main Street',
//     voucher: '10% off',
//     subCategory: 'sport',
//   },
//   {
//     id: '2',
//     storeName: 'My Store 2',
//     distance: '3 km away',
//     location: '456 Main Street',
//     voucher: '20% off',
//     subCategory: 'food',
//   },
//   {
//     id: '3',
//     storeName: 'My Store 3',
//     distance: '4 km away',
//     location: '789 Main Street',
//     voucher: '30% off',
//     subCategory: 'clothing',
//   },
// ];
const VoucherScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <CustomCard
      storeName={item.storeName}
      distance={item.distance}
      location={item.location}
      voucher={item.voucher}
      subCategory={item.subCategory}
    />
  );
  
  const handelBackPressed = () => {
    navigation.navigate('Store');
  };

  const handelAddCartPressed = () => {
    console.log('added to cart');
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
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={30} color="black" onPress={handelBackPressed} />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/image/Store1.png')}
          style={styles.storeImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.voucherName}>Promo shoses</Text>
          <Text style={styles.discountName}>PDiscount 15%</Text>
        </View>
        <View>
          <Text style={styles.detailles}>Détailles</Text>
        </View>
        <ViewMoreText
          style={{ marginTop: '6%', marginBottom: '6%' }}
          numberOfLines={2}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          onAfterCollapse={toggleIsExpanded}
          onAfterExpand={toggleIsExpanded}
        >
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            cursus mi vitae tellus fringilla, nec aliquam nulla fermentum. Sed
            vehicula, lectus eget lacinia euismod, erat purus gravida libero, in
            euismod purus urna at mauris. Suspendisse suscipit, odio a
            ullamcorper faucibus, augue risus pretium felis, sit amet tristique
            velit velit sit amet metus.
          </Text>
        </ViewMoreText>
        <View style={{ marginTop: '8%', marginBottom: '6%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.nbVoucher}> Nombre de Coupons restant</Text>
            <MaterialCommunityIcons
              name="tag-text"
              size={25}
              color="black"
              style={{ paddingHorizontal: 10 }}
            />
          </View>

          <Text> Nombre de Coupons restant</Text>
        </View>
        <View style={{ marginTop: '8%', marginBottom: '6%' }}>
          <CustomBtn
            style={{ marginTop: '6%' }}
            text={'Reserver votre coupon'}
            onPress={handelAddCartPressed}
            nameIcon={'cart-outline'}
            sizeIcon={24}
            colorIcon={Colors.white}
          />
        </View>

        {/* <View style={styles.similareOffres}>
          <View style={{marginBottom:'6%',marginTop:'6%'}}>
            <FlatList
              horizontal
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default VoucherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF5F5',
    // paddingHorizontal: 20,
    paddingTop: 30,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '1%',
  },
  storeImage: {
    // width:'155%',
    // height: height/3,
    // resizeMode: 'contain',
  },
  contentContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    paddingHorizontal: '10%',
    paddingVertical: height * 0.05,
    marginTop: -width * 0.48,
    width: '100%',
    flex: 1,
    // alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  voucherName: {
    marginVertical: '6%',
    color: Colors.black,
    fontSize: width * 0.06,
    marginHorizontal: -10,
    fontWeight: '400',
    marginTop: height * 0.0,
    fontStyle: 'italic',
  },
  discountName: {
    color: Colors.red,
    fontSize: width * 0.05,
    marginHorizontal: -10,
    fontWeight: '400',
    marginTop: height * 0.0,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  detailles: {
    color: Colors.red,
    fontSize: width * 0.05,
    marginHorizontal: -10,
    fontWeight: '400',
    marginTop: height * 0.0,
    fontFamily: 'poppins',
    marginBottom: '3%',
    marginTop: '6%',
  },
  seeMoreText: {
    color: Colors.lightRed2,
    fontFamily: 'poppins',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    letterSpacing: 1,
    fontFamily: 'inter',
  },
  nbVoucher: {
    color: Colors.red,
    fontSize: width * 0.04,

    fontWeight: '400',
    marginTop: height * 0.0,
    fontFamily: 'poppins',
  },
});
