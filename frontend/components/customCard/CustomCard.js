import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import uri from '../../assets/image/Login.jpg';
import { Dimensions } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

const CustomCard = ({
  storeName,
  distance,
  location,
  voucher,
  subCategory,
}) => {
  const handleClick = () => {
    const newColor = iconColor === 'red' ? 'black' : 'red';
    setIconColor(newColor);
  };
  const [iconColor, setIconColor] = useState('black');
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.storeName}>{storeName}</Text>
        <Entypo
          name="heart-outlined"
          size={24}
          color={iconColor}
          onPress={handleClick}
        />
      </View>

      <ImageBackground source={uri} style={styles.imageBackground}>
        <View style={styles.overlay} />
        <View style={styles.cardBody}>
          <Text style={styles.subCategory}>{subCategory}</Text>
          <Text style={styles.voucher}>{voucher}</Text>
          <View style={styles.cardFooter}>
            <Ionicons name="location-outline" size={16} color={Colors.grey} />
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const { width } = Dimensions.get('window');
const cardWidth = width * 0.5;
const cardHeight = cardWidth * 1.2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    width: cardWidth,
    height: cardHeight,
    overflow: 'hidden',
    marginRight: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  storeName: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  imageBackground: {
    width: '100%',
    height: '75%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  // overlay: {
  //   ...StyleSheet.absoluteFillObject,
  //   backgroundColor: 'rgba(0, 0, 0, 0.4)',
  // },
  cardBody: {
    padding: 10,
  },
  subCategory: {
    color: Colors.white,
    backgroundColor: Colors.darkred,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  voucher: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  location: {
    marginLeft: 5,
  },
});

export default CustomCard;
