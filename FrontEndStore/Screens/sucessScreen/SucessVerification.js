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
  Alert,
} from 'react-native';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import CustomBtn from '../../components/customBtn/CustomBtn';
const { width, height } = Dimensions.get('window');
const showAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    { cancelable: false }
  );
};
const SuccessVerification = () => {
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <TouchableOpacity>
            <AntDesign
              name="arrowleft"
              size={30}
              color="black"
              //   onPress={handelBackPressed}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/image/approved.png')}
            style={styles.storeImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.contentContainer}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            {/* <Text style={styles.voucherName}>{selectedVoucher.name_V}</Text> */}
            <Text style={styles.discountName}>
              {/* Remise {selectedVoucher.discount} % */}
            </Text>
          </View>
          <View>
            <Text style={styles.detailles}>Détailles :</Text>
            {/* <Text style={{}}>{selectedVoucher.description}</Text> */}
          </View>

          <View style={{ marginTop: '8%', marginBottom: '6%' }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.nbVoucher}>Coupons disponible : </Text>
              <Text style={{ paddingHorizontal: 10, fontSize: 23 }}>
                {/* {selectedVoucher.available_vouchers} */}
                <MaterialCommunityIcons
                  name="tag-text"
                  size={25}
                  color="black"
                  style={{ paddingHorizontal: 10 }}
                />
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '6%',
                marginBottom: '6%',
              }}
            >
              <Text style={styles.nbVoucher}>Valable jusqua : </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 18,
                  textDecorationLine: 'underline',
                  fontStyle: 'italic',
                }}
              >
                {/* {selectedVoucher.validity_date.substring(0, 10)} */}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: '8%', marginBottom: '6%' }}>
            <CustomBtn
              style={{ marginTop: '6%' }}
              text={'Reserver votre coupon'}
              //   onPress={handelReservationPressed}
              nameIcon={'cart-outline'}
              sizeIcon={24}
              colorIcon={Colors.white}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default SuccessVerification;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF5F5',
    // paddingHorizontal: 20,
    paddingTop: 30,
  },
  imageContainer: {
    flex: 0.6,

    alignItems: 'center',
    // marginTop: '5%',

    marginBottom: height / 5,
  },
  storeImage: {
    height: height / 3,
  },
  contentContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    paddingHorizontal: '10%',
    paddingVertical: height * 0.05,
    marginTop: -width * 0.4,
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
