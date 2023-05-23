import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import React from 'react';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import CustomBtn from '../../components/customBtn/CustomBtn';

import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const qrCardHeight = Dimensions.get('window').height * 0.8;
const qrCodeSize = qrCardHeight * 0.5;
const windowHeight = Dimensions.get('window').height;

const QrReservation = ({ route, navigation }) => {
  const qrData = route.params;
  const qrCodeUrl = qrData?.qrData.qrCode;
  const expiryDate = qrData?.qrData.expiry.substr(0, 10);
  const currentDate = new Date().toISOString().substr(0, 10);
  const namestore = qrData.qrData.voucher.store.store_name;
  const handleGoBack = () => {
    navigation.goBack();
  };

  const isValid = expiryDate >= currentDate;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.instructions}>
        Veuillez vous rendre au magasin {namestore} pour scanner le QR code et
        bénéficier de la réduction.
      </Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '15%',
        }}
      >
        <View style={styles.qrCodeContainer}>
          <Image source={{ uri: qrCodeUrl }} style={styles.qrCode} />
        </View>

        <View style={styles.textContainer2}>
          <Text
            style={{
              color: Colors.white,
              fontFamily: 'inter',
              fontSize: FontSize.medium,
              fontWeight: '500',
              lineHeight: 19,
            }}
          >
            {isValid ? "Valide jusqu'à" : 'Utiliser avant le'} {expiryDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.backgroundWhite,
  },
  backButton: {
    position: 'absolute',
    top: '8%',
    left: 20,
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: 20,
  },
  textContainer2: {
    backgroundColor: Colors.black,
    borderRadius: 8,
    borderWidth: 1,
    width: wp('80%'),
    height: wp('12%'),
    padding: 15,
    marginTop: '3%',
    alignItems: 'center',

    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
        shadowColor: Colors.black,
        shadowRadius: 10,
      },
    }),
  },

  instructions: {
    fontSize: 19,
    fontFamily: 'inter',
    fontWeight: '800',
    textAlign: 'center',
    marginHorizontal: 20,

    marginTop: '30%',
  },
  qrCodeContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  qrCode: {
    width: 250,
    height: 250,
  },
  validityText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
});

export default QrReservation;
