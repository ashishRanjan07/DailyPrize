import {Animated, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Color from '../../utils/Colors';
import {ImagePath} from '../../utils/ImagePath';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation for zoom-in effect
    Animated.timing(scaleAnim, {
      toValue: 1, // Final scale value
      duration: 1000, // Duration of the animation
      useNativeDriver: true, // Optimize performance
    }).start();

    // Check user data after a delay
    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          navigation.replace('BottomNavigation');
        } else {
          navigation.replace('Welcome');
        }
      } catch (error) {
        console.log('Error checking user data:', error);
        navigation.replace('Welcome');
      }
    };

    setTimeout(() => {
      checkUserData();
    }, 2000);
  }, []);

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.white} />
      <Animated.Image
        source={ImagePath.logo}
        resizeMode="contain"
        style={[
          styles.logo,
          {transform: [{scale: scaleAnim}]}, // Apply animated scaling
        ]}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: '80%',
  },
});
