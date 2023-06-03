import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import { Select } from 'native-base';

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
        Sélectionner votre âge:
      </Text>
      <View
        style={{ marginTop: '5%', alignItems: 'center', marginBottom: '15%' }}
      >
        <Select
          selectedValue={selectedAge}
          onValueChange={(itemValue) => handleAgeSelect(itemValue)}
          minWidth={150}
          maxWidth={100}
          style={{
            marginTop: '5%',
          }}
        >
          {ages.map((age) => (
            <Select.Item key={age} label={`${age}`} value={age} />
          ))}
        </Select>
      </View>
    </View>
  );
};

export default AgeSelect;
