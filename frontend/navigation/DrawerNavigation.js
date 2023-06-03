import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import ContactScreen from '../screens/contactScreen/ContactScreen';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import TabNavigation from './TabNavigtaion';

import { AuthContext } from '../context/AuthProvider';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';

const DrawerContent = (props) => {
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const authCtx = useContext(AuthContext);

  const handleLogout = () => {
    authCtx.logout();
    clearAsyncStorage;
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
  const [hasToken, setHasToken] = React.useState(false);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const user = authCtx.user;
  const Drawer = createDrawerNavigator();

  React.useEffect(() => {
    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
  }, [token]);

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
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
      })}
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
          drawerItemStyle: { marginTop: '20%' },
        }}
      />
      {hasToken && (
        <Drawer.Screen
          name="History"
          component={HistoryScreen}
          options={{
            drawerLabel: 'Historique',
            drawerIcon: ({ color, size }) => (
              <Icon name="menu" size={30} color="black" />
            ),
            drawerItemStyle: { marginTop: '20%' },
          }}
        />
      )}

      {hasToken && (
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerLabel: 'Profil',
            drawerIcon: ({ color, size }) => (
              <Icon name="ios-person-circle-outline" size={30} color="black" />
            ),
            drawerItemStyle: { marginTop: '20%' },
          }}
        />
      )}

      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          drawerLabel: 'Nous contacter',
          drawerIcon: ({ color, size }) => (
            <Icon name="information-circle-outline" size={30} color="black" />
          ),
          drawerItemStyle: { marginTop: '20%' },
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
