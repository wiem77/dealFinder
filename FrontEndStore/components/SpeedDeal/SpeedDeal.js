import { SpeedDial } from 'react-native-elements';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../context/AuthProvider';

import { Colors } from '../../constants/Colors';

export const SpeedDialContent = (props) => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const handleLogout = () => {
    authCtx.logout();
  };
  const handleNavigateHome = () => {
    navigation.navigate('Home');
  };
  const handleNavigateScanQr = () => {
    navigation.navigate('ScanQr');
  };
  const handleNavigateAddCoupon = () => {
    navigation.navigate('AddCoupon');
  };
  return (
    <>
      <SpeedDial
        isOpen={props.isOpen}
        onOpen={props.onOpen}
        onClose={props.onClose}
        icon={{ name: 'menu', color: 'black' }}
        openIcon={{ name: 'close', color: 'black' }}
        buttonStyle={{ backgroundColor: '#9f1239' }}
      >
        <SpeedDial.Action
          icon={{ name: 'home', color: 'black' }}
          title="Accueil"
          onPress={handleNavigateHome}
          buttonStyle={{ backgroundColor: '#fecaca' }}
        />
        <SpeedDial.Action
          icon={{ name: 'qr-code-scanner', color: 'black' }}
          title="Scanner un Coupon"
          onPress={handleNavigateScanQr}
          buttonStyle={{ backgroundColor: '#fecaca' }}
        />
        <SpeedDial.Action
          icon={{ name: 'add', color: 'black' }}
          title="Ajouter un Nouveau coupon"
          onPress={handleNavigateAddCoupon}
          buttonStyle={{ backgroundColor: '#fecaca' }}
        />
        <SpeedDial.Action
          icon={{ name: 'logout', color: 'black' }}
          title="Déconnexion"
          onPress={handleLogout}
          buttonStyle={{ backgroundColor: '#fecdd3' }}
        />
      </SpeedDial>
    </>
  );
};
export const SpeedDialComponent = () => {
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  const handleLogout = () => {
    authCtx.logout();
  };

  return (
    <SpeedDialContent
      isOpen={speedDialOpen}
      onOpen={() => setSpeedDialOpen(true)}
      onClose={() => setSpeedDialOpen(false)}
    />
  );
};
