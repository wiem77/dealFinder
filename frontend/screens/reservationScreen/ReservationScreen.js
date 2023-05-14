import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const ReservationScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [reservationData, setReservationData] = useState([
    {
      id: 1,
      couponName: 'Coupon 1',
      storeName: 'Boutique 1',
      discount: '50% ',
      image: require('../../assets/image/Sport.png'),
      isValid: true,
      isExpired: false,
    },
    {
      id: 2,
      couponName: 'Coupon 2',
      storeName: 'Boutique 2',
      discount: '10€',
      // image: require('../../assets/image/sport.png'),
      isValid: false,
      isExpired: true,
    },
    {
      id: 3,
      couponName: 'Coupon 3',
      storeName: 'Boutique 3',
      discount: '20% ',
      // image: require('../../assets/image/sport.png'),
      isValid: true,
      isExpired: false,
    },
    {
      id: 4,
      couponName: 'Coupon 2',
      storeName: 'Boutique 2',
      discount: '10€ ',
      // image: require('../../assets/image/sport.png'),
      isValid: false,
      isExpired: true,
    },
    {
      id: 5,
      couponName: 'Coupon 3',
      storeName: 'Boutique 3',
      discount: '20% ',
      // image: require('../../assets/image/sport.png'),
      isValid: true,
      isExpired: false,
    },
    {
      id: 6,
      couponName: 'Coupon 3',
      storeName: 'Boutique 3',
      discount: '20% ',
      // image: require('../../assets/image/sport.png'),
      isValid: true,
      isExpired: false,
    },
    {
      id: 7,
      couponName: 'Coupon 3',
      storeName: 'Boutique 3',
      discount: '20% ',
      // image: require('../../assets/image/sport.png'),
      isValid: true,
      isExpired: false,
    },
  ]);

  const handleDeleteReservation = (id) => {
    const newData = reservationData.filter((item) => item.id !== id);
    setReservationData(newData);
  };
  const renderEmptyListComponent = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>
          Vous n'avez aucune réservation pour le moment
        </Text>
        <FontAwesome5
          name="frown"
          size={60}
          color={Colors.primary}
          style={styles.emptyListIcon}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mes réservations</Text>
        <FontAwesome5
          name="bookmark"
          size={24}
          color="black"
          style={styles.iconContainer}
        />
      </View>
      {reservationData.length > 0 ? (
        <FlatList
          data={reservationData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.reservationCard,
                item.isValid ? styles.validCard : styles.expiredCard,
              ]}
              onPress={() =>
                item.isExpired
                  ? alert('Reservation expired')
                  : console.log('Reservation details')
              }
            >
              <View style={styles.cardContent}>
                <View>
                  <Image style={styles.cardImage} source={item.image} />
                </View>

                <View style={styles.cardDetails}>
                  <Text style={styles.storeName}>{item.storeName}</Text>
                  <Text style={styles.couponName}>{item.couponName}</Text>
                  <View style={styles.discountContainer}>
                    <Text style={styles.discountLabel}>Discount</Text>
                    <View style={styles.verticalLine} />
                    <View style={styles.discount}>
                      <Text style={styles.discountText}>{item.discount}</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteReservation(item.id)}
                    >
                      <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListHeaderComponent={<View style={{ flex: 1 }} />}
          ListEmptyComponent={<View>{renderEmptyListComponent()}</View>}
        />
      ) : (
        <View>{renderEmptyListComponent()}</View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    paddingHorizontal: 20,
    paddingBottom: '20%', // Ajout de la propriété paddingBottom
  },
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    marginTop: '50%',
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'comfortaa',
  },
  emptyListIcon: {
    marginTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
  iconContainer: {
    marginLeft: 10,
  },
  headerText: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: 'bold',
  },
  reservationCard: {
    width: '100%',
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  validCard: {
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  expiredCard: {
    borderWidth: 2,
    borderColor: '#BEBEBE',
    borderColor: '#FF0000',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  couponName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10,
  },
  deleteButton: {
    borderRadius: 5,
    padding: 5,
  },
  discountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#FF0000',
  },
  discountText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  expiredText: {
    color: '#BEBEBE',
    fontSize: 14,
    marginTop: 5,
  },
  alertText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: 5,
  },
  cardImage: {
    // marginTop: 45,
    width: 100,
    height: 80,
    borderRadius: 10,
    marginRight: 25,
    marginLeft: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noReservationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noReservationIcon: {
    marginBottom: 10,
  },
  noReservationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  verticalLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  discount: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#FF0000',
  },
  discountText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

//     <View style={styles.container}>
//       <SafeAreaView style={styles.header}>
//         <Text style={styles.headerText}>Mes réservations</Text>
//         <View style={styles.iconContainer}>
//           <FontAwesome5 name="bookmark" size={24} color="black" />
//         </View>
//       </SafeAreaView>
//       <FlatList
//         data={reservationData}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.reservationCard,
//               item.isValid ? styles.validCard : styles.expiredCard,
//             ]}
//             onPress={() =>
//               item.isExpired
//                 ? alert('Reservation expired')
//                 : console.log('Reservation details')
//             }
//           >
//             <View style={styles.cardContent}>
//               <Image style={styles.cardImage} source={item.image} />
//               <View style={styles.cardDetails}>
//                 <Text style={styles.storeName}>{item.storeName}</Text>
//                 <Text style={styles.couponName}>{item.couponName}</Text>
//                 <View style={styles.discount}>
//                   <Text style={styles.discountText}>{item.discount}</Text>
//                 </View>
//               </View>
//               <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={() => handleDeleteReservation(item.id)}
//               >
//                 <AntDesign name="delete" size={24} color="black" />
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.backgroundWhite,
//     paddingHorizontal: 20,
//   },
//   header: {
//     paddingHorizontal: 20,
//     marginBottom: '10%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: '20%',
//   },
//   iconContainer: {
//     marginLeft: 10,
//   },
//   headerText: {
//     color: Colors.black,
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   reservationCard: {
//     width: '100%',
//     height: 120,
//     marginBottom: 10,
//     borderRadius: 10,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     padding: 10,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   validCard: {
//     borderWidth: 2,
//     borderColor: '#FF0000',
//   },
//   expiredCard: {
//     borderWidth: 2,
//     borderColor: '#BEBEBE',
//   },
//   cardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     paddingHorizontal: 10,
//   },
//   couponName: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     marginRight: 10,
//   },
//   deleteButton: {
//     borderRadius: 5,
//     padding: 5,
//   },
//   discountBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 5,
//     backgroundColor: '#FF0000',
//   },
//   discountText: {
//     color: Colors.black,
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   expiredText: {
//     color: '#BEBEBE',
//     fontSize: 14,
//     marginTop: 5,
//   },
//   alertText: {
//     color: '#FF0000',
//     fontSize: 14,
//     marginTop: 5,
//   },
//   cardImage: {
//     marginTop: 45,
//     width: 70,
//     height: 100,
//     borderRadius: 10,
//     marginRight: 0,
//   },
//   storeName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
// });

export default ReservationScreen;
