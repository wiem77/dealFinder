import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import CustomCard from '../../components/customCard/CustomCard';
import { Colors } from '../../constants/Colors';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { FontSize } from '../../constants/FontSize';
import { useNavigation } from '@react-navigation/native';
const DATA = [
  {
    id: '1',
    storeName: 'My Store 1',
    distance: '2 km away',
    location: '123 Main Street',
    voucher: '10% off',
    subCategory: 'sport',
  },
  {
    id: '2',
    storeName: 'My Store 2',
    distance: '3 km away',
    location: '456 Main Street',
    voucher: '20% off',
    subCategory: 'food',
  },
  {
    id: '3',
    storeName: 'My Store 3',
    distance: '4 km away',
    location: '789 Main Street',
    voucher: '30% off',
    subCategory: 'clothing',
  },
];
const HomeScreen = () => {
  const renderItem = ({ item }) => (
    <CustomCard
      storeName={item.storeName}
      distance={item.distance}
      location={item.location}
      voucher={item.voucher}
      subCategory={item.subCategory}
    />
  );
  
  const navigation = useNavigation();
  const [iconColor, setIconColor] = useState('black');
  const handleClick = () => {
    setIconColor(Colors.red);
    navigation.navigate('Map');
  };

  return (
    <View style={{ backgroundColor: Colors.backgroundWhite}}>
      <View style={styles.header}>
        <Entypo
          name="location"
          size={24}
          color={iconColor}
          onPress={handleClick}
        />
        <Text style={styles.textLocation}>Sousse,Tunisia</Text>

        <Ionicons
          name="notifications-outline"
          size={24}
          color={iconColor}
          onPress={handleClick}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={styles.search}>
          <TextInput
            style={{
              fontSize: FontSize.xsmall,
              fontWeight: '400',
            }}
            placeholder="Recherchez des offres de folie!"
          />

          <Ionicons name="search-sharp" size={24} color={Colors.red} />
        </View>
        <Ionicons
          name="list"
          size={45}
          color={Colors.red}
          style={{ marginVertical: '2%' }}
        />
      </View>
      <ScrollView style={{ padding:'4%',marginBottom:'70%'}}>
        <View>
          <Text style={styles.categoryName}>Tous</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <Text style={styles.categoryName}>Mode et Accessoires</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <Text style={styles.categoryName}>Beauté et Bien-etre</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <Text style={styles.categoryName}>Voyages et Loisirs</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <Text style={styles.categoryName}>Maison et jardin </Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <Text style={styles.categoryName}>électronique et High-tech </Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: '6%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 5,
    shadowColor: '#000',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'transparent',
    height: '6%',
    alignItems: 'center',
  },
  textLocation: {
    color: Colors.red,
    fontFamily: 'inter',
    fontWeight: 'bold',
    fontSize: FontSize.small,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginVertical: '2%',

    padding: 10,
    paddingHorizontal: '10%',
    borderColor: Colors.darkred,
    backgroundColor: Colors.white,
    borderRadius: 7,
  },
  categoryName: {
    fontSize: FontSize.medium,
    color: Colors.black,
    marginHorizontal: 10,
    marginVertical: 5,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});
