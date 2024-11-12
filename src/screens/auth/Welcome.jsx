import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Color from '../../utils/Colors';
import {ImagePath} from '../../utils/ImagePath';
import FontFamily from '../../utils/FontFamily';
import {textScale} from '../../utils/Responsive';
import CustomButton from '../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
    
        <Image
          source={ImagePath.logo}
          resizeMode="contain"
          style={styles.imageStyle}
        />
        <Text style={styles.text}>START</Text>
        <Text style={[styles.text, {color: Color.orange}]}>YOUR</Text>
        <Text style={[styles.text, {color: Color.orange}]}>EARNING.</Text>
        <View style={{width: '70%'}}>
          <CustomButton
            name="Continue"
            handleAction={() => navigation.navigate('Login')}
          />
        </View>
     
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '40%',
  },
  text: {
    fontFamily: FontFamily.Lalezar,
    color: Color.black,
    fontSize: textScale(50),
  },
});
