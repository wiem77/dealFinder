import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import uri from '../../assets/image/Login.jpg';
const CustomCard = ({
  imageSource,
  storeName,
  distance,
  location,
  voucher,
  subCategory,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={uri} style={styles.image} />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.storeName}>{storeName}</Text>
        <Text style={styles.subCat}>{subCategory}</Text>
        <Text style={styles.location}>{distance}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.voucher}>{voucher}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '40%',
    height: '58%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomSection: {
    flex: 1,
    padding: 10,
  },
  storeName: {
    fontSize: FontSize.medium,
    color: Colors.black,
    textDecorationLine: 'underline',
    fontFamily: 'inter',
    fontWeight: '400',
  },
  subCat: {
    fontSize: FontSize.xsmall,
    color: Colors.text,

    fontFamily: 'inter',
    fontWeight: '400',
  },

  location: {
    fontSize: FontSize.xsmall,
    color: Colors.text,

    fontFamily: 'inter',
    fontWeight: '400',
  },
  voucher: {
    fontSize: FontSize.small,
    color: Colors.darkred,
    fontFamily: 'poppins',

    fontWeight: '900',
  },
});

export default CustomCard;
