import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize'
const StoreScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity style={styles.backButton}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.headerImageContainer}>
        <Image
          source={require('../../assets/image/Store1.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.storeName}>Store1</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Lorem Ipsum is simply dummy text of the print and typesetting
            industry.
          </Text>
          <View style={styles.starRatingContainer}></View>
        </View>
        <View style={styles.scrollViewContainer}>
          <ScrollView>
            <Text style={styles.description}>
              Lorem Ipsum is simply dummy text of the print and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a bad galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting.
            </Text>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <Text
            style={{ color: Colors.text, fontWeight: 'bold', fontSize: 28 }}
          >
            $ 500
          </Text>
          <TouchableOpacity
            onPress={() => console.log('Cart')}
            style={{
              backgroundColor: Colors.green,
              opacity: 0.6,
              shadowColor: Colors.green,
              shadowRadius: 25,
              shadowOffset: { width: 0, height: 15 },
              shadowOpacity: 0.5,
              
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
   
    borderColor: Colors.text,
    borderRadius: '2%',
    padding: '2%',
    marginLeft: '5%',
    marginTop: height * 0.02,
  },
  headerImage: {
    marginTop:'-30%',
    width: '100%',
    height: width,
  },
  contentContainer: {
    borderTopLeftRadius: '20%',
    borderTopRightRadius: '20%',
    backgroundColor: '#FBF5F5',
    paddingHorizontal: '5%',
    paddingVertical: height * 0.05,
    marginTop: -width * 0.35,
    flex: 1,
  },
  storeName: {
    color: Colors.text,
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginTop: height * 0.02,
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  descriptionText: {
    color: Colors.text,
    fontWeight: '600',
    flex: 0.8,
    fontSize: width * 0.04,
  },
  starRatingContainer: {
    flex: 0.2,
  },
  scrollViewContainer: {
    height: height * 0.2,
    marginTop: height * 0.02,
  },
  description: {
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: height * 0.03,
    fontSize: width * 0.04,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: height * 0.03,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: '2%',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
  },
  addToCartButtonText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});
