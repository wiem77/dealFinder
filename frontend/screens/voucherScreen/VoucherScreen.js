import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';

import { baseUrl } from '../../config/config';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import ViewMoreText from 'react-native-view-more-text';

import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';

import CustomBtn from '../../components/customBtn/CustomBtn';
import CustomCard from '../../components/customCard/CustomCard';
import Loading from '../../components/loading/Loading';
import { Button } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
const showAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    { cancelable: false }
  );
};
const VoucherScreen = ({ route }) => {
  const { selectedVoucher, selectedStore } = route.params;
  console.log('selectedselectedStore', selectedStore);
  const [isExpanded, setIsExpanded] = useState(false);
  const [qrCodeData, setQrCodeData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const user = authCtx.user;
  const [hasToken, setHasToken] = useState(false);
  if (token != null) {
    console.log('test');
  } else {
    console.log('test2', token);
  }
  const handelBackPressed = () => {
    navigation.goBack();
  };
  useEffect(() => {
    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
  }, [token]);
  const handleReservationPressed = async () => {
    setIsLoading(true);
    if (token) {
      const voucherId = selectedVoucher._id;
      const userId = user._id;
      console.log(voucherId);
      try {
        const response = await axios.post(
          `${baseUrl}/reservation/user/${userId}/vouchers/${voucherId}`,
          {
            headers: {
              'x-access-token': token,
            },
          }
        );
        setQrCodeData(response?.data?.data);
        const qrData = response?.data?.data;

        Alert.alert(
          'Félicitations',
          "Vous avez réservé votre coupon. Utilisez-le avant l'expiration des 48 heures",
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('QrCode', { qrData }),
              style: 'destructive',
            },
          ]
        );
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Erreur inconnue';
        showAlert('Reservastion invalide', errorMessage);
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert(
        'Non connecté',
        'Vous devez vous connecter ou créer un compte pour réserver un coupon.',
        [
          {
            text: 'Créer un compte',
            onPress: () => navigation.navigate('SignUp'),
            style: 'destructive',
          },
          {
            text: 'Se connecter',
            onPress: () => navigation.navigate('LoginIn'),
          },
          {
            text: 'Continuer Votre Visite',
            onPress: () => console.log('guest'),
          },
        ]
      );
      setIsLoading(false);
    }
  };

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderViewMore = (onPress) => (
    <Text style={styles.seeMoreText} onPress={onPress}>
      Voir plus
    </Text>
  );

  const renderViewLess = (onPress) => (
    <Text style={styles.seeMoreText} onPress={onPress}>
      Voir moins
    </Text>
  );
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <TouchableOpacity>
            <AntDesign
              name="arrowleft"
              size={30}
              color="black"
              onPress={handelBackPressed}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/cozy.png')}
            style={{ width: 360, height: 260, resizeMode: 'contain' }}
          />
        </View>
        <View style={styles.contentContainer}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.voucherName}>{selectedVoucher.name_V}</Text>
            <Text style={styles.discountName}>
              Remise {selectedVoucher.discount} %
            </Text>
          </View>
          <View>
            <Text style={styles.detailles}>Détailles :</Text>
            <Text style={{}}>{selectedVoucher.description}</Text>
          </View>
          <ViewMoreText
            style={{ marginTop: '6%', marginBottom: '6%' }}
            numberOfLines={2}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}
            onAfterCollapse={toggleIsExpanded}
            onAfterExpand={toggleIsExpanded}
          >
            <Text style={styles.description}></Text>
          </ViewMoreText>
          <View style={{ marginTop: '8%', marginBottom: '6%' }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.nbVoucher}>Coupons disponible : </Text>
              <Text style={{ paddingHorizontal: 10, fontSize: 23 }}>
                {selectedVoucher.available_vouchers}
                <MaterialCommunityIcons
                  name="tag-text"
                  size={25}
                  color="black"
                  style={{ paddingHorizontal: 10 }}
                />
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '6%',
                marginBottom: '6%',
              }}
            >
              <Text style={styles.nbVoucher}>Valable jusqua : </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 18,
                  textDecorationLine: 'underline',
                  fontStyle: 'italic',
                }}
              >
                {selectedVoucher.validity_date.substring(0, 10)}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: '8%', marginBottom: '6%' }}>
            {isLoading ? (
              <Button
                title="Solid"
                type="solid"
                loading
                buttonStyle={{
                  backgroundColor: Colors.background,
                  borderRadius: 8,
                  borderWidth: 1,
                  width: '100%',
                  height: '10%',
                  padding: 20,
                  marginVertical: 6,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : (
              <CustomBtn
                style={{ marginTop: '6%' }}
                text={'Reserver votre coupon'}
                onPress={handleReservationPressed}
                nameIcon={'cart-outline'}
                sizeIcon={24}
                colorIcon={Colors.white}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default VoucherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF5F5',
    // paddingHorizontal: 20,
    paddingTop: 30,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '1%',
  },
  storeImage: {
    // width:'155%',
    // height: height/3,
    // resizeMode: 'contain',
  },
  contentContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    paddingHorizontal: '10%',
    paddingVertical: height * 0.05,
    marginTop: -width * 0.48,
    width: '100%',
    flex: 1,
    // alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  voucherName: {
    marginVertical: '6%',
    color: Colors.black,
    fontSize: width * 0.06,
    marginHorizontal: -10,
    fontWeight: '400',
    marginTop: height * 0.0,
    fontStyle: 'italic',
  },
  discountName: {
    color: Colors.red,
    fontSize: width * 0.05,
    marginHorizontal: -10,
    fontWeight: '400',
    marginTop: height * 0.0,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  detailles: {
    color: Colors.red,
    fontSize: width * 0.05,
    marginHorizontal: -10,
    fontWeight: '400',
    marginTop: height * 0.0,
    fontFamily: 'poppins',
    marginBottom: '3%',
    marginTop: '6%',
  },
  seeMoreText: {
    color: Colors.lightRed2,
    fontFamily: 'poppins',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    letterSpacing: 1,
    fontFamily: 'inter',
  },
  nbVoucher: {
    color: Colors.red,
    fontSize: width * 0.04,

    fontWeight: '400',
    marginTop: height * 0.0,
    fontFamily: 'poppins',
  },
});
