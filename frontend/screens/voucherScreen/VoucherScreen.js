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
  const [isExpanded, setIsExpanded] = useState(false);
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
      <View style={styles.contentContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.voucherName}>Promo shoses</Text>
          <Text style={styles.discountName}>PDiscount 15%</Text>
        </View>
        <View
         
        >
          <Text style={styles.detailles}>Détailles</Text>
        </View>
        <ViewMoreText
          numberOfLines={1}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          onAfterCollapse={toggleIsExpanded}
          onAfterExpand={toggleIsExpanded}
        >
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            cursus mi vitae tellus fringilla, nec aliquam nulla fermentum. Sed
            vehicula, lectus eget lacinia euismod, erat purus gravida libero, in
            euismod purus urna at mauris. Suspendisse suscipit, odio a
            ullamcorper faucibus, augue risus pretium felis, sit amet tristique
            velit velit sit amet metus.
          </Text>
        </ViewMoreText>
      </View>
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
    marginVertical: '2%'
  },
});
