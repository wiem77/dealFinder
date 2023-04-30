import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';
import { Ionicons, FontAwesome,FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import Search from '../screens/searchScreen/Search';
import Favorite from '../screens/favoriteScreen/Favorite';
import CartScreen from '../screens/cartScreen/CartScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import MapScreen from '../screens/mapScreen/MapScreen';
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
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
      <Tab.Screen
        name="Cart"
        component={CartScreen}
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

export default TabNavigation;

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
    shadowColor: '#000',
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
