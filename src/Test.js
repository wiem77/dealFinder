import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Test() {
  const [images, setImages] = useState([]);
  const storeId = '6468a06a2b4f03dd8055216d';
  useEffect(() => {
    const fetchStoreImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/store/stores/${storeId}/images`
        );
        const imageData = response.data;

        setImages(imageData.images);
      } catch (error) {
        console.error('Error fetching store images:', error);
      }
    };

    fetchStoreImages();
  }, [storeId]);

  return (
    <div>
      <h1>Store Images</h1>
      {images.map((imageUrl) => (
        <img src={imageUrl} alt="Store Image" key={imageUrl} />
      ))}
    </div>
  );
}
