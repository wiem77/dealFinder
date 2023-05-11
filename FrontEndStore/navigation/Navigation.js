import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const StoreStack = createNativeStackNavigator();
const StoreNavigation = () => {
  return (
    <View>
      <Text>navigation</Text>
    </View>
  );
};
const Navigation = () => {
  return <NavigationContainer></NavigationContainer>;
};
export default Navigation;
