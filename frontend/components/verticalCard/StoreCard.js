// import React, { useState } from 'react';
// import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { Colors } from '../../constants/Colors';
// import { FontSize } from '../../constants/FontSize';
// const VerticalStoreCard = ({
//   storeName,
//   subCategory,
//   distance,
//   imageUri,
//   isFavorite,
//   onPressFavorite,
// }) => {
//   const [favorite, setFavorite] = useState(isFavorite);

//   const handleFavoritePress = () => {
//     setFavorite(!favorite);
//     onPressFavorite();
//   };

//   return (
//     <TouchableOpacity activeOpacity={0.7}>
//       <View style={styles.card}>
//         <View style={styles.storeLogo}>
//           <Image
//             source={{ uri: imageUri }}
//             style={styles.logoImage}
//             resizeMode="cover"
//           />
//         </View>
//         <View style={styles.storeText}>
//           <Text style={styles.storeName}>{storeName}</Text>
//           <Text style={styles.storeSubCategory}>{subCategory}</Text>
//           <View style={styles.storeLocation}>
//             <Ionicons name="location" size={15} color={Colors.grey} />
//             <Text style={styles.storeDistance}>{distance}</Text>
//           </View>
//         </View>
//         <TouchableOpacity activeOpacity={0.7} onPress={handleFavoritePress}>
//           <Ionicons
//             name={favorite ? 'heart' : 'heart-outline'}
//             size={24}
//             color={favorite ? Colors.red : Colors.grey}
//           />
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//     card: {
//       backgroundColor: Colors.white,
//       borderRadius: 8,
//       shadowColor: Colors.black,
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: 2,
//       elevation: 3,
//       marginVertical: 10,
//       marginHorizontal: 15,
//       padding: 15,
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       flexDirection: 'column',
//     },
//     storeLogo: {
//       marginBottom: 12,
//     },
//     logoImage: {
//       width: 60,
//       height: 60,
//       borderRadius: 30,
//     },
//     storeText: {
//       alignItems: 'center',
//     },
//     storeName: {
//       fontSize: FontSize.medium,
//       fontWeight: 'bold',
//       color: Colors.black,
//       marginBottom: 4,
//     },
//     storeSubCategory: {
//       fontSize: FontSize.xsmall,
//       color: Colors.text,
//       marginBottom: 4,
//       fontFamily: 'inter',
//       fontWeight: 'bold',
//     },
//     storeLocation: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     storeDistance: {
//       fontSize: FontSize.xsmall,
//       color: Colors.grey,
//       marginLeft: 8,
//     },
//   });

// export default VerticalStoreCard;
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
import { Entypo, Ionicons } from '@expo/vector-icons';

export default function VerticalStoreCard({
  storeName,
  subCategory,
  distance,
  imageUri,
  voucher,
  isFavorite,
  onPressFavorite,
}) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handlePressFavorite = () => {
    setFavorite(!favorite);
    onPressFavorite();
  };

  return (
    <TouchableOpacity onPress={() => console.log('Card pressed!')}>
      <View style={styles.container}>
        <ImageBackground source={uri} style={styles.imageBackground}>
          <View style={styles.overlay}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.storeName}>{storeName}</Text>
              <TouchableOpacity onPress={handlePressFavorite}>
                <Entypo
                  name={favorite ? 'heart' : 'heart-outlined'}
                  size={24}
                  color={Colors.red}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.subCategory}>{subCategory}</Text>
            <View style={styles.cardFooter}>
              <Ionicons name="location-outline" size={16} color={Colors.grey} />

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
const cardWidth = width * 0.4;
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
    fontSize: FontSize.small,
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
    marginTop: 25,
  },
  distance: {
    marginLeft: 5,
    color: Colors.text,
    fontFamily: 'poppins',
    fontSize: FontSize.meduim,
  },
  cardHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  storeName: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    color: Colors.grey,
    backgroundColor: 'rgba(245, 245, 245, 0.4)',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});
