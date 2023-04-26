import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { baseUrl } from '../config/config';
import QRCode from 'qrcode';
import { useNavigation } from '@react-navigation/native';
import CustomBtn from '../components/customBtn/CustomBtn';
const Test = ({ navigation }) => {
  const [qrCodeValue, setQRCodeValue] = useState('');

  const generateQRCode = (name, phone, promotion, storeName) => {
    const text = `Name: ${name}\nPhone: ${phone}\nPromotion: ${promotion}\nStore Name: ${storeName}`;
    setQRCodeValue(text); // Update state with the value of the text to encode as QR code
  };

  const handleGenerate = () => {
    generateQRCode('wiem', '55666777', '10', 'planB');
 
    navigation.navigate('QrCode', { qrCodeValue }); // Pass the text to encode as QR code as a parameter
  };

  return (
    <View style={{ marginTop: 40 }}>
      <CustomBtn text={'Generate QR-code'} onPress={handleGenerate} />
    </View>
  );
};



export default Test;

const styles = StyleSheet.create({});
