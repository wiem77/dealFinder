import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { Colors } from '../../constants/Colors';

import femme from '../../assets/image/Femme.png'
import homme from '../../assets/image/Homme.png';
import { FontSize } from '../../constants/FontSize';
import { MaterialIcons } from '@expo/vector-icons';


  const RadioButton = ({ label, selected, onPress, onSelect, type }) => {
    const handlePress = () => {
    if (onSelect) {
    onSelect();
    }
    if (onPress) {
    onPress();
    }
    };
    
    return (
    <TouchableOpacity onPress={handlePress}>
    <View style={styles.radioButton}>
    <View
    style={[
    styles.outerCircle,
    selected ? styles.outerCircleSelected : null,
    ]}
    >
    {selected && type === "F" ? (
    <Image resizeMode="contain" source={femme} />
    ) : selected && type === "M" ? (
    <Image resizeMode="contain" source={homme} />
    ) : !selected && type === "F" ? (
    <Image resizeMode="contain" source={femme} />
    ) : (
    <Image resizeMode="contain" source={homme} />
    )}
    </View>
    <View>
    <Text style={styles.labelText}>{label}</Text>
    </View>
    </View>
    </TouchableOpacity>
    );
    };

export default RadioButton;

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  outerCircle: {
    borderWidth: 2,
    borderColor: Colors.text,
    borderRadius: 100,
    padding: 5,
    marginRight: 10,
  },
  outerCircleSelected: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  labelText: {
    fontSize: FontSize.small,
    color: Colors.black,
  },
});
