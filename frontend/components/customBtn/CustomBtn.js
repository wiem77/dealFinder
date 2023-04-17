import { StyleSheet, Text, Platform, TouchableHighlight } from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

const CustomBtn = ({ onPress, text, type = 'PRIMARY' }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
      underlayColor="None"
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </TouchableHighlight>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  container: {
    width: wp('70%'),
    height: wp('12%'),
    padding: 15,
    marginVertical: 6,

    backgroundColor: Colors.black,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',

    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
        shadowColor: Colors.black,
        shadowRadius: 10,
      },
    }),
  },

  container_SECONDARY: {
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    overflow: 'hidden',
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
  },
  text: {
    color: Colors.white,
    fontFamily: 'inter',
    fontSize: FontSize.medium,
    fontWeight: '500',
    lineHeight: FontSize.medium,
  },
  text_SECONDARY: {
    color: Colors.black,
    lineHeight: 19,
  },
});
