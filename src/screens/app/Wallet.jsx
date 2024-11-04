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
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import FontFamily from '../../utils/FontFamily';

const Wallet = () => {
  return (
    <View style={styles.main}>
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.white} />
      <Image
        source={ImagePath.logo}
        resizeMode="cover"
        style={styles.imageStyle}
      />
      <View style={styles.cardHolder}>
        <Image
          source={ImagePath.ticket}
          resizeMode="contain"
          style={styles.ticketImage}
        />
      </View>
      <View style={{ width: '90%', alignSelf: 'center'}}>
        <Text style={styles.reedemPoints}>Reedem Points</Text>
        <Text style={{color: 'black'}}>List of Option</Text>
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
  imageStyle: {
    width: moderateScale(200),
    height: moderateScale(250),
    alignItems: 'center',
    alignSelf: 'center',
  },
  cardHolder: {
    borderWidth: 2,
    width: '90%',
    alignSelf: 'center',
    height: moderateScale(175),
    borderColor: Color.red,
    backgroundColor: Color.red,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScaleVertical(10),
  },
  ticketImage: {
    width: moderateScale(200),
    height: moderateScale(125),
    alignItems: 'center',
    alignSelf: 'center',
  },
  reedemPoints: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(16),
    color: Color.black,
  },
});
