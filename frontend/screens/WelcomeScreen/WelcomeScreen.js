import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import CustomBtn from '../../components/customBtn/CustomBtn';
import { FontSize } from '../../constants/FontSize';
import { Colors } from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
const WelcomeScreen = () => {
  const navigation = useNavigation();
  const OnSignInPressed = (data) => {
    const telephone = data.telephone;
    console.log(telephone);
    navigation.navigate('LoginIn');
  };
  return (
    <>
      <View style={styles.headerContainer}>
        <Image
          resizeMode="contain"
          source={require('../../assets/image/DealFinderRed.png')}
        />
        <Text style={styles.subtitle}>
          Découvrez les promotions locales qui correspondent à vos intérêts.
        </Text>
        <View style={styles.btnContainer}>
          <CustomBtn text={'Se Connecter '} onPress={OnSignInPressed} />
          <CustomBtn
            text={'Continuer en tant que visiteur'}
            onPress={OnSignInPressed}
            type="SECONDARY"
          />
          <CustomBtn
            text={'crée un compte  '}
            onPress={OnSignInPressed}
            type="SECONDARY"
          />
        </View>
      </View>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    width: wp('84%'),
    left: wp('7%'),
    top: hp('22.2%'),
    position: 'relative',
  },
  subtitle: {
    marginVertical: '5%',
    position: 'relative',
    fontFamily: 'poppins',
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: FontSize.medium,
    textAlign: 'center',
    lineHeight: 27,
  },
  btnContainer: {
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    marginVertical: wp('6%'),
  },
});
