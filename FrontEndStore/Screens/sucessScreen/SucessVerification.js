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
const SuccessVerification = ({ route }) => {
  const { data } = route.params;

  const voucherName = data?.data?.voucher?.name_V;

  console.log(voucherName);
  console.log('voucher', data?.voucher);
  console.log('user', data?.user);
  const nbVoucher = data?.data?.voucher?.available_vouchers;
  const discount = data?.data?.voucher?.discount;
  const validity_date = data?.data?.voucher?.validity_date.slice(0, 10);
  const userName = `${data?.data?.user?.prenom} , ${data?.data?.user?.nom} `;
  console.log('data', userName);
  const telephone = data?.data?.user?.telephone;

  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/image/approved.png')}
            style={styles.storeImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.detailles}>Coupon Valide</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.voucherName}>{voucherName}</Text>
            <Text style={styles.discountName}>Remise {discount}%</Text>
          </View>

          {/* Add line divider */}
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <View style={{ marginTop: '8%', marginBottom: '6%' }}></View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.voucherName}>Utilisateur information:</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={styles.nbVoucher}>Nom : </Text>
                <Text style={{ paddingHorizontal: 10, fontSize: 20 }}>
                  {userName}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: '6%',
                  marginBottom: '6%',
                }}
              >
                <Text style={styles.nbVoucher}>télephone : </Text>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 18,
                    fontStyle: 'italic',
                  }}
                >
                  {telephone}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: '8%', marginBottom: '6%' }}>
            <CustomBtn
              style={{ marginTop: '6%' }}
              text={'Retour a la page de Scan'}
              onPress={() => navigation.navigate('ScanQr')}
              type="GREENBTN"
              nameIcon={'barcode-outline'}
              sizeIcon={25}
              colorIcon={Colors.white}
            />
          </View>
        </View>
      </View>

      {/* <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/image/approved.png')}
            style={styles.storeImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.detailles}>Coupon Valide</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.voucherName}>{voucherName}</Text>
            <Text style={styles.discountName}>Remise {discount}%</Text>
          </View>

          <View style={{ marginTop: '8%', marginBottom: '6%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.nbVoucher}>Nom : </Text>
              <Text style={{ paddingHorizontal: 10, fontSize: 20 }}>
                {userName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '6%',
                marginBottom: '6%',
              }}
            >
              <Text style={styles.nbVoucher}>télephone : </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 18,

                  fontStyle: 'italic',
                }}
              >
                {telephone}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: '8%', marginBottom: '6%' }}>
            <CustomBtn
              style={{ marginTop: '6%' }}
              text={'Retour a la page de Scan'}
              onPress={() => navigation.navigate('ScanQr')}
              type="GREENBTN"
              nameIcon={'barcode-outline'}
              sizeIcon={25}
              colorIcon={Colors.white}
            />
          </View>
        </View>
      </View> */}
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
    color: Colors.green,
    fontSize: width * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '400',
    marginTop: height * 0.0,
    fontFamily: 'poppins',
    marginBottom: '3%',
    marginBottom: '10%',
    textDecorationLine: 'underline',
  },

  description: {
    fontSize: 14,
    marginBottom: 10,
    letterSpacing: 1,
    fontFamily: 'inter',
  },
  nbVoucher: {
    color: Colors.black,
    fontSize: width * 0.04,

    fontWeight: '400',
    marginTop: height * 0.0,
    fontFamily: 'poppins',
  },
});
