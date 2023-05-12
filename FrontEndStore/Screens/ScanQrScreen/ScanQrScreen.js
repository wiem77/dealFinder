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
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import CustomBtn from '../../components/customBtn/CustomBtn';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseUrl } from '../../config/config';
const ScanQrScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState();

  const [loading, setLoading] = useState(false);

  const handleVerifyCode = async ({ resCode }) => {
    setLoading(true);
    let isAlertDisplayed = false;
    try {
      if (resCode === undefined) {
        console.log('nnoooo', resCode);
        Alert.alert('Attention', 'Code Invalide ');
        isAlertDisplayed = true;
      } else {
        const response = await axios.get(
          `${baseUrl}/reservation/verify/${resCode}`
        );
        console.log('response.data', response.data);
        const data=response.data;
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
        "Une erreur s'est produite lors de la vérification du code. Veuillez rescanner le Qr-Code."
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
    const newData = data.replace(/"/g, '');
    console.log('newData', newData);
    setText(newData);
    console.log(text);
  };

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
        <View style={styles.scanResultContainer}>
          <View style={styles.scanResultBox}>
            <Text style={styles.scanResultText}>{text}</Text>
          </View>
          <TouchableOpacity
            style={styles.verifyBtn}
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
        </View>
        <CustomBtn
          text={'Scanner à nouveau'}
          onPress={() => setScanned(false)}
          type="REDBTN"
          nameIcon={'barcode-outline'}
          sizeIcon={20}
          colorIcon={Colors.white}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.barcodeScanner}
          />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height / 2.5,
    width: width / 1.5,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  barcodeScanner: {
    height: height / 2.5,
    width: width / 1.5,
  },
  verifyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  verifyBtnText: {
    color: Colors.green,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 10,
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.text,
    marginTop: 10,
    fontSize: 16,
  },
});
