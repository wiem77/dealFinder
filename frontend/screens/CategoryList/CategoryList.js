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

import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../constants/Colors';
import { CategoryContext } from '../../context/CtegoryProvider';
import { ScrollView } from 'react-native-gesture-handler';

import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import { FontSize } from '../../constants/FontSize';
import { StoreContext } from '../../context/StoreProvider';
export const CategoryList = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const handleCategoryChange = (categoryValue) => {
    console.log('tetststst');
    console.log('categoryValue', categoryValue);
    setSelectedCategory(categoryValue);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryChange = (subCategoryValue) => {
    setSelectedSubCategory(subCategoryValue);

    const selectedSubCategoryObj = categories.categories
      .find((category) => category?.category_name === selectedCategory)
      .subcategories.find(
        (subCategory) => subCategory?.subCategory_name === subCategoryValue
      );

    if (selectedSubCategoryObj) {
      console.log(
        'Selected Subcategory Stores:',
        selectedSubCategoryObj?.stores
      );
    }
  };

  console.log('selectedCategory', selectedCategory);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowPicker(!showPicker)}
        style={[styles.button, selectedCategory && styles.buttonSelected]}
      >
        <Text style={styles.buttonText}>
          {selectedCategory ? selectedCategory : 'Rechercher une catégorie'}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <Picker
          selectedValue={selectedCategory}
          onValueChange={handleCategoryChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
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
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  buttonSelected: {
    backgroundColor: 'blue',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  picker: {
    height: 40,
    width: 200,
    marginBottom: 10,
  },
  pickerItem: {
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryItem: {
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  categoryTextSelected: {
    backgroundColor: 'blue',
    color: 'white',
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
