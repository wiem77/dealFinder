import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
export default CustomCard = ({
  storeName,
  subCategory,
  distance,
  voucher,
  imageUri,
  onPressStore,
}) => {
  console.log(storeName);
  return (
    <TouchableOpacity onPress={onPressStore}>
      <View style={styles.card}>
        <View style={styles.storeInfo}>
          <View style={styles.storeDetails}>
            <View style={styles.storeLogo}>
              <Image
                source={imageUri}
                style={{ width: windowWidth * 0.2, height: windowWidth * 0.2 }}
                resizeMode="cover"
              />
            </View>
            <View style={styles.storeText}>
              <Text style={styles.storeName}>{storeName}</Text>
              <Text style={styles.storeSubCategory}>{subCategory}</Text>
              <View style={styles.storeLocation}>
                <Ionicons
                  name="location"
                  size={windowWidth * 0.04}
                  color={Colors.grey}
                />
                <Text style={styles.storeDistance}>{distance}</Text>
              </View>
            </View>
          </View>
          <View style={styles.voucherContainer}>
            <Text style={styles.voucherText}>{voucher}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: windowWidth * 0.04,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    marginVertical: windowWidth * 0.01,
    marginHorizontal: windowWidth * 0.02,
    padding: windowWidth * 0.02,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeLogo: {
    marginRight: windowWidth * 0.03,
  },
  storeText: {},
  storeName: {
    fontSize: windowWidth * 0.045,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: windowWidth * 0.01,
  },
  storeSubCategory: {
    fontSize: windowWidth * 0.03,
    color: Colors.text,
    marginBottom: windowWidth * 0.01,
    fontFamily: 'inter',
    fontWeight: 'bold',
  },
  storeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeDistance: {
    fontSize: windowWidth * 0.03,

    marginLeft: windowWidth * 0.02,
    fontSize: windowWidth * 0.03,
    color: Colors.text,
    marginBottom: windowWidth * 0.01,
    fontFamily: 'inter',
    fontWeight: 'bold',
  },
  voucherContainer: {
    backgroundColor: Colors.green,
    borderRadius: windowWidth * 0.04,
    paddingVertical: windowWidth * 0.01,
    paddingHorizontal: windowWidth * 0.02,
  },
  voucherText: {
    fontSize: windowWidth * 0.03,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
