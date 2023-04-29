import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { FontSize } from '../../constants/FontSize';
import { Colors } from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const SquareInput = ({ value, onChangeText, forwardedRef }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      keyboardType="number-pad"
      maxLength={1}
      value={value}
      onChangeText={onChangeText}
      ref={forwardedRef}
    />
  </View>
);

const FourDigitInput = ({ onComplete }) => {
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleDigitChange = (index, text) => {
    const newDigits = [...digits];
    newDigits[index] = text[0];
    setDigits(newDigits);
    if (text.length === 1 && index < 3 && inputRefs.current[index + 1]?.focus) {
      inputRefs.current[index + 1].focus();
    }
    if (text.length === 0 && index > 0 && inputRefs.current[index - 1]?.focus) {
      inputRefs.current[index - 1].focus();
    }
    if (text.length === 1 && index === 3 && typeof onComplete === 'function') {
      onComplete(newDigits.join(''));
    }
  };

  const inputs = digits.map((value, index) => (
    <SquareInput
      key={index}
      value={value[0]}
      onChangeText={(text) => handleDigitChange(index, text)}
      forwardedRef={(ref) => (inputRefs.current[index] = ref)}
    />
  ));

  return <View style={styles.container}>{inputs}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 8,
  },
  input: {
    fontSize: FontSize.xsmall,
    fontFamily: 'poppins',
    textAlign: 'center',
    width: wp('12%'),
    height: hp('6%'),
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.black,
    borderRadius: wp('4%'),
  },
});

export default FourDigitInput;
