import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
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
const qrCardHeight = Dimensions.get('window').height * 0.8;
const qrCodeSize = qrCardHeight * 0.5;
const windowHeight = Dimensions.get('window').height;
const QrCodeScreen = ({ route }) => {
  const { qrData } = route.params;

  const qrCodeUrl = qrData?.qrCode;
  const voucherName = qrData?.vouchers?.name_V;
  const storeName = qrData?.vouchers?.store.store_name;

  const expiryDate = qrData?.expiry.substr(0, 10);
  console.log(qrData);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Scanner-QrCode </Text>
        </View>
      </View>
      <ScrollView style={styles.qrCard}>
        <View style={styles.qrWarpper}>
          {/* <QRCode value={qrCodeUrl} size={300} /> */}
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: qrCodeUrl }}
          />
        </View>
        <View style={styles.textWarrper}>
          <View style={styles.row}>
            <Text style={styles.text1}>{storeName}</Text>
            <Text style={styles.text2}>{voucherName}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.text1}>Numéro de Télephone</Text>
            <Text style={[styles.text2, styles.phone]}>50-777-999</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.text1}>Date d'expiration</Text>
            <Text style={styles.text2}>{expiryDate}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </ScrollView>
    </View>
  );
};

export default QrCodeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundWhite,
    padding: '12%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '1%',
    marginVertical: '9%',
  },
  textContainer: {
    backgroundColor: Colors.black,
    borderRadius: 8,
    borderWidth: 1,
    width: wp('80%'),
    height: wp('12%'),
    padding: 15,

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
  qrCard: {
    backgroundColor: 'rgba(140, 138, 138, 0.08)',
    padding: '3%',
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.9,
    height: qrCardHeight,
    flexDirection: 'column',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '5%', // <-- réduire l'espace entre les éléments de texte
  },

  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginVertical: windowHeight * 0.005,
  },
  textWarrper: {},
  qrWarpper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: windowHeight * 0.02,
  },

  text1: {
    fontSize: FontSize.small,
    fontFamily: 'inter',
    fontWeight: '500',
    fontStyle: 'italic',
    color: Colors.text,
    textDecorationLine: 'underline',
  },
  text2: {
    fontSize: FontSize.small,
    fontFamily: 'inter',
    fontStyle: 'italic',
    fontWeight: '600',
    textAlign: 'right',
    color: Colors.black,
  },
  phone: {
    flex: 1,
    textAlign: 'right',
  },
  text: {
    color: Colors.white,
    fontFamily: 'inter',
    fontSize: FontSize.medium,
    fontWeight: '500',
    lineHeight: 19,
  },
});
