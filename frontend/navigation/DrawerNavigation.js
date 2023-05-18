import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { AuthContext } from '../context/AuthProvider';
const Drawer = createDrawerNavigator();
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import ContactScreen from '../screens/contactScreen/ContactScreen';
import TabNavigation from './TabNavigtaion';
const DrawerContent = (props) => {
  const authCtx = useContext(AuthContext);

  const handleLogout = () => {
    authCtx.logout();
  };
  return (
    <DrawerContentScrollView {...props}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          marginBottom: 15,
          marginTop: 15,
        }}
      >
        Options
      </Text>

      <DrawerItemList {...props} />

      <DrawerItem
        label="Déconnexion"
        onPress={handleLogout}
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        labelStyle: { fontSize: 16 },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigation}
        options={{
          drawerLabel: 'Accueil',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          drawerLabel: 'Historique',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="menu" size={24} color="black" />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profil',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="ios-person-circle-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          drawerLabel: 'Nous contacter',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

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
