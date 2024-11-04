import { Image, StyleSheet } from 'react-native';
import React from 'react';

import Home from '../screens/app/Home';
import Refer from '../screens/app/Refer';
import Wallet from '../screens/app/Wallet';
import Profile from '../screens/app/Profile';
import Color from '../utils/Colors';
import { moderateScale, textScale } from '../utils/Responsive';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ImagePath } from '../utils/ImagePath';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator 
    keyboardHidesNavigationBar={true} 
    barStyle={styles.barStyle}
    activeColor={Color.white}
    inactiveColor={Color.white}
    activeIndicatorStyle={styles.main}
    
    >
      <Tab.Screen 
        name="Home" 
        component={Home}  
        options={{
          tabBarIcon: ({  }) => (
            <Image source={ImagePath.home} resizeMode='cover' style={{width:moderateScale(30),height:moderateScale(25)}} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Referral" 
        component={Refer} 
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={ImagePath.refer} resizeMode='cover' style={{width:moderateScale(30),height:moderateScale(25)}} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Wallet" 
        component={Wallet} 
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={ImagePath.wallet} resizeMode='cover' style={{width:moderateScale(30),height:moderateScale(25)}} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={ImagePath.profile} resizeMode='cover' style={{width:moderateScale(30),height:moderateScale(25)}} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
    barStyle: {
        justifyContent: 'center',
        overflow: 'hidden',
        alignItems:'center',
        backgroundColor: Color.red,
    },
    main: {
        backgroundColor: Color.white,
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(10),
      },
});

