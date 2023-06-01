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
import { Box, Flex, Pressable } from 'native-base';
import { HamburgerIcon, Menu } from 'native-base';

const Search = ({ handleCategoryChange, categories }) => {
  const [searchValue, setSearchValue] = useState('');

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
      <Flex
        justifyContent="space-around"
        flexDirection={'row'}
        style={styles.header}
        alignItems={'center'}
      >
        <SearchBar
          placeholder="Chercher votre réduction"
          onChangeText={handleSearchChange}
          value={searchValue}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
        />
        <Box>
          <Menu
            shadow={2}
            w="190"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="Choose Category"
                  {...triggerProps}
                >
                  <View style={{ alignItems: 'center' }}>
                    <HamburgerIcon size={28} color={Colors.background} />
                    <Text
                      style={{
                        fontFamily: 'inter',
                        alignItems: 'center',
                        fontSize: 10,
                        color: Colors.background,
                        fontWeight: '600',
                        fontStyle: 'italic',
                      }}
                    >
                      Catégories
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          >
            <Menu.Item onPress={() => handleCategoryChange(null)}>
              Sélectionnez une catégorie
            </Menu.Item>
            {categories.categories.map((category) => (
              <Menu.Item
                key={category._id}
                onPress={() => handleCategoryChange(category.category_name)}
              >
                {category.category_name}
              </Menu.Item>
            ))}
          </Menu>
        </Box>
      </Flex>

      {renderList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 4 },
  header: {
    marginBottom: 10,
  },
  searchBarContainer: {
    backgroundColor: '#FAF7F4',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: '70%',
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
