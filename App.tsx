import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontFamily from './src/utils/FontFamily';
import Splash from './src/screens/auth/Splash';
import Welcome from './src/screens/auth/Welcome';
import Login from './src/screens/auth/Login';
import Registration from './src/screens/auth/Registration';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './src/navigation/AuthNavigation';

const App = () => {
  return (
   <NavigationContainer>
    <AuthNavigation/>
   </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
