import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import ScanQrScreen from '../Screens/ScanQrScreen/ScanQrScreen';
import { AuthContext } from '../context/AuthProvider';
import AddCoupons from '../Screens/AddCoupons/AddCoupons';
import { Colors } from '../constants/Colors';

const DrawerContent = (props) => {
  const authCtx = useContext(AuthContext);

  const handleLogout = () => {
    authCtx.logout();
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* <View style={styless.drawerHeader}>
        <Text style={styless.drawerHeaderText}>Options</Text>
      </View> */}

      <DrawerItemList
        {...props}
        itemStyle={styless.drawerItem}
        activeBackgroundColor="#E0E0E0"
        inactiveBackgroundColor="#F5F5F5"
      />

      <DrawerItem
        label="Déconnexion"
        onPress={handleLogout}
        icon={({ color, size }) => (
          <Icon name="log-out-outline" size={30} color={color} />
        )}
        style={styless.drawerItem}
        labelStyle={styless.drawerItemLabel}
      />
    </DrawerContentScrollView>
  );
};
const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: '#FBF5F5',
        inactiveTintColor: '#FBF5F5',
        activeBackgroundColor: '#FBF5F5',
        inactiveBackgroundColor: 'black',
        labelStyle: { fontSize: 16, marginLeft: -10 },
        headerShown: true,
        headerTitle: '',
        headerTintColor: Colors.background,
        drawerStyle: {
          backgroundColor: '#FBF5F5',
          width: '60%',
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Accueille"
        component={HomeScreen}
        options={{
          drawerLabel: 'Accueille',
          drawerIcon: () => (
            <Icon
              from="MaterialIcons"
              name="home-outline"
              size={30}
              color="black"
            />
          ),
          drawerItemStyle: { marginTop: '50%' },
        }}
      />

      <Drawer.Screen
        name="Scan"
        component={ScanQrScreen}
        options={{
          drawerLabel: ' Scanne  QR',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="qr-code-scanner" size={30} color="black" />
          ),
          drawerItemStyle: { marginTop: '30%', marginBottom: '30%' }, // Ajouter la propriété de marge ici
        }}
      />
      <Drawer.Screen
        name="AddCoupon"
        component={AddCoupons}
        options={{
          drawerLabel: 'Ajouter un coupon ',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="add" size={24} color="black" />
          ),
          drawerItemStyle: { marginBottom: '30%' }, // Ajouter la propriété de marge ici
        }}
      />
    </Drawer.Navigator>
  );
};

const styless = StyleSheet.create({
  drawerHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginBottom: '30%',
  },
  drawerHeaderText: {
    fontSize: 18,
    color: 'white',
  },
  drawerItem: {
    // marginTop: 30,
  },
  drawerItemLabel: {
    fontSize: 16,
  },
});

export default DrawerNavigation;

const styles = StyleSheet.create({});
