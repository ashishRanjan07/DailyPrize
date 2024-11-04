import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import Color from '../../utils/Colors';
import {ImagePath} from '../../utils/ImagePath';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome');
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
