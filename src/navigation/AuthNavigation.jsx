import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name='Splash' component={Splash}/>
    <Stack.Screen name='Registration' component={Registration}/>
    <Stack.Screen name='Welcome' component={Welcome}/>
    <Stack.Screen name='Login' component={Login}/>
    <Stack.Screen name='Refer' component={Refer} options={{headerShown:true}}/>
    <Stack.Screen name='BottomNavigation' component={BottomNavigation}/>
    <Stack.Screen name='Add Coupon' component={AddCoupon} options={{headerShown:true}}/>
    <Stack.Screen name='Scratch Card' component={ScratchCardContainer} options={{headerShown:true}}/>
    <Stack.Screen name='Privacy policy' component={PrivacyPolicy} options={{headerShown:true}}/>
    <Stack.Screen name='Terms And Conditions' component={TermAndCondition} options={{headerShown:true}}/>
    <Stack.Screen name='Contact us' component={ContactUs} options={{headerShown:true}}/>
    <Stack.Screen name='Join Room List' component={AddRoom} options={{headerShown:true}}/>
    
  </Stack.Navigator>
  )
}

export default AuthNavigation

const styles = StyleSheet.create({})