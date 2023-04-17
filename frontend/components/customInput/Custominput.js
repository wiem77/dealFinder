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
            <View style={styles.inputContainer}>
              <Entypo
                name={iconName}
                size={24}
                color={Colors.text}
                style={styles.icon}
              />

              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeHolder}
                secureTextEntry={secureTextEntry}
                defaultValue={defaultValue}
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
    height: wp('10%'),
    marginVertical: '5%',
    borderWidth: 2,
    borderColor: Colors.text,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 1,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 1,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
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
    marginLeft: 8,
  },
});
