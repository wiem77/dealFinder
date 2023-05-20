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

import * as Location from 'expo-location';

import VerticalStoreCard from '../../components/verticalCard/StoreCard';
import CustomCard from '../../components/customCard/CustomCard';
import { Picker } from '@react-native-picker/picker';
import Loading from '../../components/loading/Loading';
import SelectList from 'react-native-dropdown-select-list';
import { Colors } from '../../constants/Colors';
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import { FontSize } from '../../constants/FontSize';
import { StoreContext } from '../../context/StoreProvider';
import { AuthContext } from '../../context/AuthProvider';
import { baseUrl } from '../../config/config';
import axios from 'axios';
import { CategoryContext } from '../../context/CtegoryProvider';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
const showAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    { cancelable: false }
  );
};
const HomeScreen = () => {
  const [iconColor, setIconColor] = useState('black');
  const [locationName, setLocationName] = useState(null);
  const [locationRegion, setLocationRegion] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [open, setOpen] = useState(false);
  const { stores } = useContext(StoreContext);
  const { categories } = useContext(CategoryContext);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const userId = user?._id;
  const CategoryList = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
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
        <Text>Category:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={handleCategoryChange}
        >
          <Picker.Item label="Select Category" value={null} />
          {categories.categories.map((category) => (
            <Picker.Item
              key={category._id}
              label={category.category_name}
              value={category.category_name}
            />
          ))}
        </Picker>
        {/* <DropDownPicker
          open={open}
          setOpen={setOpen}
          value={selectedCategory}
          items={staticCategories.map((category) => ({
            label: category.category_name,
            value: category._id,
          }))}
          placeholder="Select Category"
          containerStyle={{ height: 40 }}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            console.log('Selected Categoryzzzzzz:', item.value);
            setSelectedCategory(item.value);
            setSelectedSubCategory('null');
            setIsFocus(false);
          }}
        /> */}

        {selectedCategory && (
          <View>
            <Text>Subcategory:</Text>
            <Picker
              selectedValue={selectedSubCategory}
              onValueChange={handleSubCategoryChange}
            >
              <Picker.Item label="Select Subcategory" value={null} />
              {categories.categories
                .find((category) => category.category_name === selectedCategory)
                .subcategories?.map((subCategory) => (
                  <Picker.Item
                    key={subCategory._id}
                    label={subCategory.subCategory_name}
                    value={subCategory.subCategory_name}
                  />
                ))}
            </Picker>
          </View>
        )}
      </View>
    );
  };

  // const CategoryList = () => {
  //   console.log('categories', categories);
  //   const [categoryIndex, setCategoryIndex] = useState(0);
  //   const [subCategoryIndex, setSubCategoryIndex] = useState(0);
  //   const [storesForSelectedSubCategory, setStoresForSelectedSubCategory] =
  //     useState([]);
  //   const [isPickerVisible, setIsPickerVisible] = useState(false);

  //   useEffect(() => {
  //     console.log('testtttttttt');
  //     categories.categories.forEach((category) => {
  //       console.log(category.category_name);
  //       category.subcategories.forEach((subCategory) => {
  //         console.log('Subcategory:', subCategory.subCategory_name);
  //         subCategory.stores.forEach((store) => {
  //           console.log('Store:', store);
  //         });
  //       });
  //     });
  //     const selectedCategoryId = categories.categories[categoryIndex]._id;
  //     const selectedSubCategoryId =
  //       categories.categories[categoryIndex].subcategories[subCategoryIndex]
  //         ._id;
  //     console.log('testttttttttttt3');
  //     console.log('Selected Category ID:', selectedCategoryId);
  //     console.log('Selected Subcategory ID:', selectedSubCategoryId);
  //     const storesForSelectedCategory = stores?.filter((store) => {
  //       console.log(
  //         'store?.sub_categories?.category?._id',
  //         store?.sub_categories._id
  //       );
  //       return (
  //         store?.sub_categories?.category?._id === selectedCategoryId &&
  //         store?.sub_categories.some(
  //           (subCategory) => subCategory._id === selectedSubCategoryId
  //         )
  //       );
  //     });
  //     console.log('Stores for Selected Category:', storesForSelectedCategory);

  //     setStoresForSelectedSubCategory(storesForSelectedCategory);
  //   }, [categoryIndex, subCategoryIndex, categories, stores]);

  //   const togglePicker = () => {
  //     setIsPickerVisible(!isPickerVisible);
  //   };

  //   const handleCategoryChange = (itemValue, itemIndex) => {
  //     setCategoryIndex(itemIndex);
  //     setSubCategoryIndex(0);
  //   };

  //   return (
  //     <View>
  //       <TouchableOpacity onPress={togglePicker}>
  //         <AntDesign name="appstore-o" size={45} color="black" />
  //       </TouchableOpacity>

  //       {isPickerVisible && (
  //         <View>
  //           <Picker
  //             selectedValue={categoryIndex}
  //             onValueChange={handleCategoryChange}
  //             style={style.picker}
  //             itemStyle={style.pickerItem}
  //           >
  //             {categories?.categories?.map((category, index) => (
  //               <Picker.Item
  //                 key={index}
  //                 label={category.category_name}
  //                 value={index}
  //               />
  //             ))}
  //           </Picker>

  //           <Picker
  //             selectedValue={subCategoryIndex}
  //             onValueChange={(itemValue, itemIndex) =>
  //               setSubCategoryIndex(itemIndex)
  //             }
  //             style={style.picker}
  //             itemStyle={style.pickerItem}
  //           >
  //             {categories.categories[categoryIndex]?.subcategories?.map(
  //               (subcategory, index) => (
  //                 <Picker.Item
  //                   key={index}
  //                   label={subcategory.subCategory_name}
  //                   value={index}
  //                 />
  //               )
  //             )}
  //           </Picker>
  //         </View>
  //       )}

  //       <ScrollView>
  //         <View style={style.categoryContainer}>
  //           {storesForSelectedSubCategory?.map((store, index) => (
  //             <TouchableOpacity
  //               key={index}
  //               activeOpacity={0.8}
  //               style={style.categoryItem}
  //             >
  //               <Text style={style.categoryText}>{store.name}</Text>
  //             </TouchableOpacity>
  //           ))}
  //         </View>
  //       </ScrollView>
  //     </View>
  //   );
  // };

  // const CategoryList = () => {
  //   const [categoryIndex, setCategoryIndex] = useState(0);
  //   const [storesForSelectedSubCategory, setStoresForSelectedSubCategory] =
  //     useState([]);

  //   useEffect(() => {
  //     const selectedCategoryId = categories[categoryIndex]._id;
  //     const storesForSelectedCategory = stores.filter((store) =>
  //       store.sub_categories.some(
  //         (subCategory) => subCategory._id === selectedCategoryId
  //       )
  //     );
  //     setStoresForSelectedSubCategory(storesForSelectedCategory);

  //     console.log('storesForSelectedSubCategory:', storesForSelectedCategory);
  //   }, [categoryIndex, categories, stores]);

  //   return (
  //     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  //       <View style={style.categoryContainer}>
  //         {categories.map((item, index) => (
  //           <TouchableOpacity
  //             key={index}
  //             activeOpacity={0.8}
  //             onPress={() => setCategoryIndex(index)}
  //             style={index !== categories.length - 1 && style.categoryItem}
  //           >
  //             <Text
  //               style={[
  //                 style.categoryText,
  //                 categoryIndex === index && style.categoryTextSelected,
  //               ]}
  //             >
  //               {item.subCategory_name}
  //             </Text>
  //           </TouchableOpacity>
  //         ))}
  //       </View>
  //     </ScrollView>
  //   );
  // };

  const mapDataToCategoryList = (data) => {
    const mappedList = data.map((item) => {
      return {
        id: item._id,
        category: item.category.category_name,
        subCategory: item.subCategory_name,
      };
    });
    // setCategoryList(mappedList);
  };

  // const handleStoreSelected = (store_id) => {
  //   console.log('store_id', store_id);
  //   const selectedStore = stores?.find((store) => store._id === store_id);
  //   console.log('selectedStore', selectedStore);

  //   navigation.navigate('Store', { selectedStore });
  // };
  const navigation = useNavigation();
  const handleFavorite = async (userId, storeId, isFavorite, storeName) => {
    console.log(userId, storeId, isFavorite, storeName);
    try {
      const urlADD = `${baseUrl}/users/${userId}/favorite-stores/${storeId}`;
      const urlDel = `${baseUrl}/users/${userId}/deletefavorite-stores/${storeId}`;
      if (isFavorite === false) {
        await axios.post(urlADD);
        setIsFavorite(true);
        showAlert(`${storeName}`, 'Ajouter aux favoris ');
        console.log('Added to favorite stores');
      } else {
        await axios.delete(urlDel);
        setIsFavorite(false);
        console.log('Removed from favorite stores');
      }
    } catch (error) {
      console.error(error);
      showAlert(`error`, `${error.message}`);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Colors.backgroundWhite,
      }}
    >
      <View style={style.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: '600' }}>Binvenue</Text>
          <Text style={{ fontSize: 38, color: Colors.red, fontWeight: '600' }}>
            DealFinder
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: 15,
          }}
        >
          <AntDesign name="appstore-o" size={45} color="black" />
          <Text style={{ paddingVertical: 5 }}>Catégories</Text>
        </View>
      </View>
      <View style={{ marginTop: 30, flexDirection: 'row' }}>
        <View style={style.searchContainer}>
          <Ionicons name="search" size={30} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" style={style.input} />
        </View>
        <View style={style.sortBtn}></View>
      </View>
      <CategoryList categories={categories} />
    </SafeAreaView>
  );
  // return (
  //   <View style={{ backgroundColor: Colors.backgroundWhite, flex: 1 }}>
  //     <SafeAreaView>
  //       <View style={styles.header}>
  //         <MaterialIcons name="my-location" size={24} color={iconColor} />
  //         <Text style={styles.textLocation}>
  //           {locationName}, {locationRegion}
  //         </Text>
  //         <TouchableOpacity onPress={handleNAvigateProfilePressed}>
  //           <FontAwesome5 name="house-user" size={24} color="black" />
  //         </TouchableOpacity>
  //       </View>
  //     </SafeAreaView>
  //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //       <View style={{ flex: 1 }}>
  //         <View style={styles.search}>
  //           <TextInput
  //             style={{
  //               fontSize: FontSize.xsmall,
  //               fontWeight: '400',
  //             }}
  //             placeholder="Recherchez des offres de folie!"
  //           />
  //           <MaterialIcons name="search" size={24} color={Colors.red} />
  //         </View>
  //       </View>
  //       <MaterialIcons
  //         name="menu-book"
  //         size={45}
  //         color={Colors.red}
  //         style={{ marginVertical: '2%' }}
  //       />
  //     </View>
  //     <View style={{ marginVertical: '5%' }}>
  //       <Text style={styles.categoryName}>Nouveauté</Text>
  //       {stores && (
  //         <FlatList
  //           data={stores}
  //           keyExtractor={(item) => item._id}
  //           horizontal={true}
  //           showsHorizontalScrollIndicator={false}
  //           renderItem={({ item }) => (
  //             <CustomCard
  //               storeName={item.store_name}
  //               // distance={item.distance}
  //               distance={Object.values(item.locations)[0].city}
  //               voucher={Object.values(item.vouchers)[0].discount}
  //               subCategory={
  //                 Object.values(item.sub_categories)[0].subCategory_name
  //               }
  //               onPress={() => console.log('Store Pressed', item.store_name)}
  //             />
  //           )}
  //         />
  //       )}

  //       <FlatList
  //         data={stores}
  //         keyExtractor={(item) => item._id}
  //         showsHorizontalScrollIndicator={false}
  //         renderItem={({ item }) => (
  //           <VerticalStoreCard
  //             key={item._id}
  //             storeName={item.store_name}
  //             // distance={item.distance}
  //             distance={Object.values(item.locations)[0].city}
  //             voucher={Object.values(item.vouchers)[0].discount}
  //             subCategory={
  //               Object.values(item.sub_categories)[0].subCategory_name
  //             }
  //             onPressStore={() => handleStoreSelected(item._id)}
  //             onPressFavorite={() =>
  //               handleFavorite(userId, item._id, isFavorite, item.store_name)
  //             }
  //           />
  //         )}
  //       />
  //     </View>
  //   </View>
  // );
};

export default HomeScreen;
const style = StyleSheet.create({
  // categoryContainer: {
  picker: {
    height: 150,
    width: 200,
    alignSelf: 'center',
    marginBottom: 10,
  },
  pickerItem: {
    height: 150,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  categoryItem: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'lightgray',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  //   flexDirection: 'row',
  //   marginTop: 30,
  //   marginBottom: 20,
  //   justifyContent: 'space-between',
  // },
  // categoryItem: {
  //   marginRight: 10,
  // },

  // categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
  // categoryTextSelected: {
  //   color: Colors.red,
  //   paddingBottom: 5,
  //   borderBottomWidth: 2,
  //   borderColor: Colors.red,
  // },
  card: {
    height: 225,
    backgroundColor: Colors.text,

    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: Colors.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     elevation: 5,
//     shadowColor: '#000',
//     backgroundColor: Colors.white,
//     borderWidth: 1,
//     borderColor: 'transparent',
//     height: 50,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   textLocation: {
//     color: Colors.red,
//     fontFamily: 'inter',
//     fontWeight: 'bold',
//     fontSize: FontSize.small,
//   },
//   search: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     marginVertical: '2%',

//     padding: 10,
//     paddingHorizontal: '10%',
//     borderColor: Colors.darkred,
//     backgroundColor: Colors.white,
//     borderRadius: 7,
//   },
//   categoryName: {
//     fontSize: FontSize.medium,
//     color: Colors.black,
//     marginHorizontal: 10,
//     marginVertical: 5,
//     fontWeight: '600',
//     fontStyle: 'italic',
//   },
// });
