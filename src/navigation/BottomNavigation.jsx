import { Image, StyleSheet } from 'react-native';
import React from 'react';

import Home from '../screens/app/Home';
import Wallet from '../screens/app/Wallet';
import Profile from '../screens/app/Profile';
import Color from '../utils/Colors';
import { moderateScale, textScale } from '../utils/Responsive'; 
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ImagePath } from '../utils/ImagePath';
import Prize from '../screens/app/Prize';

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
        name="Leaderboard" 
        component={Prize} 
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={ImagePath.leader} resizeMode='cover' style={{width:moderateScale(30),height:moderateScale(25)}} />
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

