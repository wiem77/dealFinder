import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import * as Location from 'expo-location';
import mime from 'mime';

import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { EMAIL_REGEX, PWD_REGEX, baseUrl } from '../../config/config';

import CustomBtn from '../../components/customBtn/CustomBtn';
import Custominput from '../../components/customInput/Custominput';

import RadioButton from '../../components/Radiobtn/RadioBtn';
import AgeSelect from '../../components/selectItem/AgeSelect';
import ImagePi from '../../components/imagePicker/ImagePicker';

import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Loading2 from '../../components/loading2/Loading2';
import { LocationContext } from '../../context/LocationProvider';
import { Button, Icon, LinearProgress } from 'react-native-elements';
import LocContext from '../../context/LocationProv';
const showAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    { cancelable: false }
  );
};
const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    trigger,
  } = useForm();
  const pwd = watch('password');
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [locationRegion, setLocationRegion] = useState(null);
  const [locationCountry, setLocationCountry] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const { latitude, longitude, cityLocation } = useContext(LocContext);
  console.log();
  // const locCtx = useContext(LocationContext);
  // console.log('locCtx', locCtx.locationName);
  const [currentIndex, setCurrentIndex] = useState(0);
  const validateStep = async (stepIndex) => {
    switch (stepIndex) {
      case 0:
        if (!errors?.nom || !errors?.prenom) {
          return true;
        } else {
          Alert.alert('Erreur', 'Veuillez remplir tous les champs requis');
          return false;
        }
      case 1:
        if (selectedOption !== '' && selectedAge !== '') {
          return true;
        } else {
          Alert.alert(
            'Erreur',
            'Veuillez sélectionner votre sexe et votre âge'
          );
          return false;
        }
      case 2:
        if (!errors?.email || !errors?.phone) {
          return true;
        } else {
          Alert.alert('Erreur', 'Veuillez remplir tous les champs requis');
          return false;
        }
      case 3:
        if (!errors?.password || !errors?.confirmPwd) {
          return true;
        } else {
          Alert.alert('Erreur', 'Veuillez remplir tous les champs requis');
          return false;
        }
      default:
        return true;
    }
  };
  const goToNextStep = async () => {
    const isValid = await validateStep(currentIndex);
    if (isValid) {
      if (currentIndex === 0) {
        await trigger(['nom', 'prenom']);
        const isNomPrenomValid = !formErrors.nom && !formErrors.prenom;
        console.log(isNomPrenomValid);
        if (isNomPrenomValid) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setErrors({});
        } else {
          Alert.alert('Erreur', 'Veuillez remplir tous les champs requis');
        }
      } else if (currentIndex === 1) {
        if (selectedOption != null && selectedAge != null) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setErrors({});
        } else {
          Alert.alert('Erreur', 'Veuillez remplir tous les champs requis');
        }
      } else if (currentIndex === 2) {
        await trigger(['email', 'phone']);
        const isEmailPhoneValid = !formErrors.email && !formErrors.phone;
        if (isEmailPhoneValid) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setErrors({});
        } else {
          Alert.alert('Erreur', 'Veuillez remplir tous les champs requis');
        }
      } else if (currentIndex === 3) {
        await trigger(['password', 'confirmPwd']);
        const isPasswordValid = !formErrors.password && !formErrors.confirmPwd;
        if (isPasswordValid) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setErrors({});
        } else {
          Alert.alert('Erreur', 'Veuillez remplir tous les champs requis');
        }
      }
    }
  };

  const goToPreviousStep = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocationName(geocode[0].city);
      setLocationRegion(geocode[0].region);
      setLocationCountry(geocode[0].country);
    })();
  }, []);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);

  const navigation = useNavigation();

  const [image, setImage] = useState(null);

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
  };

  const handleAgeSelect = (value) => {
    setSelectedAge(value);
  };

  const backPressed = () => {
    navigation.navigate('WelcomeScreen');
  };

  const onLoginPressed = () => {
    navigation.navigate('LoginIn');
  };
  const handleImageSelected = (selectedImage) => {
    setImage(selectedImage);
  };
  const OnSignInPressed2 = async (data) => {
    try {
      setLoading(true);
      const ress = {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.phone,
        password: data.password,
        confirmpassword: data.confirmPwd,
        sexe: selectedOption,
        age: selectedAge,
        roles: 'consommateur',
        type: 'Point',
        coordinates: [longitude, latitude],
        formattedAddress: `${cityLocation}${locationRegion}`,
        city: cityLocation,
        // country: locationCountry,
      };
      console.log(ress);

      let formData = new FormData();
      if (image) {
        const newImageUri = 'file:///' + image.split('file:/').join('');
        formData.append('image', {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split('/').pop(),
        });
      } else {
        console.log('No image selected');
      }

      formData.append('userData', JSON.stringify(ress));

      console.log('FormData object:', formData);

      await axios.post(`${baseUrl}/signUp`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        data: {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          telephone: data.phone,
          password: data.password,
          confirmpassword: data.confirmPwd,
          sexe: selectedOption,
          age: selectedAge,
          roles: 'consommateur',
          type: 'Point',
          coordinates: [location.coords.longitude, location.coords.latitude],
          formattedAddress: `${cityLocation}, ${locationRegion}`,
          city: cityLocation,
        },
      });
      navigation.navigate('OtpScreen', { email: data.email });
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
    if (loading) {
      return <Loading2 />;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '35%',
            // marginVertical: '15%',
          }}
        >
          <MaterialIcons
            name="location-on"
            size={30}
            color={Colors.background}
          />
          {cityLocation && (
            <Text
              style={{
                fontFamily: 'inter',
                fontSize: 18,
                color: Colors.black,
              }}
            >
              {cityLocation}
            </Text>
          )}
        </View>

        <View style={{ height: '40%' }}>
          {/* <LinearProgress
            value={(currentIndex + 1) / 5}
            colorScheme="info"
            bg="gray.200"
          /> */}
          {currentIndex === 0 && (
            <View style={styles.textcontainer}>
              <View style={styles.textcontainer}>
                <Text style={styles.title}>
                  Créez un compte et devenez membre de DealFinder dès maintenant
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
                    name={'prenom'}
                    control={control}
                    secureTextEntry={false}
                    rules={{
                      required: 'prénom requis',
                    }}
                  />
                </View>
              </View>
            </View>
          )}

          {currentIndex === 1 && (
            <View>
              <View style={styles.textcontainer}>
                <Text style={styles.title}>Étape 2:</Text>
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

                {/* <View style={{ marginTop: '5%' }}></View> */}
              </View>
            </View>
          )}

          {currentIndex === 2 && (
            <View style={{ paddingHorizontal: hp('2%') }}>
              <View style={styles.textcontainer}>
                <Text style={styles.title}>Étape 3:</Text>
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
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          )}

          {currentIndex === 3 && (
            <View style={{ paddingHorizontal: hp('2%') }}>
              <View style={styles.textcontainer}>
                <Text style={styles.title}>Étape 4:</Text>
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
          )}

          {currentIndex === 4 && (
            <View style={{ paddingHorizontal: hp('2%') }}>
              <View style={styles.textcontainer}>
                <Text style={styles.title}>Dernière étape:</Text>
                <Text style={styles.subtitle}>Téléchargez votre image :</Text>
              </View>
              <View style={{ marginVertical: '10%' }}>
                <ImagePi onImageSelected={handleImageSelected} />
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: '10%',
          }}
        >
          {currentIndex > 0 && (
            <Button
              type="outline"
              title="Précédent"
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={goToPreviousStep}
              buttonStyle={[styles.btn, { backgroundColor: Colors.background }]}
              titleStyle={styles.btnText}
            />
          )}
          {currentIndex < 4 && (
            <Button
              title="Suivant"
              icon={<Icon name="arrow-forward" size={20} color="white" />}
              onPress={goToNextStep}
              buttonStyle={[styles.btn, { backgroundColor: Colors.background }]}
              titleStyle={styles.btnText}
            />
          )}
        </View>

        {currentIndex === 4 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: '2%',
            }}
          >
            <CustomBtn
              text={'Soumettre'}
              type="PRIMARY"
              onPress={handleSubmit(OnSignInPressed2)}
            />
          </View>
        )}

        <View style={styles.textbtnContainer}>
          <Text style={styles.text}>Vous avez déjà un compte ?</Text>
          <TouchableOpacity onPress={onLoginPressed}>
            <Text
              style={{
                marginVertical: '2%',
                color: Colors.background,
                fontFamily: 'inter',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: FontSize.medium,
              }}
            >
              Connexion
            </Text>
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
    backgroundColor: '#FBF5F5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  header: {
    // marginVertical: '15%',
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
    marginVertical: '10%',
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
  btnContainer: { marginTop: '20%', paddingHorizontal: hp('3%') },
  textbtnContainer: { marginTop: '10%', paddingHorizontal: hp('3%') },
  text: {
    color: Colors.text,
    fontFamily: 'inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: FontSize.small,
  },
  btnText: {
    marginVertical: '2%',
    color: Colors.white,
    fontFamily: 'inter',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: FontSize.small,
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
