import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Alert,
  Image,
} from 'react-native';
import React, { useContext, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../../config/config';

import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import Custominput from '../../components/customInput/Custominput';
import CustomBtn from '../../components/customBtn/CustomBtn';
import logo from '../../assets/image/DealFinderRed.png';
import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from '../../context/AuthProvider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AuthContext } from '../../context/AuthProvider';
const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  // useEffect(() => {
  //   console.log('User:', user);
  // }, [user]);
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
      console.log(data);
      const accesscode = data.accesscode;

      await login(accesscode);
      console.log('Sign in successful');
      // navigation.navigate('ScanQrScreen');
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
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <View style={styles.WelcomeContainer}>
          <Text style={styles.subtitle}>
            Entrez votre Code d'inscription pour vous connecter.
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <Custominput
            iconName="lock"
            placeHolder="Code "
            name={'accesscode'}
            control={control}
            secureTextEntry={true}
            rules={{
              required: "le code d'acces et requis",
            }}
          />

          <CustomBtn
            style={{ marginTop: 50 }}
            text={'Se Connecter '}
            type="PRIMARY"
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
    backgroundColor: 'white',
  },
  content: {
    marginTop: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('10%'),
    marginBottom: hp('5%'),
  },
  logo: {
    width: wp('60%'),
    height: hp('25%'),
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
    color: Colors.black,
  },
});
