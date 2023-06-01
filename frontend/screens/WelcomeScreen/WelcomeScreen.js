import { StyleSheet, Text, View, Image } from 'react-native';

import CustomBtn from '../../components/customBtn/CustomBtn';
import { FontSize } from '../../constants/FontSize';
import { Colors } from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import Loading from '../../components/loading/Loading';
import { LocationContext } from '../../context/LocationProvider';

const WelcomeScreen = () => {
  const {
    setLocation,
    setLocationName,
    setLocationRegion,
    setAltitude,
    setLongitude,
  } = useContext(LocationContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const handleLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      setLoading(false);
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    console.log('location', currentLocation);

    let { latitude, longitude, altitude } = currentLocation.coords;

    let geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    // let { city, region } = geocode[0];
    // console.log(city, region);
    // setLocationName(city);
    // setLocationRegion(region);
    // setAltitude(altitude);
    // setLongitude(longitude);

    setLoading(false);
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  const OnLoginPressed = () => {
    handleLocationPermission();
    navigation.navigate('LoginIn');
  };

  const OnSignUpPressed = () => {
    handleLocationPermission();
    navigation.navigate('SignUp');
  };

  const guestPressed = () => {
    handleLocationPermission();
    navigation.navigate('Home');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FBF5F5',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={styles.headerContainer}>
        <View style={{ alignItems: 'center', marginTop: 1 }}>
          <Image
            resizeMode="contain"
            source={require('../../assets/image/DealFinderRed.png')}
            style={styles.logo}
          />
          <Text style={styles.subtitle}>
            Découvrez les promotions locales qui correspondent à vos intérêts.
          </Text>
        </View>

        <View style={styles.btnContainer}>
          <CustomBtn
            text={'Se Connecter '}
            onPress={OnLoginPressed}
            type="SECONDARY"
          />
          <CustomBtn
            text={"Explorer en tant qu'invité"}
            onPress={guestPressed}
            type="REDBTN4"
          />
          <CustomBtn
            text={'Crée un compte  '}
            onPress={OnSignUpPressed}
            type="SECONDARY"
          />
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.backgroundWhite,
    // marginTop: '50%',
    // width: wp('84%'),
    // left: wp('7%'),
    // top: hp('22.2%'),
    // position: 'absolute',
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
