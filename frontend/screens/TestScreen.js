import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

export default function StoreImages() {
  const [images, setImages] = useState([]);
  const storeId = '6470a897559f44dd175ce1ae';
  const serverIP = '192.168.8.101';
  useEffect(() => {
    const fetchStoreImages = async () => {
      try {
        const response = await axios.get(
          `http://${serverIP}:4000/api/store/stores/${storeId}/images`
        );
        const imagePaths = response.data.images.map((imageUrl) =>
          imageUrl.replace('http://localhost:4000', '')
        );
        setImages(imagePaths);
      } catch (error) {
        console.error('Error fetching store images:', error);
      }
    };

    fetchStoreImages();
  }, [storeId]);

  return (
    <View style={styles.container}>
      <Text>Store Images</Text>
      {images.map((imageUrl) => (
        <Image
          source={{ uri: `http://${serverIP}:4000${imageUrl}` }}
          style={styles.image}
          key={imageUrl}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});
