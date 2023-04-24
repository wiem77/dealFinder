import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/DealFinder.png')}
      />
      <Text style={styles.text}>
        Nous sommes en train de charger les informations, cela ne devrait pas
        prendre longtemps.
      </Text>
      <Image
        style={styles.gif}
        resizeMode="contain"
        source={require('../../assets/image/Loader.gif')}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '10%',
    marginTop: '20%',
    marginBottom: '20%',
  },
  text: {
    fontFamily: 'inter',
    fontSize: FontSize.small,
    fontWeight: '400',
    color: Colors.white,
    textAlign: 'center', // changed from alignItems
    marginBottom: 10,
    marginTop: 10,
  },

  gif: {
    width: '10%',
    height: '30%',
  },
});
