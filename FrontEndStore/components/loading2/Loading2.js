import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

const Loading2 = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/image/DealFinderRed.png')}
      />
      <Text style={styles.text}>Loading ...</Text>
      <Image
        style={styles.gif}
        resizeMode="contain"
        source={require('../../assets/image/Loader.gif')}
      />
    </View>
  );
};

export default Loading2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
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
    color: Colors.black,
    textAlign: 'center', // changed from alignItems
    marginBottom: 10,
    marginTop: 10,
  },

  gif: {
    width: '10%',
    height: '30%',
  },
});
