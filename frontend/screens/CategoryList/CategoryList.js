import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../constants/Colors';
import { CategoryContext } from '../../context/CtegoryProvider';
import { ScrollView } from 'react-native-gesture-handler';
import CustomBtn from '../../components/customBtn';
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import { FontSize } from '../../constants/FontSize';
import { StoreContext } from '../../context/StoreProvider';
import VerticalStoreCard from '../../components/verticalCard/StoreCard';
import Navigation from '../../navigation/Navigation';
export const CategoryList = ({ categories }) => {
  const { stores } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedStores, setSelectedStores] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();
  const handleCategoryChange = (categoryValue) => {
    console.log('categoryValue', categoryValue);
    setSelectedCategory(categoryValue);
    setSelectedSubCategory(null);
  };
  const pickerRef = useRef(null);

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
    console.log('store_id', store_id);
    console.log('store_id', store_id);
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
    <View>
      <TouchableOpacity
        onPress={openPicker}
        style={[styles.button, selectedCategory && styles.buttonSelected]}
      >
        <Ionicons name="search" size={24} color="black" />
        <Text style={styles.buttonText}>
          {!showPicker ? 'Rechercher une catégorie' : selectedCategory}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <View>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={handleCategoryChange}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            ref={pickerRef}
          >
            <Picker.Item label="Sélectionnez une catégorie" value={null} />
            {categories.categories.map((category) => (
              <Picker.Item
                key={category._id}
                label={category.category_name}
                value={category.category_name}
              />
            ))}
          </Picker>

          <TouchableOpacity onPress={closePicker} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedCategory && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryContainer}>
            {categories.categories
              .find((category) => category.category_name === selectedCategory)
              .subcategories?.map((subCategory, index) => (
                <TouchableOpacity
                  key={subCategory._id}
                  activeOpacity={0.8}
                  onPress={() =>
                    handleSubCategoryChange(subCategory.subCategory_name)
                  }
                  style={
                    index !== categories.length - 1 ? styles.categoryItem : null
                  }
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
          </View>
        </ScrollView>
      )}
      <View style={styles.flatListContainer}>
        <FlatList
          data={selectedStores}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 5 }}
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
                  handleFavorite(userId, item._id, isFavorite, item.store_name)
                }
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '70%',
  },

  buttonSelected: {
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'inter',
    textAlign: 'center',
    color: Colors.dark,
  },
  picker: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    backgroundColor: '#EFEFEF',
  },
  pickerItem: {
    fontSize: 16,
    color: '#333333',
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
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  categoryItem: {
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
});

export default styles;

// const style = StyleSheet.create({
//   picker: {
//     height: 150,
//     width: 200,
//     alignSelf: 'center',
//     marginBottom: 10,
//   },
//   pickerItem: {
//     height: 150,
//   },
//   categoryContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//   },
//   categoryItem: {
//     marginRight: 10,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     backgroundColor: 'lightgray',
//   },
//   categoryText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   categoryContainer: {
//     flexDirection: 'row',
//     marginTop: 30,
//     marginBottom: 20,
//     justifyContent: 'space-between',
//   },
//   categoryItem: {
//     marginRight: 10,
//   },

//   categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
//   categoryTextSelected: {
//     color: Colors.red,
//     paddingBottom: 5,
//     borderBottomWidth: 2,
//     borderColor: Colors.red,
//   },
// });
