import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImagePath} from '../utils/ImagePath';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../utils/Responsive';
import Color from '../utils/Colors';
import FontFamily from '../utils/FontFamily';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';

const WaitingContainer = ({waitingTime, data}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <View style={{borderRadius: moderateScale(10), overflow: 'hidden'}}>
        <Image
          source={ImagePath.scratchCard}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <Image
        source={ImagePath.timerImageLogo}
        resizeMode="cover"
        style={{width: moderateScale(100), height: moderateScale(100)}}
      />
      <Text style={styles.text}>
        Next Game will be start in {waitingTime} seconds
      </Text>
      <CustomButton
        name={'ADD COUPON'}
        handleAction={() => navigation.navigate('Add Coupon', {data: data})}
      />
    </View>
  );
};

export default WaitingContainer;

const styles = StyleSheet.create({
  main: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: moderateScaleVertical(25),
  },
  image: {
    width: moderateScale(300),
    height: moderateScale(300),
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(15),
    color: Color.blue,
    textAlign: 'center',
  },
});
