import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Color from '../../utils/Colors';
import {ImagePath} from '../../utils/ImagePath';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
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
      <Image
        source={ImagePath.logo}
        resizeMode="contain"
        style={{width: '80%', height: '80%'}}
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
});
