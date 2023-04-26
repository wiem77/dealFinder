import { StyleSheet, Text, View, Platform, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import CustomBtn from '../customBtn/CustomBtn';
import { Colors } from '../../constants/Colors';
const ImagePi = ({ onImageSelected }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function requestPermission() {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            "La permission d'accès à la bibliothèque multimédia est requise pour utiliser cette fonctionnalité."
          );
        }
      }
    }
    requestPermission();
  }, []);
  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowEditing: true,
      quality: 1,
    });
    console.log('ImagePicker result:', result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri); 
    }
  };
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: '40%',
            aspectRatio: 1,
            backgroundColor: Colors.white,
            borderRadius: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
      <CustomBtn
        text={'Image'}
        type="REDBTN2"
        nameIcon={'cloud-upload-outline'}
        onPress={handleChooseImage}
        sizeIcon={20}
        colorIcon={Colors.white}
      />
    </View>
  );
};

export default ImagePi;

const styles = StyleSheet.create({});
