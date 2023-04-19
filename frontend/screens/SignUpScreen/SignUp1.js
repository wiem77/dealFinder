// import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { EMAIL_REGEX } from '../../config/config';
import { Ionicons } from '@expo/vector-icons';
import CustomBtn from '../../components/customBtn/CustomBtn';
import Custominput from '../../components/customInput/Custominput';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,KeyboardAvoidingView
} from 'react-native';
import Swiper from 'react-native-swiper';

import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

const SignUpScreen = () => {
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
   
       <KeyboardAvoidingView
       style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={35} color="black" />
      </View>
      <View style={{ height: '50%' }}>
        <Swiper
        scrollEnabled={false}
          howsPagination={true}
          activeDotColor="red"
          dotStyle={{ width: 10, height: 10 }}
        >
          <View>
            <View style={styles.textcontainer}>
              <Text style={styles.title}>
                {' '}
                Crée un Compte et devenez membre de DealFinder dès maintenant
              </Text>
              <Text style={styles.subtitle}>
                Remplissez le formulaire pour nous rejoindre
              </Text>
            </View>
            <View style={styles.inputWrapper}>
              <Custominput
                placeHolder="Nom"
                name={'nom'}
                control={control}
                secureTextEntry={false}
                rules={{
                  required: 'Nom est requis',
                }}
              />
              <View style={{ marginTop: '2%' }}>
                <Custominput
                  placeHolder=" Prénom "
                  name={'prénom'}
                  control={control}
                  secureTextEntry={true}
                  rules={{
                    required: 'prénom requis',
                  }}
                />
              </View>
            </View>
            <View style={styles.btnContainer}>
        <CustomBtn
          text={'Continuer'}
          type="PRIMARY"
          onPress={handleSubmit(OnSignInPressed)}
        />
      </View>
          </View>

          <View>
            <View style={styles.textcontainer}>
              <Text style={styles.title}>
                {' '}
                Crée un Compte et devenez membre de DealFinder dès maintenant
              </Text>
              <Text style={styles.subtitle}>
                Remplissez le formulaire pour nous rejoindre
              </Text>
            </View>
            <View style={styles.inputWrapper}>
              <Custominput
                placeHolder="Nom"
                name={'nom'}
                control={control}
                secureTextEntry={false}
                rules={{
                  required: 'Nom est requis',
                }}
              />
              <View style={{ marginTop: '2%' }}>
                <Custominput
                  placeHolder=" Prénom "
                  name={'prénom'}
                  control={control}
                  secureTextEntry={true}
                  rules={{
                    required: 'prénom requis',
                  }}
                />
              </View>
            </View>
          </View>
        </Swiper>
      </View>
      
      <View style={styles.btnContainer}>
        <Text style={styles.text}>Vous avez déjà un compte ?</Text>
        <TouchableOpacity onPress={OnSignInPressed}>
          <Text style={styles.btnText}>Connexion</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
   
    
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  header: {
    alignItems: 'flex-start',
    paddingLeft: '1%',
    marginVertical: '9%',
  },
  textcontainer: {
    paddingHorizontal: hp('2%'),
  },
  title: {
    color: Colors.black,
    fontFamily: 'poppins',
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 20,
  },
  subtitle: {
    paddingHorizontal: hp('0.5%'),
    marginTop: 1,
    fontFamily: 'poppins',
    fontStyle: 'normal',
    fontWeight: '100',
    fontSize: FontSize.xsmall,
    color: Colors.text,
    textDecorationLine: 'underline',
  },
  inputWrapper: {
    marginVertical: '5%',
    paddingHorizontal: hp('3%'),
  },
  btnContainer: { marginTop: '2%', paddingHorizontal: hp('3%') },
  text: {
    color: Colors.text,
    fontFamily: 'inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: FontSize.small,
  },
  btnText: {
    marginVertical: '2%',
    color: Colors.red,
    fontFamily: 'inter',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: FontSize.small,
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    marginTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
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
