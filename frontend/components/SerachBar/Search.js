import React, { useContext, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

const staticData = [
  'Apple',
  'Banana',
  'Orange',
  'Strawberry',
  'Grapes',
  'Mango',
  'Watermelon',
];
import { CategoryContext } from '../../context/CtegoryProvider';
import { StoreContext } from '../../context/StoreProvider';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const { categories } = useContext(CategoryContext);
  const { stores } = useContext(StoreContext);
  const navigation = useNavigation();
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  const renderList = () => {
    if (searchValue === '') {
      return null;
    }

    const filteredStores = stores.filter((store) => {
      return store.vouchers.some(
        (voucher) => voucher.discount === parseInt(searchValue)
      );
    });

    if (filteredStores.length === 0) {
      return <Text style={styles.noResultText}>Aucun résultat trouvé</Text>;
    }
    const handleStoreSelected = (store_id) => {
      const selectedStore = stores?.find((store) => store._id === store_id);
      console.log('selectedStore', selectedStore);

      navigation.navigate('Store', { selectedStore: selectedStore });
    };
    return (
      <FlatList
        data={filteredStores}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleStoreSelected(item._id)}>
            <View style={styles.itemContainer}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
              >
                <Text style={styles.itemText}>{item.store_name}</Text>
                <Text
                  style={{
                    color: Colors.red,
                    fontSize: 15,
                    marginBottom: 5,
                    fontFamily: 'inter',
                  }}
                >
                  {item.vouchers.map((voucher) => voucher.name_V).join(' ')}
                </Text>
              </View>
              <View style={styles.separator} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Chercher votre réduction 10%"
        onChangeText={handleSearchChange}
        value={searchValue}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />

      {renderList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  searchBarContainer: {
    backgroundColor: '#FAF7F4',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInputContainer: {
    backgroundColor: '#FAF7F4',
  },
  listContainer: {
    marginTop: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'inter',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  noResultText: {
    fontFamily: 'inter',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
  },
});

export default Search;
