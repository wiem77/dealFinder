import {
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicatorBase,
  ActivityIndicator,
} from 'react-native';

import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';

import CustomCard from '../../components/customCard/CustomCard';

import Loading from '../../components/loading/Loading';

import { Colors } from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

import { StoreContext } from '../../context/StoreProvider';

import { AuthContext } from '../../context/AuthProvider';
import { baseUrl } from '../../config/config';
import axios from 'axios';

import { CategoryContext } from '../../context/CtegoryProvider';

import { CategoryList } from '../CategoryList/CategoryList';
import { FlatList } from 'react-native-gesture-handler';

const showAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    { cancelable: false }
  );
};
const HomeScreen = () => {
  const [locationName, setLocationName] = useState(null);
  const [locationRegion, setLocationRegion] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNewItems, setShowNewItems] = useState(true);

  const { stores } = useContext(StoreContext);
  const { categories, isLoading, isInitialLoading } =
    useContext(CategoryContext);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

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
  const DrawerHeader = () => {
    const navigation = useNavigation();

    const handleDrawerOpen = () => {
      navigation.openDrawer();
    };

    return (
      <TouchableOpacity onPress={handleDrawerOpen}>
        <AntDesign name="menuunfold" size={40} color="black" />
      </TouchableOpacity>
    );
  };
  // if (isInitialLoading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  // if (!categories) {
  //   return <Text>Chargement des catégories...</Text>;
  // }

  return (
    <>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {/* {!isLoading && categories === null && (
        <Text>Chargement des catégories...</Text>
      )} */}
      {categories && (
        <CategoryList categories={categories} showNewItems={showNewItems} />
      )}
    </>
  );
};

export default HomeScreen;
const style = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryListContainer: {
    marginBottom: 20,
  },
});
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

// <FlatList
//   data={stores}
//   keyExtractor={(item) => item._id}
//   showsHorizontalScrollIndicator={false}
//   renderItem={({ item }) => (
//     <VerticalStoreCard
//       key={item._id}
//       storeName={item.store_name}
//       // distance={item.distance}
//       distance={Object.values(item.locations)[0].city}
//       voucher={Object.values(item.vouchers)[0].discount}
//       subCategory={
//         Object.values(item.sub_categories)[0].subCategory_name
//       }
//       onPressStore={() => handleStoreSelected(item._id)}
//       onPressFavorite={() =>
//         handleFavorite(userId, item._id, isFavorite, item.store_name)
//       }
//     />
//   )}
// />
//     </View>
//   </View>
// );
// const styles = StyleSheet.create({
// card: {
//   height: 225,
//   backgroundColor: Colors.text,

//   marginHorizontal: 2,
//   borderRadius: 10,
//   marginBottom: 20,
//   padding: 15,
// },
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
