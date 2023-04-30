import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import ViewMoreText from 'react-native-view-more-text';
import CustomBtn from '../../components/customBtn/CustomBtn';
const { width, height } = Dimensions.get('window');

const VoucherScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/image/Store1.png')}
          style={styles.storeImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}></View>
    </View>
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
    backgroundColor:Colors.white,
    paddingHorizontal: '10%',
    paddingVertical: height * 0.05,
    marginTop: -width * 0.48,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity:1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 15,
      },
    }),
  },
});
