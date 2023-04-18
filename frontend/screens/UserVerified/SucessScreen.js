import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import image from '../../assets/image/Login.jpg';
import { FontSize } from '../../constants/FontSize';
import { Colors } from '../../constants/Colors';
import CustomBtn from '../../components/customBtn/CustomBtn';
const SucessScreen = () => {
  const navigation = useNavigation();
  const { height, width } = Dimensions.get('window');
  const LoginIn = () => {
    navigation.navigate('LoginIn');
  };
  return (
    <SafeAreaView style={{ height: height, width: width }}>
      <View style={styles.container}>
        <Image style={styles.image} resizeMode="contain" source={image} />
        <Text style={styles.text}>
          Email confirmé avec succès! Connectez-vous dès maintenant pour
          consulter nos offres.
        </Text>
        <CustomBtn text={'Se Connecter'} onPress={LoginIn} type='REDBTN' nameIcon={"log-in-outline"} sizeIcon={20} colorIcon={Colors.white} />

        {/* <TouchableOpacity style={styles.button} onPress={SignIn}>
          <Ionicons name="log-in-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default SucessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '6%',
  },
  image: {
    height: '50%',
    width: '100%',
  },
  text: {
    fontSize: FontSize.medium,
    fontFamily: 'comfortaa',
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
    marginVertical: '6%',
  },
  button: {
    backgroundColor: Colors.red,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
