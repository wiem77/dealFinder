import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../../config/config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Custominput from '../../components/customInput/Custominput';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import CustomBtn from '../../components/customBtn/CustomBtn';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
  const navigation = useNavigation();
  const OnSignInPressed = (data) => {
    const email = data.email;
    const pwd = data.pwd;
    console.log(email, pwd);
    navigation.navigate('SignUp');
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
          onPress={OnSignInPressed}
        />

        <Text> ou bien</Text>

        <CustomBtn
          text={'crée un compte'}
          onPress={OnSignInPressed}
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
    marginBottom: '5%', // adjust this value to control the spacing
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
