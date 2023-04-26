import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import CustomBtn from '../../components/customBtn/CustomBtn';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';
const qrCardHeight = Dimensions.get('window').height * 0.8;
const qrCodeSize = qrCardHeight * 0.5;
const windowHeight = Dimensions.get('window').height;
const QrCodeScreen = ({ route }) => {
  const { qrCodeValue } = route.params;
  console.log(qrCodeValue);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Scanner-QrCode </Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.qrCard}>
        <View style={styles.qrWarpper}>
      
        </View>
        <View style={styles.textWarrper}>
          <View style={styles.row}>
            <Text style={styles.text1}>Nom de la Boutique</Text>
            <Text style={styles.text2}>Plan B</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.text1}>Numéro de Télephone</Text>
            <Text style={[styles.text2, styles.phone]}>50-777-999</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.text1}>Date d'expiration</Text>
            <Text style={styles.text2}>25-03-2023</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.text1}>Promotions</Text>
            <Text style={styles.text2}>10%</Text>
          </View>
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
    marginVertical: 6,

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
    marginVertical: windowHeight * 0.005, // <-- utilisez les dimensions de l'écran pour définir la taille de la bordure inférieure
  },
  textWarrper: {},
  qrWarpper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: windowHeight * 0.02, // <-- réduire l'espace entre la carte QR et les autres éléments
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
