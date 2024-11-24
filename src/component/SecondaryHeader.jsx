import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, textScale} from '../utils/Responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../utils/Colors';
import {ImagePath} from '../utils/ImagePath';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchCoinBalanceCount} from '../api/auth_api';
import FontFamily from '../utils/FontFamily';

const SecondaryHeader = () => {
  const navigation = useNavigation();
  const [coinBalance, setCoinBalance] = useState(0);
  const focus = useIsFocused();
  useEffect(() => {
    fetchCoinBalance();
  }, [focus]);

  const fetchCoinBalance = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedData = JSON.parse(userData);
      const data = {
        id: parsedData?.id,
      };
      const response = await fetchCoinBalanceCount(data);
      if (response?.status_code === 200) {
        setCoinBalance(response?.data?.[0]?.points);
      }
    } catch (error) {
      console.log(error, 'Line 22');
    }
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={textScale(30)} color={Color.red} />
      </TouchableOpacity>
      <View style={{width: '62%', alignItems: 'center'}}>
        <Image
          source={ImagePath.logo}
          resizeMode="cover"
          style={{width: moderateScale(200), height: moderateScale(50)}}
        />
      </View>
      <View style={styles.headerFirstView}>
        <Ionicons name="wallet" color={Color.red} size={textScale(25)} />
        <Text style={styles.amountText}>{coinBalance}</Text>
      </View>
    </View>
  );
};

export default SecondaryHeader;

const styles = StyleSheet.create({
  main: {
    padding: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  headerFirstView: {
    width:'25%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10),
    flexDirection: 'row',
    gap: moderateScale(10),
  },
  amountText: {
    fontFamily: FontFamily.Inter_Bold,
    color: Color.yellow,
    fontSize: textScale(18),
  },
});
