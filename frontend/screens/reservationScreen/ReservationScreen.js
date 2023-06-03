import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5, Foundation, Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

import { AuthContext } from '../../context/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { useFocusEffect } from '@react-navigation/native';
import Loading2 from '../../components/loading2/Loading2';
const ReservationScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservationData, setReservationData] = useState([]);
  const [showExpiredReservations, setShowExpiredReservations] = useState(false);

  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const user = authCtx.user;

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const storedData = await AsyncStorage.getItem('reservationData');

          if (storedData) {
            const response = await axios.get(
              `${baseUrl}/reservation/user/${user._id}/allReservation`
            );

            const data = response.data.data;
            console.log('reservationUse ', data);

            setReservationData(data);
            await AsyncStorage.setItem('reservationData', JSON.stringify(data));
          } else {
            setReservationData(JSON.parse(storedData));
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  const handleDeleteReservation = async (reservationId) => {
    try {
      await axios.delete(
        `${baseUrl}/reservation/delete/reservation/${reservationId}`
      );
      const newData = reservationData.filter(
        (item) => item._id !== reservationId
      );
      setReservationData(newData);
      Alert.alert(
        'Suppression réussie',
        'La réservation a été supprimée avec succès.'
      );
    } catch (error) {
      console.error(
        'Erreur lors de la suppression de la réservation:',
        error.message
      );
      Alert.alert(
        'Erreur',
        "Une erreur s'est produite lors de la suppression de la réservation."
      );
    }
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
  const handleResetArchivedReservation = async (reservationId) => {
    console.log(reservationId);
    try {
      const response = await axios.put(
        `${baseUrl}/reservation/users/${user._id}/resetArchivedReservations/${reservationId}`
      );
      const message = response.data.message;

      Alert.alert('Réinitialisation réussie', message);

      const updatedData = reservationData.map((item) => {
        if (item._id === reservationId) {
          return {
            ...item,
            expiredStatus: false,
          };
        }
        return item;
      });
      setReservationData(updatedData);
    } catch (error) {
      console.error(
        'Erreur lors de la réinitialisation de la réservation:',
        error.message
      );

      Alert.alert(
        'Erreur',
        "Une erreur s'est produite lors de la réinitialisation de la réservation."
      );
    }
  };
  const filteredReservationData = showExpiredReservations
    ? reservationData
    : reservationData.filter((item) => !item.expiredStatus);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mes réservations</Text>
        <Foundation
          name="clipboard-notes"
          size={24}
          color="black"
          style={styles.iconContainer}
        />
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setShowExpiredReservations(!showExpiredReservations)}
      >
        <View style={styles.filterButtonContent}>
          <Ionicons
            name={
              showExpiredReservations
                ? 'md-checkmark-circle'
                : 'md-close-circle'
            }
            size={20}
            color="black"
            style={styles.filterButtonIcon}
          />
          <Text style={styles.filterButtonText}>
            {showExpiredReservations
              ? 'Afficher tout'
              : 'Afficher les non expirées'}
          </Text>
        </View>
      </TouchableOpacity>

      {isLoading ? (
        <Loading2 />
      ) : reservationData.length > 0 ? (
        <FlatList
          data={filteredReservationData}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.reservationCard,
                item.expiredStatus ? styles.expiredCard : styles.validCard,
              ]}
              onPress={() => {
                if (item.expiredStatus) {
                  console.log(item._id);
                  Alert.alert(
                    'Réservation expirée',
                    'Que souhaitez-vous faire ?',
                    [
                      {
                        text: 'Réserver à nouveau',
                        onPress: () => handleResetArchivedReservation(item._id),
                      },
                      {
                        text: 'OK',
                      },
                    ]
                  );
                } else {
                  navigation.navigate('QrCpdeReservation', {
                    qrData: item,
                  });
                }
              }}
            >
              <View style={styles.cardContent}>
                <View>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/image/vo.jpg')}
                  />
                </View>

                <View style={styles.cardDetails}>
                  <Text style={styles.storeName}>
                    {item.voucher.store.store_name}
                  </Text>
                  <Text style={styles.couponName}>{item.voucher?.name_V}</Text>
                  <View style={styles.discountContainer}>
                    <View
                      style={[
                        styles.discount,
                        {
                          backgroundColor: item.expiredStatus
                            ? '#BEBEBE'
                            : Colors.red,
                        },
                      ]}
                    >
                      <Text style={styles.discountText}>
                        {item.voucher?.discount}%
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <View style={{}} />
                      <TouchableOpacity
                        style={[styles.deleteButton, { marginLeft: 70 }]}
                        onPress={() => handleDeleteReservation(item._id)}
                      >
                        <MaterialCommunityIcons
                          name="delete-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
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
    paddingBottom: '20%',
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
    borderColor: Colors.red,
  },
  expiredCard: {
    borderWidth: 3,
    borderColor: '#BEBEBE',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  couponName: {
    fontWeight: '400',
    fontFamily: 'inter',
    color: Colors.text,
    fontSize: 17,
    marginRight: -2,
  },
  deleteButton: {
    borderRadius: 5,
    padding: 5,
  },
  discountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: Colors.red,
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
    color: Colors.lightRed,
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
    // fontFamily: 'inter',
    color: Colors.text,
    fontWeight: 'bold',
    marginBottom: 4,
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
    justifyContent: 'space-between',
    flex: 1,
  },
  discount: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 5,
  },

  discountText: {
    color: Colors.backgroundWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonIcon: {
    marginRight: 5,
  },
  filterButtonText: {
    fontWeight: 'bold',
  },
});

export default ReservationScreen;
