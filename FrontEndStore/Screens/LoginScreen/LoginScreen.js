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
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.WelcomeContainer}>
          <Text style={styles.subtitle}>
            Entrez votre Code d'inscription pour vous connecter.
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <Custominput
            iconName="lock"
            placeHolder="Code"
            name={'accesscode'}
            control={control}
            secureTextEntry={true}
            rules={{
              required: "le code d'acces et requis",
            }}
          />
          <View style={{ marginTop: 20 }} />
          <CustomBtn
            style={{ marginTop: 20 }}
            text={'Se Connecter'}
            type="REDBTN"
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
    backgroundColor: '#FBF5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '70%',
    height: undefined,
    aspectRatio: 3, // Modifiez l'aspect ratio selon vos besoins
  },
  inputWrapper: {
    width: '80%',
    paddingHorizontal: '10%',
    marginTop: 20,
  },
  WelcomeContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  subtitle: {
    width: 260,
    fontFamily: 'poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16, // Modifiez la taille de police selon vos besoins
    color: '#000000',
    textAlign: 'center',
  },
});
