import { StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import { Ionicons } from '@expo/vector-icons';
const CustomBtn = ({
  onPress,
  text,
  type = 'PRIMARY',
  nameIcon,
  sizeIcon,
  colorIcon,
}) => {
  const isIconEmpty = !nameIcon || !sizeIcon || !colorIcon;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
      underlayColor="None"
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      {!isIconEmpty && (
        <Ionicons
          name={nameIcon}
          size={sizeIcon}
          color={colorIcon}
          style={{ marginLeft: 15, marginTop: -1 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  container: {
    width: wp('80%'),
    height: wp('13%'),
    padding: 15,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
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
  container_REDBTN: {
    backgroundColor: Colors.red,
    width: wp('70%'),
    height: wp('12%'),
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_GREENBTN: {
    backgroundColor: Colors.green,
    width: wp('80%'),
    height: wp('12%'),
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_REDBTN2: {
    backgroundColor: Colors.darkred,
    width: wp('30%'),
    height: wp('12%'),
    borderRadius: 5,
    paddingVertical: 10,

    flexDirection: 'row',
    alignItems: 'center',
  },
  text_REDBTN2: {
    color: Colors.white,
    marginLeft: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container_SECONDARY: {
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
  },

  container_PRIMARY: {
    backgroundColor: Colors.black,
    borderRadius: 8,
    borderWidth: 1,
  },

  container_TEXT: {
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
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 20,
    // padding: 5,
  },
  text_SECONDARY: {
    color: Colors.black,
    lineHeight: 19,
  },
  text_TERTIARY: {
    color: Colors.red,

    fontSize: FontSize.medium,
  },
  text_REDBTN: {
    color: Colors.white,
    marginRight: 10,

    fontWeight: 'bold',
    textAlign: 'center',
  },
});
