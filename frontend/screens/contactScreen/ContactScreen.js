import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const ContactScreen = () => {
  const handleOpenWebsite = () => {
    Linking.openURL('https://www.example.com'); // Remplacez l'URL par votre propre site web
  };

  const handleContactAdmin = () => {
    // Mettez en place votre logique pour contacter l'administrateur
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Contactez-nous</Text> */}

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/image/DealFinderRed.png')}
        />
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Ionicons name="call-outline" size={40} color={Colors.background} />
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Numéro de télephone:</Text>
            <TouchableOpacity onPress={handleContactAdmin}>
              <Text style={styles.text}>+216-77-888-999</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tableRow}>
          <Ionicons name="mail-outline" size={40} color={Colors.background} />
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Pour les partenariats:</Text>
            <TouchableOpacity onPress={handleContactAdmin}>
              <Text style={styles.text}>DealFinderpartnership@example.com</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleOpenWebsite}>
        <View style={styles.websiteRow}>
          <Ionicons name="globe-outline" size={40} color={Colors.background} />
          <Text style={styles.websiteLink}>
            Visitez notre site web (Site officiel)
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          Pour signaler un problème, veuillez envoyer un mail à notre service
          d'assistance. Pour les partenariats, veuillez nous appeler.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF5F5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontFamily: 'comfortaa',
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.black,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: '90%',
    marginTop: 25,
    marginBottom: 25,
    resizeMode: 'contain',
  },
  table: {
    marginVertical: 20,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555555',
    fontFamily: 'poppins',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'comfortaa',
    fontWeight: 'bold',
  },
  websiteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  websiteLink: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  noteContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  noteText: {
    fontSize: 18,
    color: '#808080',
    textAlign: 'center',
  },
});

export default ContactScreen;
