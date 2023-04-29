import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FontSize } from '../../constants/FontSize';
import { Colors } from '../../constants/Colors';

import CustomBtn from '../../components/customBtn/CustomBtn';

import image from '../../assets/image/Login.jpg';
const SucessScreen = () => {
  const navigation = useNavigation();
  const { height, width } = Dimensions.get('window');
  const LoginIn = () => {
    navigation.navigate('LoginIn');
  };
  return (
    <SafeAreaView style={{ height: height, width: width }}>
      <View style={styles.container}>
        <Image style={styles.image} resizeMode="contain" source={image} />
        <Text style={styles.text}>
          Email confirmé avec succès! Connectez-vous dès maintenant pour
          consulter nos offres.
        </Text>
        <CustomBtn
          text={'Se Connecter'}
          onPress={LoginIn}
          type="REDBTN"
          nameIcon={'log-in-outline'}
          sizeIcon={20}
          colorIcon={Colors.white}
        />
      </View>
    </SafeAreaView>
  );
};

export default SucessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '6%',
  },
  image: {
    height: '50%',
    width: '100%',
  },
  text: {
    fontSize: FontSize.medium,
    fontFamily: 'comfortaa',
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
    marginVertical: '6%',
  },
});
