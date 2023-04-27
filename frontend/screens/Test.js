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
import ImagePi from '../components/imagePicker/ImagePicker';
import mime from 'mime';

const Test = () => {
  const handleImageSelected = (selectedImage) => {
    setImage(selectedImage);
    console.log('beforesplit', image);
    console.log('aftersplit', image.split('/'));
  };
  const testfnct = async () => {
    const formData = new FormData();
    if (image) {
      formData.append('image', {
        uri: image,
        type: mime.getType(image),
        name: image.split('/').pop(),
      });
      console.log('FormData object:', formData);

      const jsonObject = {};
      for (const [key, value] of formData._parts) {
        jsonObject[key] = value;
      }
      const jsonString = JSON.stringify(jsonObject);
      console.log('JSON object:', jsonString);
      await axios
        .post(`${baseUrl}/upload`, jsonString,{headers:{"Content-Type":"application/json"}})
        .then((res) => {
          if (res) {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('No image selected');
    }
  };

  const [image, setImage] = useState(null);
  return (
    <View style={{ marginTop: 40 }}>
      <View style={{ marginVertical: '30%' }}>
        <ImagePi onImageSelected={handleImageSelected} />
      </View>
      <CustomBtn text={'Soumettre'} type="PRIMARY" onPress={testfnct} />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
