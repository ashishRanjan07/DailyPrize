import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/auth/Splash';
import Registration from '../screens/auth/Registration';
import Welcome from '../screens/auth/Welcome';
import Login from '../screens/auth/Login';
import BottomNavigation from './BottomNavigation';
import AddCoupon from '../screens/app/AddCoupon';
import ScratchCardContainer from '../screens/app/ScratchCardContainer';
import Refer from '../screens/app/Refer';
import PrivacyPolicy from '../screens/app/PrivacyPolicy';
import TermAndCondition from '../screens/app/TermAndCondition';
import ContactUs from '../screens/app/ContactUs';
import AddRoom from '../screens/app/AddRoom';
import CoinHistory from '../screens/app/CoinHistory';
import Notification from '../screens/app/Notification';
import DepositHistory from '../screens/app/DepositHistory';
import WithDrawalHistory from '../screens/app/WithDrawalHistory';
import AvailableRoomToJoin from '../screens/app/AvailableRoomToJoin';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Refer" component={Refer} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="Add Coupon" component={AddCoupon} />
      <Stack.Screen name="Scratch Card" component={ScratchCardContainer} />
      <Stack.Screen name="Privacy policy" component={PrivacyPolicy} />
      <Stack.Screen name="Terms And Conditions" component={TermAndCondition} />
      <Stack.Screen name="Contact us" component={ContactUs} />
      <Stack.Screen name="Join Room List" component={AddRoom} />
      <Stack.Screen name="Coin History" component={CoinHistory} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="WithDrawal History" component={WithDrawalHistory} />
      <Stack.Screen name="Deposit History" component={DepositHistory} />
      <Stack.Screen name="Available Room To Join" component={AvailableRoomToJoin} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
