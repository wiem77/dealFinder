import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Alert,
  Image,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../../config/config';

import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import Custominput from '../../components/customInput/Custominput';
import CustomBtn from '../../components/customBtn/CustomBtn';
import logo from '../../assets/image/DealFinderRed.png';
import { useNavigation } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AuthContext } from '../../context/AuthProvider';
import { login } from '../../util/auth';

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };
  const OnSignInPressed = async (data) => {
    setIsAuthenticating(true);
    try {
      const accesscode = data.accesscode;

      const { token, store } = await login(accesscode);

      console.log('storeLOGINE', store);
      authCtx.authenticate({ token, store });

      console.log('Sign in successful');
    } catch (error) {
      showAlert('Error', "Le code d'authentification saisi est invalide.");
      setIsAuthenticating(false);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <View style={styles.WelcomeContainer}>
          <Text style={styles.subtitle}>
            Entrez votre Code d'inscription pour vous connecter.
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <Custominput
            iconName="lock"
            placeHolder="Code "
            name={'accesscode'}
            control={control}
            secureTextEntry={true}
            rules={{
              required: "le code d'acces et requis",
            }}
          />

          <CustomBtn
            style={{ marginTop: 50 }}
            text={'Se Connecter '}
            type="PRIMARY"
            onPress={handleSubmit(OnSignInPressed)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    marginTop: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('10%'),
    marginBottom: hp('5%'),
  },
  logo: {
    width: wp('60%'),
    height: hp('25%'),
  },
  inputWrapper: {
    width: '100%',
    paddingHorizontal: '10%',
  },
  WelcomeContainer: {
    alignItems: 'center',
    marginBottom: '5%',
  },
  title: {
    fontFamily: 'poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: FontSize.large,
  },
  subtitle: {
    width: 260,
    fontFamily: 'poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: FontSize.small,
    color: Colors.black,
  },
});
