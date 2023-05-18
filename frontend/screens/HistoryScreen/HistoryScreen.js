import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const HistoryScreen = () => {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      date: '2023-05-10',
      boutique: 'Boutique A',
      gain: 10,
      liked: false,
      disliked: false,
    },
    {
      id: 2,
      date: '2023-05-12',
      boutique: 'Boutique B',
      gain: 15,
      liked: false,
      disliked: false,
    },
    {
      id: 3,
      date: '2023-05-14',
      boutique: 'Boutique C',
      gain: 20,
      liked: false,
      disliked: false,
    },
  ]);

  const handleLike = (id) => {
    setVouchers((prevVouchers) =>
      prevVouchers.map((voucher) =>
        voucher.id === id
          ? { ...voucher, liked: !voucher.liked, disliked: false }
          : voucher
      )
    );
  };

  const handleDislike = (id) => {
    setVouchers((prevVouchers) =>
      prevVouchers.map((voucher) =>
        voucher.id === id
          ? { ...voucher, disliked: !voucher.disliked, liked: false }
          : voucher
      )
    );
  };

  const renderVoucherItem = ({ item }) => (
    <View style={styles.voucherItem}>
      <View style={styles.headerContainer}>
        <Feather
          name="shopping-bag"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.boutique}>{item.boutique}</Text>
      </View>
      <Text style={styles.gain}>Gagné : {item.gain} points</Text>
      <View style={styles.buttonsContainer}>
        <Text style={styles.noteText}>Noter la boutique:</Text>
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          {item.liked ? (
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
        <TouchableOpacity onPress={() => handleDislike(item.id)}>
          <Ionicons
            name="thumbs-down"
            size={24}
            color={item.disliked ? '#f44336' : '#9e9e9e'}
            style={styles.button}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Aucun voucher utilisé</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des Vouchers Utilisés</Text>
      <FlatList
        data={vouchers}
        renderItem={renderVoucherItem}
        ListEmptyComponent={renderEmptyList}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
export default HistoryScreen;
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  gain: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteText: {
    fontSize: 16,
    marginRight: 8,
  },
  button: {
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: Colors.backgroundWhite,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   voucherItem: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   icon: {
//     marginRight: 8,
//   },
//   boutique: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   gain: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   noteText: {
//     fontSize: 16,
//     marginRight: 8,
//   },
//   button: {
//     marginLeft: 8,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#777',
//   },
// });
