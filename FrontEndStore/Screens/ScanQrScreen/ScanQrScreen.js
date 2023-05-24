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
import { SpeedDialComponent } from '../../components/SpeedDeal/SpeedDeal';
const ScanQrScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
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
    backgroundColor: Colors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
});
