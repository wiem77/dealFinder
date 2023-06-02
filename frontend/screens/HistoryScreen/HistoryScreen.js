import React, { useContext, useStateuseEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { AuthContext } from '../../context/AuthProvider';
import { ListItem, colors } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading2 from '../../components/loading2/Loading2';
const reservedVouchers = [
  {
    id: 1,
    voucher: {
      store: {
        store_name: 'Technia',
      },
      name_V: 'Pc20',
      discount: '20%',
    },
  },
  {
    id: 2,
    voucher: {
      store: {
        store_name: 'Fatals',
      },
      name_V: 'Beauté10',
      discount: '10%',
    },
  },
];
const HistoryScreen = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const user = authCtx.user;

  const [voucherStates, setVoucherStates] = useState({});
  const [historyData, setHistoryData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const storedData = await AsyncStorage.getItem('historyData');
          if (storedData) {
            const response = await axios.get(
              `${baseUrl}/reservation/userReservation/usedTrue/${user._id}`,
              {
                headers: {
                  'x-access-token': token,
                },
              }
            );
            const data = response.data;
            await AsyncStorage.setItem('historyData', JSON.stringify(data));
            setHistoryData(data);
          } else {
            setHistoryData([]);
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

  const handleLike = async (id) => {
    setVoucherStates((prevState) => ({
      ...prevState,
      [id]: {
        liked: true,
        disliked: false,
      },
    }));

    try {
      await axios.post(
        `${baseUrl}/users/newRating/${user._id}/${id}`,
        { ratingValue: 1 },
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      console.log('test1');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async (id) => {
    setVoucherStates((prevState) => ({
      ...prevState,
      [id]: {
        liked: false,
        disliked: true,
      },
    }));

    try {
      await axios.post(
        `${baseUrl}/users/newRating/${user._id}/${id}`,
        { ratingValue: -1 },
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      console.log('test');
    } catch (error) {
      console.error(error);
    }
  };

  const renderVoucherItem = ({ item }) => {
    console.log(item);
    if (
      !item ||
      !item.voucher ||
      !item.voucher.store ||
      !item.voucher.name_V ||
      !item.voucher.discount
    ) {
      return null;
    }

    return (
      <ListItem bottomDivider containerStyle={styles.voucherItem}>
        <ListItem.Content>
          <View style={styles.headerContainer}>
            <Feather
              name="shopping-bag"
              size={24}
              color="black"
              style={styles.icon}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <ListItem.Title style={styles.boutique}>
                {item.voucher.store.store_name}
              </ListItem.Title>
              <View style={{ flex: 0.8 }}></View>

              <ListItem.Title
                style={{
                  color: Colors.text,
                  fontFamily: 'poppins',
                  textDecorationLine: 'underline',
                }}
              >
                {item.expiry.split('T')[0]}
              </ListItem.Title>
            </View>
          </View>
          <ListItem.Title style={styles.gain}>
            <Text style={{ fontSize: 18, fontFamily: 'poppins' }}>
              {' '}
              Coupon :
            </Text>
            <Text style={{ fontSize: 18, fontFamily: 'inter' }}>
              {' '}
              {item.voucher.name_V}
            </Text>
          </ListItem.Title>
          <ListItem.Title style={styles.gain}>
            <Text style={{ fontSize: 16, fontFamily: 'poppins' }}>
              {' '}
              Réduction :{' '}
            </Text>
            <Text style={{ fontSize: 16, fontFamily: 'inter' }}>
              {' '}
              {item.voucher.discount}%
            </Text>
          </ListItem.Title>
          <View style={styles.buttonsContainer}>
            <Text style={[styles.noteText, { marginRight: 8 }]}>
              Noter la boutique:
            </Text>
            <TouchableOpacity onPress={() => handleLike(item._id)}>
              {voucherStates[item._id]?.liked ? (
                <Ionicons
                  name="thumbs-up"
                  size={24}
                  color="#4CAF50"
                  style={styles.button}
                />
              ) : (
                <Ionicons
                  name="thumbs-up-outline"
                  size={24}
                  color="black"
                  style={styles.button}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDislike(item._id)}>
              <Ionicons
                name="thumbs-down"
                size={24}
                color={
                  voucherStates[item._id]?.disliked ? '#f44336' : '#9e9e9e'
                }
                style={styles.button}
              />
            </TouchableOpacity>
          </View>
        </ListItem.Content>
      </ListItem>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      {isLoading ? (
        <Loading2 />
      ) : (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>
            Aucun coupon n'a été utilisé pour le moment
          </Text>
          <FontAwesome5
            name="frown"
            size={60}
            color={Colors.primary}
            style={styles.emptyListIcon}
          />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des Vouchers Utilisés</Text>
      <View style={{ marginTop: 16 }}></View>
      <FlatList
        data={historyData}
        renderItem={renderVoucherItem}
        ListEmptyComponent={renderEmptyList}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.backgroundWhite,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  voucherItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  boutique: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'poppins',
    color: Colors.background,
  },
  gain: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 8,
  },
  noteText: {
    fontSize: 16,
    marginRight: 8,
    fontFamily: 'poppins',
    color: Colors.text,
  },
  button: {
    marginHorizontal: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.background,
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
});
export default HistoryScreen;
