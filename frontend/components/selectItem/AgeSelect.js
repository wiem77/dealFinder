import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
const AgeSelect = ({ selectedAge, onSelect }) => {
  const ages = ['Age'];
  for (let i = 17; i <= 90; i++) {
    ages.push(i.toString());
  }

  const handleAgeSelect = (itemValue) => {
    onSelect(itemValue);
  };

  return (
    <View style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Text
        style={{
          color: Colors.background,
          textDecorationLine: 'underline',
          fontWeight: '500',
          fontFamily: 'poppins',
        }}
      >
        sélectionner votre age:
      </Text>
      <Picker
        selectedValue={selectedAge}
        onValueChange={(itemValue, itemIndex) => handleAgeSelect(itemValue)}
      >
        {ages.map((age) => (
          <Picker.Item key={age} label={`${age}`} value={age} />
        ))}
      </Picker>
    </View>
  );
};

export default AgeSelect;
