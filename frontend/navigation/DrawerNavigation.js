import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { AuthContext } from '../context/AuthProvider';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import ContactScreen from '../screens/contactScreen/ContactScreen';
import TabNavigation from './TabNavigtaion';
import { CategoryContext } from '../context/CtegoryProvider';
import { StoreContext, StoresProvider } from '../context/StoreProvider';
import StoreImages from '../screens/TestScreen';

const DrawerContent = (props) => {
  const authCtx = useContext(AuthContext);
  const catCtx = useContext(CategoryContext);
  const storeCtx = useContext(StoreContext);
  const handleLogout = () => {
    authCtx.logout();
    storeCtx.RemoveStore();
    catCtx.RemoveCat();
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styless.drawerHeader}>
        <Text style={styless.drawerHeaderText}>Options</Text>
      </View>

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
        headerTintColor: 'red',
        drawerStyle: {
          backgroundColor: '#FBF5F5',
          width: 240,
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigation}
        options={{
          drawerLabel: 'Accueil',
          drawerIcon: () => (
            <Icon
              from="MaterialIcons"
              name="home-outline"
              size={30}
              color="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          drawerLabel: 'Historique',
          drawerIcon: ({ color, size }) => (
            <Icon name="menu" size={30} color="black" />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profil',
          drawerIcon: ({ color, size }) => (
            <Icon name="ios-person-circle-outline" size={30} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          drawerLabel: 'Nous contacter',
          drawerIcon: ({ color, size }) => (
            <Icon name="information-circle-outline" size={30} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="StoreImages"
        component={StoreImages}
        options={{
          drawerLabel: 'Storeimage',
          drawerIcon: ({ color, size }) => (
            <Icon name="information-circle-outline" size={30} color="black" />
          ),
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
    marginBottom: 15,
  },
  drawerHeaderText: {
    fontSize: 18,
    color: 'white',
  },
  drawerItem: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 10,
  },
  drawerItemLabel: {
    fontSize: 16,
  },
});

// const DrawerNavigation = () => {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen
//         name="History"
//         component={HistoryScreen}
//         options={{
//           drawerLabel: 'Historique',
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="menu" size={size} color={color} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           drawerLabel: 'Profile',
//           drawerIcon: ({ color, size }) => (
//             <Ionicons
//               name="ios-person-circle-outline"
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Contact"
//         component={ProfileScreen}
//         options={{
//           drawerLabel: 'Contacter Nous',
//           drawerIcon: ({ color, size }) => (
//             <Ionicons
//               name="information-circle-outline"
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

export default DrawerNavigation;

const styles = StyleSheet.create({});
