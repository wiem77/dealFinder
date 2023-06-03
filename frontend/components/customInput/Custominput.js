import { StyleSheet, Text, View, Platform } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import { TextInput } from 'react-native-gesture-handler';

const Custominput = ({
  control,
  name,
  rules,
  secureTextEntry,
  iconName,
  defaultValue,
  placeHolder,
  type = 'PRIMARY',
  keyboardType,
}) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View
              style={[
                styles.inputContainer,
                styles[`inputContainer_${type}`],
                error && styles.errorContainer,
              ]}
            >
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeHolder}
                secureTextEntry={secureTextEntry}
                defaultValue={defaultValue}
                style={styles.input}
                keyboardType={keyboardType}
              />
              <Entypo
                name={iconName}
                size={24}
                color={Colors.text}
                style={styles.icon}
              />
            </View>
            {error && (
              <Text style={{ color: 'red', alignSelf: 'stretch' }}>
                {error.message || 'Error'}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};
export default Custominput;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('80%'),
    height: wp('13%'),
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 8,
    backgroundColor: Colors.white, // Add this line
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 1,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      },
      android: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 1,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 0,
        overflow: 'hidden',
      },
    }),
  },
  inputContainer_PRIMARY: {},
  inputContainer_THERD: { width: wp('55%') },
  inputContainer_SEC: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('70%'),
    height: wp('13%'),
    borderWidth: 0.5,
    borderColor: Colors.text,
    borderRadius: 8,
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      },
      android: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 1,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 0,
        overflow: 'hidden',
      },
    }),
  },

  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  icon: {
    marginRight: 8,
  },
  errorContainer: {
    borderColor: Colors.lightRed,
  },
});
