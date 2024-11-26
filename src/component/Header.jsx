import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ImagePath} from '../utils/ImagePath';
import {moderateScale, textScale} from '../utils/Responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../utils/Colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  fetchCoinBalanceCount,
} from '../api/auth_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const [coinBalance, setCoinBalance] = useState(0);
  

  const focus = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    fetchCoinBalance();
  }, [focus]);

  const fetchCoinBalance = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    const data = {
      id: parsedData?.id,
    };
    try {
      const response = await fetchCoinBalanceCount(data);
      if (response?.status_code === 200) {
        setCoinBalance(response?.data?.[0]?.points);
      }
    } catch (error) {
      console.log(error, 'Line 22');
    }
  };
  

  return (
    <View style={styles.headerHolder}>
      <TouchableOpacity
        style={styles.headerFirstView}
        onPress={() =>
          navigation.navigate('Coin History', {coinBalance: coinBalance})
        }>
        <Ionicons name="wallet" color={Color.red} size={textScale(25)} />
        <Text style={styles.amountText}>{coinBalance}</Text>
      </TouchableOpacity>
      <View style={{width: '50%', height: moderateScale(50)}}>
        <Image source={ImagePath.logo} resizeMode="cover" style={styles.logo} />
      </View>

      <TouchableOpacity
        style={{width: '20%', alignItems: 'flex-end'}}
        onPress={() =>
          navigation.navigate('Notification')
        }>
        <MaterialCommunityIcons
          name="bell-badge"
          size={textScale(26)}
          color={Color.red}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerHolder: {
    height: moderateScale(75),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
  },
  headerFirstView: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10),
    flexDirection: 'row',
    gap: moderateScale(10),
  },
  logo: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
});
