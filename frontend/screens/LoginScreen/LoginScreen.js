import { StyleSheet, Text, SafeAreaView, View, Alert } from 'react-native';
import React, { useContext } from 'react';

import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../../config/config';

import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import Custominput from '../../components/customInput/Custominput';
import CustomBtn from '../../components/customBtn/CustomBtn';

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthProvider';

const LoginScreen = () => {
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };
  const OnSignInPressed = async (data) => {
    try {
      const email = data.email;
      const pass = data.pwd;
      console.log(pass, email);
      await signIn(email, pass);
      console.log('Sign in successful');
      navigation.navigate('Home');
    } catch (error) {
      showAlert('Error', error.message);
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

          <CustomBtn
            text={'Se Connecter '}
            type="PRIMARY"
            onPress={handleSubmit(OnSignInPressed)}
          />
        </View>
        <CustomBtn
          text={'Mot Passe Oublié'}
          type="TERTIARY"
          onPress={() => console.log('test')}
        />

        <Text> ou bien</Text>

        <CustomBtn
          text={'crée un compte'}
          onPress={() => navigation.navigate('SignUp')}
          type="SECONDARY"
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    marginTop: '20%',
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
