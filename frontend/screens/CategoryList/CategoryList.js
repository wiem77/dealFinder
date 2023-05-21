import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import React, { useState, useContext, useEffect, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import { ScrollView } from 'react-native-gesture-handler';

import { StoreContext } from '../../context/StoreProvider';
import VerticalStoreCard from '../../components/verticalCard/StoreCard';
import { Select, CheckIcon, Box, Center, Input, HStack } from 'native-base';
import { Card as NativeBaseCard } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const CategoryList = ({ categories, showNewItems }) => {
  const { stores } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedStores, setSelectedStores] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();

  const handleCategoryChange = (categoryValue) => {
    setSelectedCategory(categoryValue);
    setSelectedSubCategory(null);

    if (categoryValue) {
      const selectedCategoryObj = categories.categories.find(
        (category) => category?.category_name === categoryValue
      );

      if (selectedCategoryObj) {
        setSelectedStores(
          selectedCategoryObj.subcategories.flatMap(
            (subCategory) => subCategory.stores
          )
        );
      }
    } else {
      setSelectedStores(stores);
    }
  };
  const pickerRef = useRef(null);
  useEffect(() => {
    setSelectedStores(stores);
  }, [stores]);

  const handleSubCategoryChange = (subCategoryValue) => {
    setSelectedSubCategory(subCategoryValue);

    const selectedSubCategoryObj = categories.categories
      .find((category) => category?.category_name === selectedCategory)
      .subcategories.find(
        (subCategory) => subCategory?.subCategory_name === subCategoryValue
      );

    if (selectedSubCategoryObj) {
      setSelectedStores(selectedSubCategoryObj.stores);
      console.log(selectedSubCategoryObj.stores);
    }
  };
  const handleStoreSelected = (store_id) => {
    const selectedStore = stores?.find((store) => store._id === store_id);
    console.log('selectedStore', selectedStore);

    navigation.navigate('Store', { selectedStore: selectedStore });
  };
  console.log('selectedCategory', selectedCategory);

  const openPicker = () => {
    setShowPicker(true);
  };

  const closePicker = () => {
    setShowPicker(false);
    if (pickerRef.current) {
      pickerRef.current.blur();
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Bienvenue</Text>
            <Text style={styles.appName}>DealFinder</Text>
          </View>
          <View style={styles.iconContainer}>
            {/* Add your icon components here */}
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.content}>
        <Center>
          <Box>
            <Select
              selectedValue={selectedCategory}
              minWidth="200"
              accessibilityLabel="Choose Category"
              placeholder="Choose Category"
              _selectedItem={{
                bg: 'danger.50',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={handleCategoryChange}
              colorScheme="danger"
            >
              <Select.Item label="Sélectionnez une catégorie" value={null} />
              {categories.categories.map((category) => (
                <Select.Item
                  key={category._id}
                  label={category.category_name}
                  value={category.category_name}
                />
              ))}
            </Select>
          </Box>
        </Center>

        {selectedCategory ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryListContainer}
          >
            {categories.categories
              .find((category) => category.category_name === selectedCategory)
              .subcategories?.map((subCategory, index) => (
                <TouchableOpacity
                  key={subCategory._id}
                  activeOpacity={0.8}
                  onPress={() =>
                    handleSubCategoryChange(subCategory.subCategory_name)
                  }
                  style={[
                    styles.categoryItem,
                    selectedSubCategory === subCategory.subCategory_name &&
                      styles.categoryItemSelected,
                    index !== categories.length - 1 &&
                      styles.categoryItemMargin,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedSubCategory === subCategory.subCategory_name &&
                        styles.categoryTextSelected,
                    ]}
                  >
                    {subCategory.subCategory_name}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        ) : (
          selectedCategory === null &&
          stores && (
            <View style={styles.newItemsContainer}>
              <Text style={styles.categoryName}>Nouveauté</Text>
              <FlatList
                data={stores}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.newItemsList}
                renderItem={({ item }) => (
                  <CustomCard
                    storeName={item.store_name}
                    distance={Object.values(item.locations)[0].city}
                    voucher={Object.values(item.vouchers)[0]?.discount}
                    subCategory={
                      Object.values(item.sub_categories)[0]?.subCategory_name
                    }
                    onPress={() =>
                      console.log('Store Pressed', item.store_name)
                    }
                  />
                )}
              />
            </View>
          )
        )}
        <View
          style={[
            styles.flatListContainer,
            {
              flex: selectedCategory === null ? 1 : 0,
              marginTop: selectedCategory !== null ? 10 : 0,
            },
          ]}
        >
          <FlatList
            data={selectedStores}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <VerticalStoreCard
                  key={item._id}
                  storeName={item.store_name}
                  distance={Object.values(item.locations)[0].city}
                  voucher={Object.values(item.vouchers)[0]?.discount}
                  subCategory={
                    Object.values(item.sub_categories)[0].subCategory_name
                  }
                  onPressStore={() => handleStoreSelected(item._id)}
                  onPressFavorite={() =>
                    handleFavorite(
                      userId,
                      item._id,
                      isFavorite,
                      item.store_name
                    )
                  }
                />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  safeArea: {
    paddingHorizontal: 20,
    backgroundColor: '#FAF7F4',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: '600',
  },
  appName: {
    fontSize: 38,
    color: Colors.red,
    fontWeight: '600',
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 15,
  },
  content: {
    flex: 1,
  },
  button: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonSelected: {
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'inter',
    textAlign: 'center',
    color: Colors.dark,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    backgroundColor: '#EFEFEF',
    alignSelf: 'center',
  },
  pickerItem: {
    fontSize: 16,
    color: '#333333',
    marginHorizontal: 10,
  },
  closeButton: {
    backgroundColor: Colors.darkred,
    padding: 10,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  categoryListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10, // Ajustez cette valeur selon vos préférences
  },

  newItemsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },

  categoryItemSelected: {
    color: Colors.red,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: Colors.red,
  },
  categoryItemMargin: {
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    color: '#333333',
  },
  categoryTextSelected: {
    color: Colors.red,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: Colors.red,
  },
  newItemsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  newItemsList: {
    paddingVertical: 10,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatListContainer: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 10,
  },

  flatListContent: {
    paddingHorizontal: 5,
  },
  cardContainer: {
    width: '40%',
    marginHorizontal: 30,
    marginBottom: 10,
  },
});

export default styles;
