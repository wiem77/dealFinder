import { StyleSheet } from 'react-native';
import React, { useContext } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/homeScreen/HomeScreen';
import Favorite from '../screens/favoriteScreen/Favorite';
import MapScreen from '../screens/mapScreen/MapScreen';
import ReservationScreen from '../screens/reservationScreen/ReservationScreen';

import { AuthContext } from '../context/AuthProvider';
import { Colors } from '../constants/Colors';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const user = authCtx.user;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          marginBottom: '2%',
          marginTop: '2%',
          borderRadius: 20,
          height: 70,
          ...styles.shadow,
        },
        tabBarShowLabel: false,
        tabBarIconStyle: styles.tabBarIconStyle,
      }}
    >
      <Tab.Screen
        component={HomeScreen}
        name="HomeUser"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={20}
              color={focused ? Colors.darkred : 'grey'}
            />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={20}
              color={focused ? Colors.darkred : 'grey'}
            />
          ),
          tabBarLabel: 'Favorites',
        }}
      />
      {token && user ? (
        <Tab.Screen
          name="Cart"
          component={ReservationScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? 'cart' : 'cart-outline'}
                size={20}
                color={focused ? Colors.darkred : 'grey'}
              />
            ),
            tabBarLabel: 'Cart',
          }}
        />
      ) : null}
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name={focused ? 'map-marked' : 'map-marked-alt'}
              size={20}
              color={focused ? Colors.darkred : 'grey'}
            />
          ),
          tabBarLabel: 'Map',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
    shadowColor: '#000',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabBarIconStyle: {
    flex: 1,
    marginTop: 15,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabNavigation;
