import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import CustomCard from '../../components/customCard/CustomCard';
import { Colors } from '../../constants/Colors';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { FontSize } from '../../constants/FontSize';
const HomeScreen = () => {
  const [iconColor, setIconColor] = useState('black');

  const handleClick = () => {
    setIconColor(Colors.red);
  };

  return (
    <View style={{ backgroundColor: Colors.backgroundWhite, flex: 1 }}>
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
      <View>
        <CustomCard
          storeName="My Store"
          distance="2 km away"
          location="123 Main Street"
          voucher="10% off"
          subCategory="sport"
        />
      </View>
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
    marginHorizontal: '8%',
    padding: 10,
    borderColor: Colors.darkred,
    backgroundColor: Colors.white,
    borderRadius: 7,
  },
});
