import { StyleSheet, Text, View, Image } from 'react-native';

import CustomBtn from '../../components/customBtn/CustomBtn';
import { FontSize } from '../../constants/FontSize';
import { Colors } from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import Loading from '../../components/loading/Loading';

const WelcomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [locationRegion, setLocationRegion] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const OnLoginPressed = () => {
    navigation.navigate('LoginIn');
  };

  const OnSignUpPressed = () => {
    navigation.navigate('SignUp');
  };
  const guestPressed = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      setLoading(false);
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

    axios
      .post(`${baseUrl}/guest/newGuest`, {
        type: 'Point',
        coordinates: [location.coords.longitude, location.coords.latitude],
        formattedAddress: `${geocode[0].city}, ${geocode[0].region}`,
        city: geocode[0].city,
        country: geocode[0].country,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        navigation.navigate('Home');
      });
  };

  if (loading) {
    return <Loading />;
  }
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
          <CustomBtn text={'Se Connecter '} onPress={OnLoginPressed} />
          <CustomBtn
            text={'Continuer en tant que visiteur'}
            onPress={guestPressed}
            type="SECONDARY"
          />
          <CustomBtn
            text={'crée un compte  '}
            onPress={OnSignUpPressed}
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
    backgroundColor: Colors.backgroundWhite,
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
