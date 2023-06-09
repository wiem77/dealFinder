import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { FontSize } from '../../constants/FontSize';
import { Colors } from '../../constants/Colors';
import { baseUrl } from '../../config/config';

import FourDigitInput from '../../components/otpCard/FourDigitInput';
import CustomBtn from '../../components/customBtn';

import ResendVerification from '../../components/resendEmailverif/ResendEmail';

const OtpScreen = ({ route }) => {
  const [showTimer, setShowTimer] = useState(false);
  const [otp, setotp] = useState('');
  const { email } = route.params;

  const navigation = useNavigation();

  const handleResendVerification = async (email) => {
    console.log(email);
    setShowTimer(true);
  };
  const handleCodeComplete = (value) => {
    setotp(value);
  };
  const getUserId = async (email) => {
    try {
      const response = await axios.get(`${baseUrl}/idUser/${email}`);

      return response.data.userId;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const verificationPressed = async () => {
    const userId = await getUserId(email);

    if (!userId) {
      Alert.alert('Attention', 'Email invalide.');
      return;
    }

    console.log(userId, otp);

    try {
      const response = await axios.post(`${baseUrl}/verifyEmail/${userId}`, {
        otp,
      });

      if (response.data) {
        console.log('success');
        navigation.navigate('SucessScreen');
      } else {
        Alert.alert('Attention', 'Code de vérification invalide.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Erreur',
        "Une erreur s'est produite lors de la vérification du code. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.topSection}>
          <View style={styles.iconBg}>
            <Image
              resizeMode="contain"
              source={require('../../assets/image/OTP.png')}
            />
          </View>
        </View>
        <View style={styles.bottomHalf}>
          <Text style={styles.pageTitle}>Vérification d'email</Text>
          <Text style={styles.infoText}>
            Veuillez vérifier l'adresse email suivante:
            <Text style={styles.emphasizeText}>{email}</Text>
          </Text>
          <FourDigitInput onComplete={handleCodeComplete} />
          <CustomBtn text={'Envoyer'} onPress={verificationPressed} />

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>
              Vous n'avez pas reçu l'e-mail ?
            </Text>
            <TouchableOpacity onPress={handleResendVerification}>
              <ResendVerification email={email} />
            </TouchableOpacity>
            {showTimer}
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default OtpScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  iconBg: {
    marginTop: '6%',
    width: '80%',
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomHalf: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '7%',
  },
  pageTitle: {
    fontFamily: 'poppins',
    fontSize: FontSize.large,
    fontWeight: '500',
    lineHeight: 20,
    paddingTop: '8%',
    paddingBottom: 10,
  },
  infoText: {
    fontSize: FontSize.medium,
    fontFamily: 'poppins',
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.text,
    paddingBottom: 30,
  },
  emphasizeText: {
    fontSize: FontSize.medium,
    fontFamily: 'poppins',
    fontWeight: '500',

    color: Colors.red,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  resendText: {
    fontSize: FontSize.small,
    color: Colors.text,
    fontWeight: '500',
  },
});
