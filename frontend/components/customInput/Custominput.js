import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';

import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import { customFonts } from '../../config/config';
const Custominput = ({
  control,
  name,
  rules,
  placeHolder,
  secureTextEntry,
  inputSize,
  containerStyle,
  iconName,
  stylee,
  defaultValue,
}) => {
  const isUserStyle = stylee !== 'admin';

  return (
    <View style={[styles.inputWrapper, containerStyle]}>
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
                isUserStyle ? styles.userStyle : styles.adminStyle,
                stylee === 'storeForm' ? styles.storeForm : {},
                { borderColor: error ? 'red' : '#e8e8e8' },
              ]}
            >
              <View style={{ marginRight: 3 }}>
                <MaterialCommunityIcons
                  name={iconName}
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </View>

              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeHolder}
                style={[styles.input, { fontSize: inputSize }]}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={Colors.darkText}
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

const styles = StyleSheet.create({});
