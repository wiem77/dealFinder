import React, { useContext, useState } from 'react';
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
import { ListItem } from 'react-native-elements';
const HistoryScreen = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const user = authCtx.user;
  console.log('userrazerazeze', user);
  const reservedVouchers = user.reservedVouchers;
  const [voucherStates, setVoucherStates] = useState({});
  const handleLike = (id) => {
    setVoucherStates((prevState) => ({
      ...prevState,
      [id]: {
        liked: true,
        disliked: false,
      },
    }));
  };

  const handleDislike = (id) => {
    setVoucherStates((prevState) => ({
      ...prevState,
      [id]: {
        liked: false,
        disliked: true,
      },
    }));
  };

  const renderVoucherItem = ({ item }) => (
    <ListItem bottomDivider containerStyle={styles.voucherItem}>
      <ListItem.Content>
        <View style={styles.headerContainer}>
          <Feather
            name="shopping-bag"
            size={24}
            color="black"
            style={styles.icon}
          />
          <ListItem.Title style={styles.boutique}>
            {item.voucher.store.store_name}
          </ListItem.Title>
        </View>
        <ListItem.Title style={styles.gain}>
          Coupon: {item.voucher.name_V}
        </ListItem.Title>
        <ListItem.Title style={styles.gain}>
          Réduction: {item.voucher.discount}
        </ListItem.Title>
        <View style={styles.buttonsContainer}>
          <Text style={[styles.noteText, { marginRight: 8 }]}>
            Noter la boutique:
          </Text>
          <TouchableOpacity onPress={() => handleLike(item.id)}>
      {voucherStates.liked ? (
        <Ionicons
          name="thumbs-up"
          size={24}
          color="#4CAF50"  // Couleur verte pour le like
          style={styles.button}
        />
      ) : (
        <Ionicons
          name="thumbs-up-outline"
          size={24}
          color="black"  // Couleur par défaut pour le like
          style={styles.button}
        />
      )}
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleDislike(item.id)}>
      <Ionicons
        name="thumbs-down"
        size={24}
        color={voucherStates.disliked ? '#f44336' : '#9e9e9e'}  // Couleur rouge pour le dislike
        style={styles.button}
      />
    </TouchableOpacity>
        </View>
      </ListItem.Content>
    </ListItem>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      {reservedVouchers.length === 0 ||
      hasUsedVouchers.every((used) => used) ? (
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
      ) : (
        <Text style={styles.emptyText}>Chargement...</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des Vouchers Utilisés</Text>
      <View style={{ marginTop: 16 }}></View>
      <FlatList
        data={reservedVouchers}
        renderItem={renderVoucherItem}
        ListEmptyComponent={renderEmptyList}
        keyExtractor={(item) => item._id.toString()}
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  gain: {
    fontSize: 14,
    color: Colors.gray,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 8,
  },
  noteText: {
    fontSize: 14,
    marginRight: 8,
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
