import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import mime from 'mime';
import Swiper from 'react-native-swiper';
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

const SignUpScreen = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [locationRegion, setLocationRegion] = useState(null);
  const [locationCountry, setLocationCountry] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const pwd = watch('password');
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
        coordinates: [location.coords.longitude, location.coords.latitude],
        formattedAddress: `${locationName}, ${locationRegion}`,
        city: locationName,
        country: locationCountry,
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
          formattedAddress: `${locationName}, ${locationRegion}`,
          city: locationName,
          country: locationCountry,
        },
      });
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const OnSignInPressed = async (data) => {
    // try {

    const newImageUri = 'file:///' + image.split('file:/').join('');
    setLoading(true);
    let formData = new FormData();
    formData.append('image', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    });

    console.log('FormData object:', formData);
    // formData.append('nom', data.nom);
    // formData.append('prenom', data.prenom);
    // formData.append('email', data.email);
    // formData.append('telephone', data.phone);
    // formData.append('password', data.password);
    // formData.append('confirmpassword', data.confirmPwd);
    // formData.append('sexe', selectedOption);
    // formData.append('age', selectedAge);
    // formData.append('roles', 'consommateur');
    // formData.append('type', 'Point');
    // formData.append('coordinates', [
    //   location.coords.longitude,
    //   location.coords.latitude,
    // ]);
    // formData.append('formattedAddress', `${locationName}, ${locationRegion}`);
    // formData.append('city', locationName);
    // formData.append('country', locationCountry);

    // const res =
    await axios
      .post(`${baseUrl}/signUp`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res) {
          console.log(res.request);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // {
    // nom: data.nom,
    // prenom: data.prenom,
    // email: data.email,
    // telephone: data.phone,
    // password: data.password,
    // confirmpassword: data.confirmPwd,
    // sexe: selectedOption,
    // age: selectedAge,
    // roles: 'consommateur',

    // type: 'Point',
    // coordinates: [location.coords.longitude, location.coords.latitude],
    // formattedAddress: `${locationName}, ${locationRegion}`,
    // city: locationName,
    // country: locationCountry,
    // }
    //   );
    //   if (res.data) {
    //     navigation.navigate('OtpScreen', {
    //       email: data.email,
    //     });
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     if (
    //       error.response.status === 409 &&
    //       error.response.data &&
    //       error.response.data.message
    //     ) {
    //       console.log('User with given email or phone already exists');
    //       showAlert('Error', ' utilisateur  déja crée');
    //     } else {
    //       showAlert('Error', error.response.data.message);
    //     }
    //   } else {
    //     showAlert('Error', 'Server error. Please try again later.');
    //     console.log(error);
    //   }
    // } finally {
    //   setLoading(false);
    // }
  };

  // if (loading) {
  //   return <Loading2 />;
  // }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="location-on" size={24} color="black" />
            {locationName && (
              <Text>
                {locationName}, {locationRegion}
              </Text>
            )}
          </View>
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
            {/* sexe and age Swipe */}
            <View>
              <View style={styles.textcontainer}>
                <Text style={styles.title}> Étape 2:</Text>
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
                  />
                </View>
              </View>
            </View>

            {/*Password and Confirm pwd */}
            <View>
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

            {/* UploadImage */}
            <View>
              <View style={styles.textcontainer}>
                <Text style={styles.title}>Dérniere étape:</Text>
                <Text style={styles.subtitle}>télecharger votre image:</Text>
              </View>
              <View style={{ marginVertical: '10%' }}>
                <ImagePi onImageSelected={handleImageSelected} />
              </View>
            </View>
          </Swiper>
        </View>
        <View style={styles.btnContainer}>
          <CustomBtn
            text={'Soumettre'}
            type="PRIMARY"
            onPress={handleSubmit(OnSignInPressed2)}
          />
        </View>
        <View style={styles.textbtnContainer}>
          <Text style={styles.text}>Vous avez déjà un compte ?</Text>
          <TouchableOpacity onPress={onLoginPressed}>
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
