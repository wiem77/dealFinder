import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import ScanQrScreen from '../Screens/ScanQrScreen/ScanQrScreen';
import { AuthContext } from '../context/AuthProvider';
import DrawerNavigation from './DrawerNavigation';
import { SpeedDialContent } from '../components/SpeedDeal/SpeedDeal';
import AddCoupons from '../Screens/AddCoupons/AddCoupons';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';

const StoreStack = createNativeStackNavigator();

const StoreNavigation = () => {
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const SpeedDialComponent = () => {
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

  return (
    <StoreStack.Navigator screenOptions={{ headerShown: false }}>
      <StoreStack.Screen name="LoginStore" component={LoginScreen} />
      <StoreStack.Screen name="SpeedDeal" component={SpeedDialComponent} />
      <StoreStack.Screen name="Home" component={HomeScreen} />
      {/* <StoreStack.Screen name="Drawer" component={DrawerNavigation} /> */}
      <StoreStack.Screen name="AddCoupon" component={AddCoupons} />
      <StoreStack.Screen name="ScanQr" component={ScanQrScreen} />
    </StoreStack.Navigator>
  );
};

const AuthNavigation = () => {
  const { isLoading } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <StoreNavigation />
    </NavigationContainer>
  );
};
export default AuthNavigation;
