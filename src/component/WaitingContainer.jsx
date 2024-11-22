import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImagePath} from '../utils/ImagePath';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../utils/Responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../utils/Colors';
import FontFamily from '../utils/FontFamily';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';

const WaitingContainer = ({waitingTime,data}) => {
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
      <MaterialCommunityIcons
        name="timer-sand"
        size={textScale(40)}
        color={Color.yellow}
      />
      <Text style={styles.text}>Next Game will be start in {waitingTime} seconds</Text>
      <CustomButton name={"ADD COUPON"} handleAction={()=>navigation.navigate('Add Coupon',{data:data})}/>
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
  text:{
    fontFamily:FontFamily.Inter_Medium,
    fontSize:textScale(15),
    color:Color.blue,
    textAlign:'center'
  }
});
