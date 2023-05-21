import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import uri from '../../assets/image/Sport.png';
import { Dimensions } from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function VerticalStoreCard({
  storeName,
  subCategory,
  distance,
  imageUri,
  voucher,
  onPressFavorite,
  onPressStore,
}) {
  const [favorite, setFavorite] = useState(false);

  const handlePressFavorite = () => {
    setFavorite(!favorite);
    onPressFavorite({
      storeName,
      subCategory,
      distance,
      imageUri,
      voucher,
    });
  };

  return (
    <TouchableOpacity onPress={onPressStore}>
      <View style={styles.container}>
        <ImageBackground source={uri} style={styles.imageBackground}>
          <View style={styles.overlay}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.storeName}>{storeName}</Text>
              <TouchableOpacity onPress={handlePressFavorite}>
                <View style={styles.circle}>
                  <Ionicons
                    name={favorite ? 'heart-sharp' : 'heart-outline'}
                    size={25}
                    color={favorite ? Colors.red : 'white'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.subCategory}>{subCategory}</Text>
            <View style={styles.voucherContainer}>
              <MaterialCommunityIcons name="sale" size={24} color="white" />
              <Text style={styles.voucherText}>{voucher}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Ionicons
                name="location-outline"
                size={16}
                color={Colors.white}
              />

              <Text style={styles.distance}>{distance}</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.cardHeader}></View>
      </View>
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.3;
const cardHeight = cardWidth * 1.5;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    width: cardWidth,
    height: cardHeight,
    overflow: 'hidden',
    marginBottom: 20,
  },

  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
  },
  subCategory: {
    color: Colors.white,
    fontSize: FontSize.xxsmall,
    fontWeight: 'bold',
    backgroundColor: Colors.background,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  distance: {
    marginLeft: 5,
    color: Colors.white,
    fontFamily: 'poppins',
    fontSize: FontSize.xxsmall,
  },
  cardHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  storeName: {
    fontSize: FontSize.small,
    fontWeight: 'bold',
    color: Colors.grey,
    backgroundColor: 'rgba(245, 245, 245, 0.4)',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  voucherContainer: {
    flexDirection: 'row',
  },
  voucherText: {
    color: Colors.white,
    fontFamily: 'poppins',
    fontSize: FontSize.xsmall,
    marginLeft: 5,
  },
});
