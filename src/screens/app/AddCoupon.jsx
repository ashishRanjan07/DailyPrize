import {
  Alert,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Colors';
import {moderateScale, textScale} from '../../utils/Responsive';
import FontFamily from '../../utils/FontFamily';
import {ImagePath} from '../../utils/ImagePath';
import {showMessage} from 'react-native-flash-message';
import Header from '../../component/Header';
import {
  addPoints,
  fetchAllVoucher,
  fetchCoinBalanceCount,
  joinGameAddCoupon,
} from '../../api/auth_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {WaveIndicator} from 'react-native-indicators';

const AddCoupon = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState();
  const focus = useIsFocused();
  const [couponData, setCouponData] = useState([]);
  const imageArray = [
    ImagePath.image1,
    ImagePath.image2,
    ImagePath.image4,
    ImagePath.image6,
    ImagePath.image8,
    ImagePath.image10,
    ImagePath.image11,
    ImagePath.image14,
    ImagePath.image16,
  ];

  useEffect(() => {
    fetchCouponList();
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
        setPoints(response?.data?.[0]?.points);
      }
    } catch (error) {
      console.log(error, 'Line 22');
    }
  };

  const fetchCouponList = async () => {
    setLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    const data = {
      user_id: parsedData?.id,
    };
    try {
      const response = await fetchAllVoucher(data);
      if (response?.status_code === 200) {
        setCouponData(response?.data);
      }
    } catch (error) {
      showMessage({
        icon: 'warning',
        type: 'warning',
        message: error,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleAdd = async item => {
    console.log(item, 'Line 93');
    if (points <= 0) {
      Alert.alert(
        'Low Points',
        'Please recharge the wallet to add the coupons',
        [
          {
            text: 'Cancel',
            onPress: () => navigation.navigate('Home'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => navigation.navigate('Wallet'),
          },
        ],
      );
      return null;
    }
    if (points < item?.amount) {
      Alert.alert(
        'Insufficient Points',
        'You do not have enough points to play this game. Please add points.',
        [
          {
            text: 'Cancel',
            onPress: () => navigation.navigate('Home'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => navigation.navigate('Wallet'),
          },
        ],
      );
      return null;
    } else {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const parsedData = JSON.parse(userData);
        console.log(parsedData, 'line 47');
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const formattedTime = currentDate.toTimeString().split(' ')[0];

        const data = {
          voucher_amount: item?.amount,
          user_id: parsedData?.id,
          join_date: formattedDate,
          join_time: formattedTime,
          points: item?.point,
        };
        const response = await joinGameAddCoupon(data);
        if (response?.status_code === 200) {
          showMessage({
            icon: 'success',
            type: 'success',
            message: response?.message,
          });
          navigation.navigate('Join Room List',{data:item});
        }
      } catch (error) {
        const errorMessage = error?.message || 'An error occurred';
        showMessage({
          type: 'warning',
          icon: 'warning',
          message: errorMessage,
        });
      }
      
    }
  };

  const renderItem = ({item}) => {
    const imageIndex = item.id - 1;
    const imageSource = imageArray[imageIndex] || null;
    const isDisabled = item?.room?.toLowerCase() !== 'open';

    return (
      <TouchableOpacity
        style={[styles.itemHolder, isDisabled && {opacity: 0.5}]}
        onPress={() => !isDisabled && handleAdd(item)}
        disabled={isDisabled}>
        <ImageBackground
          source={imageSource}
          resizeMode="cover"
          style={{width: '100%', height: moderateScale(150)}}></ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <Header />
      <View style={styles.container}>
        {loading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <WaveIndicator color={Color.red} />
          </View>
        ) : (
          <FlatList
            data={couponData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default AddCoupon;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
  container: {
    width: '95%',
    alignSelf: 'center',
    flex: 1,
  },
  itemHolder: {
    borderWidth: 2,
    width: '100%',
    height: moderateScale(150),
    margin: moderateScale(5),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    borderColor: Color.borderColor,
    backgroundColor: Color.borderColor,
    alignSelf: 'center',
  },
  textOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: moderateScale(5),
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(16),
    color: Color.white,
    textAlign: 'center',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
