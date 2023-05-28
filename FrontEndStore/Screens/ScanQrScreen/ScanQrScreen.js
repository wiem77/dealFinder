import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import CustomBtn from '../../components/customBtn/CustomBtn';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { AuthContext } from '../../context/AuthProvider';

import { Icon } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ScanQrScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const [reservationCode, setReservationCode] = useState();
  const [name_v, setName_v] = useState();
  const [validity_date, setValidity_date] = useState();
  const [discount, setDiscount] = useState();
  const [available, setAvailable] = useState();
  const token = authCtx.token;
  const store = authCtx.store;
  const handleVerifyCode = async ({ resCode }) => {
    console.log(store);
    const store_id = store._id;
    console.log('store_id', store._id);
    setLoading(true);

    console.log(resCode);
    let isAlertDisplayed = false;
    try {
      if (resCode === undefined) {
        console.log('nnoooo', resCode);
        Alert.alert('Attention', 'Code Invalide ');
        isAlertDisplayed = true;
      } else {
        const response = await axios.get(
          `${baseUrl}/reservation/verify/${resCode}/${store_id}`,
          {
            headers: {
              'x-access-token': token,
            },
          }
        );

        console.log('response.data', response.data);
        const data = response.data;
        if (data) {
          console.log('success');
          navigation.navigate('Success', { data: data });
        } else {
          Alert.alert('Attention', 'Code Invalide ');
          isAlertDisplayed = true;
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Erreur',
        // "Une erreur s'est produite lors de la vérification du code. Veuillez rescanner le Qr-Code."
        error.message
      );
      isAlertDisplayed = true;
    }

    setTimeout(() => {
      setLoading(false);

      if (!isAlertDisplayed) {
        alert(`Les données suivantes ont été numérisées et vérifiées: ${text}`);
      }
    }, 3000);
  };

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted');
    })();
  };
  useEffect(() => {
    askForCameraPermission();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    console.log(data);
    setScanned(true);
    const newData = JSON.parse(data);
    console.log('newData', newData);
    setText(data);
    setReservationCode(newData.reservationCode);
    setName_v(newData.voucher.name_v);
    const validityDate = new Date(newData.voucher.validity_date)
      .toISOString()
      .split('T')[0];
    setValidity_date(validityDate);
    setDiscount(newData.voucher.discount);
    const availability = newData.voucher.is_available
      ? 'Disponible'
      : 'Non disponible';
    setAvailable(availability);

    console.log(text);
  };

  console.log(reservationCode, name_v, validity_date, discount, available);

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting For camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text>Pas d'accés aux camera </Text>
        <Button
          title={'autoriser la camera'}
          onPress={() => askForCameraPermission}
        />
      </View>
    );
  }
  if (scanned) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.tableContainer}>
          <View style={styles.scanResultItem}>
            <Text style={styles.scanResultLabel}>Réservation :</Text>
            <Text style={styles.scanResultValue}>{reservationCode}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.scanResultItem}>
            <Text style={styles.scanResultLabel}>Voucher :</Text>
            <Text style={styles.scanResultValue}>{name_v}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.scanResultItem}>
            <Text style={styles.scanResultLabel}>Date de validité :</Text>
            <Text style={styles.scanResultValue}>{validity_date}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.scanResultItem}>
            <Text style={styles.scanResultLabel}>Remise :</Text>
            <Text style={styles.scanResultValue}>{discount}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.scanResultItem}>
            <Text style={styles.scanResultLabel}>Disponibilité :</Text>
            {available ? (
              <Icon
                name="check-circle"
                type="font-awesome"
                color="green"
                size={18}
              />
            ) : (
              <Icon
                name="times-circle"
                type="font-awesome"
                color="red"
                size={18}
              />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.container_GREENBTN}
          onPress={() => handleVerifyCode({ resCode: text })}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size="large" color={Colors.text} />
              <Text style={styles.loadingText}>Vérification en cours...</Text>
            </View>
          ) : (
            <Text style={styles.verifyBtnText}>Vérifier le code</Text>
          )}
        </TouchableOpacity>

        <View style={{ marginBottom: '50%', marginTop: 1 }}>
          <CustomBtn
            style={styles.scanAgainBtn}
            text={'Scanner à nouveau'}
            onPress={() => setScanned(false)}
            type="REDBTN"
            nameIcon={'barcode-outline'}
            sizeIcon={20}
            colorIcon={Colors.white}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>

          <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.barcodeScanner}
            />
          </View>
        </View>

        <Text style={styles.maintext}>Scanner le code QR pour commencer</Text>
      </SafeAreaView>
    );
  }
};
export default ScanQrScreen;

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  barcodebox: {
    width: width * 0.8,
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  barcodeScanner: {
    width: '100%',
    height: '100%',
  },
  maintext: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.text,
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },

  container_GREENBTN: {
    backgroundColor: Colors.green,
    width: wp('40%'),
    height: wp('12%'),
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  verifyBtnText: {
    color: Colors.white,
    marginLeft: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scanResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scanResultLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  scanResultValue: {},
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 5,
  },
});
