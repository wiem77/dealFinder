import { StyleSheet, Text, SafeAreaView, View, Alert } from 'react-native';
import React, { useState, useContext } from 'react';

import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../../config/config';

import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import Custominput from '../../components/customInput/Custominput';
import CustomBtn from '../../components/customBtn/CustomBtn';

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthProvider';
import { LocationContext } from '../../context/LocationProvider';
import { login } from '../../util/auth';
import LocContext from '../../context/LocationProv';

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const { altitude, longitude, cityLocation } = useContext(LocContext);
  console.log(altitude, longitude, cityLocation);
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
      const email = data.email;
      const password = data.pwd;
      console.log(password, email);
      const { token, user } = await login({ email, password });
      authCtx.authenticate({ token, user });
      console.log('Sign in successful');
    } catch (error) {
      showAlert('Error', error.message);
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
        <View style={styles.WelcomeContainer}>
          <Text style={styles.title}>Bon Retour Parmi Nous</Text>
          <Text style={styles.subtitle}>
            Entrez votre email d'inscription pour vous connecter.
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <View style={{ marginBottom: '7%' }}>
            <Custominput
              iconName="email"
              placeHolder="email"
              name={'email'}
              control={control}
              secureTextEntry={false}
              rules={{
                required: 'Email est requis',
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Email invalide',
                },
              }}
            />
          </View>
          <View style={{ marginBottom: '7%' }}>
            <Custominput
              iconName="lock"
              placeHolder=" Mot de passe "
              name={'pwd'}
              control={control}
              secureTextEntry={true}
              rules={{
                required: 'Le  mot de passe  est requis',
              }}
            />
          </View>

          <CustomBtn
            text={'Se Connecter '}
            type="REDBTN4"
            onPress={handleSubmit(OnSignInPressed)}
          />
        </View>
        {/* <CustomBtn
          text={'Mot Passe Oublié'}
          type="TERTIARY"
          onPress={() => console.log('test')}
        /> */}

        <Text> ou bien</Text>

        <CustomBtn
          text={'Crée un compte'}
          onPress={() => navigation.navigate('SignUp')}
          // type="SECONDARY"
        />
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
    justifyContent: 'center',
    alignItems: 'center',
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
    color: Colors.text,
  },
  createAccount: {
    fontFamily: 'poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: FontSize.small,
    color: Colors.text,
    padding: 80,
  },
});
