import { StyleSheet, Text, View, Image } from 'react-native';
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
    const newImageUri = 'file:///' + image.split('file:/').join('');
    console.log(newImageUri);
  };
  const [image, setImage] = useState(null);
  const testfnct = async () => {
    const formData = new FormData();
    if (image) {
      const newImageUri = 'file:///' + image.split('file:/').join('');
      formData.append('image', {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop(),
      });
      console.log('FormData object:', formData);

      const jsonObject = {};
      for (const [key, value] of formData._parts) {
        jsonObject[key] = value;
      }
      const jsonString = JSON.stringify(jsonObject);
      console.log('JSON object:', jsonString);
      await axios
        .post(`${baseUrl}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          if (res) {
            console.log('RESS', res);
          }
        })
        .catch((err) => {
          console.log('ERROR', err);
        });
    } else {
      console.log('No image selected');
    }
  };

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/image/64451df21d60f6c16d318204`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setImageData(url);
      })
      .catch((error) => console.error('errorrr', error));
  }, []);

  useEffect(() => {
    console.log(imageData);
  }, [imageData]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ImagePi onImageSelected={handleImageSelected} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <CustomBtn text={'Soumettre'} type="PRIMARY" onPress={testfnct} />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        {imageData && (
          <Image
            source={{ uri: imageData }}
            style={{ width: '100%', aspectRatio: 1 }}
            resizeMode="contain"
          />
        )}
      </View>
    </>
  );
};

export default Test;

const styles = StyleSheet.create({});
