// import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import homme from '../../assets/image/Homme.png';
import { EMAIL_REGEX, PWD_REGEX } from '../../config/config';
import { Ionicons } from '@expo/vector-icons';
import CustomBtn from '../../components/customBtn/CustomBtn';
import Custominput from '../../components/customInput/Custominput';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';

import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import RadioButton from '../../components/Radiobtn/RadioBtn';
import AgeSelect from '../../components/selectItem/AgeSelect';
import ImagePi from '../../components/imagePicker/ImagePicker';

const SignUpScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
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
    watch,
  } = useForm();
  const pwd = watch('password');
  const handleOptionSelect = (value) => {
    setSelectedOption(value);
  };
  const handleAgeSelect = (value) => {
    setSelectedAge(value);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="chevron-back" size={35} color="black" />
        </View>
        <View style={{ height: '50%' }}>
          <Swiper
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
                <View style={{ marginTop: '12%' }}>
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
            {/* sexe and age Swipe */}
            <View>
              <View style={styles.textcontainer}>
                <Text style={styles.title}> Etape 2:</Text>
                <Text style={styles.subtitle}>
                  Précisez votre âge et votre sexe ci-dessous
                </Text>
              </View>
              <View style={styles.inputWrapper}>
                <Text
                  style={{
                    color: Colors.background,
                    textDecorationLine: 'underline',
                    fontWeight: '500',
                    fontFamily: 'poppins',
                  }}
                >
                  Sélectionner Votre Sexe :
                </Text>
                <View style={styles.row}>
                  <RadioButton
                    type="M"
                    selected={selectedOption === 'male'}
                    onPress={() => handleOptionSelect('male')}
                    onSelect={handleOptionSelect}
                  />
                  <RadioButton
                    type="F"
                    selected={selectedOption === 'female'}
                    onPress={() => handleOptionSelect('female')}
                    onSelect={handleOptionSelect}
                  />
                </View>
                <AgeSelect
                  selectedAge={selectedAge}
                  onSelect={handleAgeSelect}
                />
                <View style={{ marginTop: '2%' }}></View>
              </View>
            </View>
            {/* Email&PHone */}
            <View>
              <View style={styles.textcontainer}>
                <Text style={styles.title}>étape3:</Text>
                <Text style={styles.subtitle}>
                  Veuillez fournir vos informations de contact : e-mail et
                  téléphone
                </Text>
              </View>
              <View style={styles.inputWrapper}>
                <Custominput
                  name="email"
                  control={control}
                  rules={{
                    required: "L'email est requis",
                    pattern: {
                      value: EMAIL_REGEX,
                      message: "L'email est invalide",
                    },
                  }}
                  placeHolder="Email"
                  iconName="email"
                />
                <View style={{ marginTop: '12%' }}>
                  <Custominput
                    name="phone"
                    control={control}
                    rules={{
                      required: 'Numéro de télephone requis',
                      minLength: {
                        value: 8,
                        message: 'Numéro de télephone inccorecte',
                      },
                    }}
                    placeHolder="Numéro de télephone"
                    iconName="phone"
                  />
                </View>
              </View>
            </View>

            {/*Password and Confirm pwd */}
            <View>
              <View style={styles.textcontainer}>
                <Text style={styles.title}>étape4:</Text>
                <Text style={styles.subtitle}>
                  Sélectionnez un mot de passe sécurisé et confirmez-le
                  ci-dessous :
                </Text>
              </View>
              <View style={styles.inputWrapper}>
                <Custominput
                  name="password"
                  control={control}
                  rules={{
                    required: 'Le mot de passe est requis',
                    minLength: {
                      value: 8,
                      message:
                        'Le mot de passe doit avoir au moins 8 caractères',
                    },
                    pattern: {
                      value: PWD_REGEX,
                      message:
                        'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre',
                    },
                  }}
                  placeHolder="Mot de passe"
                  secureTextEntry={true}
                  iconName="lock"
                />
                <View style={{ marginTop: '12%' }}>
                  <Custominput
                    name="confirmPwd"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value === pwd || 'Le mot de passe ne correspond pas',
                    }}
                    placeHolder="Confirmer le mot de passe"
                    secureTextEntry={true}
                    iconName="lock"
                  />
                </View>
              </View>
            </View>

            {/* UploadImage */}
            <View>
              <View style={styles.textcontainer}>
                <Text style={styles.title}>Dérniere étape:</Text>
                <Text style={styles.subtitle}>télecharger votre image:</Text>
              </View>
              <View style={styles.inputWrapper}>
                <ImagePi />
                <View style={{ marginTop: '12%' }}></View>
              </View>
            </View>
          </Swiper>
        </View>
        <View style={styles.btnContainer}>
          <CustomBtn
            text={'Soumettre'}
            type="PRIMARY"
            onPress={handleSubmit(OnSignInPressed)}
          />
        </View>
        <View style={styles.textbtnContainer}>
          <Text style={styles.text}>Vous avez déjà un compte ?</Text>
          <TouchableOpacity onPress={OnSignInPressed}>
            <Text style={styles.btnText}>Connexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    color: Colors.red,
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
  btnContainer: { marginTop: -20, paddingHorizontal: hp('3%') },
  textbtnContainer: { marginTop: '2%', paddingHorizontal: hp('3%') },
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
