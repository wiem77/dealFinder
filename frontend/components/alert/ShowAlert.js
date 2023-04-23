import { StyleSheet, Alert, View } from 'react-native';
import React from 'react';

const ShowAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    { cancelable: false }
  );
};

export default ShowAlert;

const styles = StyleSheet.create({});
