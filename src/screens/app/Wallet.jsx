import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import FontFamily from '../../utils/FontFamily';
import CustomButton from '../../component/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import {
  deposit,
  fetchCoinBalanceCount,
  qrCode,
  withdrawal,
} from '../../api/auth_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../component/Header';
import {useIsFocused} from '@react-navigation/native';

const Wallet = () => {
  const focus = useIsFocused();
  const [coinBalance, setCoinBalance] = useState(0);
  const [userid, setUserId] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [phone, setPhone] = useState('');
  const [selected, setSelected] = useState('Deposit');
  const [withDrawalAmount, setWithDrawalAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const indianMobileRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  useEffect(() => {
    fetchUserData();
    fetchQRImage();
  }, []);

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
        setCoinBalance(response?.data?.[0]?.wallet);
      }
    } catch (error) {
      console.log(error, 'Line 22');
    }
  };

  const fetchQRImage = async () => {
    try {
      const response = await qrCode();
      if (response?.status_code === 200) {
        setImageUrl(
          `https://gameadmin.igvault.cloud/${response?.data?.[0]?.q_code_image}`,
        );
      }
    } catch (error) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: error,
      });
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserId(parsedData?.id);
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleRecharge = async () => {
    if (amount.trim() === '') {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Please enter the amount to Deposit',
      });
      return null;
    }
    if (transactionId.trim() === '') {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Please enter the transaction ID',
      });
      return null;
    }
    if (phone.trim() === '') {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Please enter the phone number',
      });
      return null;
    }
    if (!indianMobileRegex.test(phone)) {
      showMessage({
        type: 'warning',
        message: 'Please enter the Valid Mobile number',
        icon: 'warning',
      });
      return null;
    }
    try {
      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(
        2,
        '0',
      )}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
        today.getFullYear(),
      ).slice(-2)}`;

      const data = {
        user_id: userid,
        date: formattedDate,
        remark: 'Make Payment',
        amount: amount,
        tranjaction_id: transactionId,
        phone_number: phone,
      };
      const response = await deposit(data);
      if (response?.status_code === 200) {
        showMessage({
          type: 'success',
          message:
            'Your request is submitted successfully. Please wait for max 24hrs to reflect the amount in wallet',
          icon: 'success',
        });
      } else {
        Alert.alert('Error', 'Server Problem');
      }
    } catch (error) {
      showMessage({
        type: 'warning',
        message: error,
        icon: 'warning',
      });
    } finally {
      setAmount('');
      setTransactionId('');
      setPhone('');
    }
  };

  const handleWithdraw = async () => {
    if (withDrawalAmount.trim() === '') {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Please enter the amount to Withdraw',
      });
      return null;
    }
    if (upiId.trim() === '') {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Please enter the upiId to Withdraw',
      });
      return null;
    }
    try {
      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(
        2,
        '0',
      )}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
        today.getFullYear(),
      ).slice(-2)}`;
      const data = {
        user_id: userid,
        date: formattedDate,
        remark: 'Withdrawal Request',
        amount: withDrawalAmount,
        upi_id: upiId,
      };
      const response = await withdrawal(data);
      if (response?.status_code === 200) {
        showMessage({
          type: 'success',
          icon: 'success',
          message:
            'Your request is submitted successfully. please wait for 24hrs.',
        });
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Please try again!',
      });
    } finally {
      setWithDrawalAmount('');
      setUpiId('');
    }
  };

  return (
    <ScrollView style={styles.main}>
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.white} />
      <Header />
      <View style={styles.balanceHolder}>
        <Ionicons name="wallet" size={textScale(30)} color={Color.yellow} />
        <Text style={styles.text}>Your wallet Coin balance {coinBalance} </Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={[
            styles.buttonHolder,
            {
              borderBottomWidth: selected === 'Deposit' ? 2 : 0,
              borderColor: Color.black,
            },
          ]}
          onPress={() => setSelected('Deposit')}>
          <Text style={styles.buttonText}>Deposit</Text>
        </TouchableOpacity>
        <Text style={styles.buttonText}>|</Text>
        <TouchableOpacity
          style={[
            styles.buttonHolder,
            {borderBottomWidth: selected === 'Withdrawal' ? 2 : 0},
          ]}
          onPress={() => setSelected('Withdrawal')}>
          <Text style={styles.buttonText}>Withdrawal</Text>
        </TouchableOpacity>
      </View>
      {selected === 'Deposit' && (
        <View style={styles.contentHolder}>
          <Text style={styles.text2}>Recharge your wallet</Text>
          <Image
            source={{uri: imageUrl}}
            resizeMode="contain"
            style={{width: moderateScale(150), height: moderateScale(150)}}
          />
          <TextInput
            placeholder="Enter Amount"
            value={amount}
            onChangeText={text => setAmount(text)}
            keyboardType="number-pad"
            placeholderTextColor={Color.textGray}
            style={styles.textInputBox}
          />
          <TextInput
            placeholder="Enter Transaction ID"
            value={transactionId}
            keyboardType="default"
            placeholderTextColor={Color.textGray}
            style={styles.textInputBox}
            onChangeText={text => setTransactionId(text)}
          />
          <TextInput
            placeholder="Enter Phone Number"
            value={phone}
            onChangeText={text => setPhone(text)}
            keyboardType="number-pad"
            maxLength={10}
            placeholderTextColor={Color.textGray}
            style={styles.textInputBox}
          />
          <View style={{width: '85%'}}>
            <CustomButton name={'Recharge'} handleAction={handleRecharge} />
          </View>
        </View>
      )}
      {selected === 'Withdrawal' && (
        <View style={styles.contentHolder}>
          <Text style={styles.text2}>Withdraw from your account</Text>
          <TextInput
            placeholder="Enter Amount"
            value={withDrawalAmount}
            onChangeText={text => setWithDrawalAmount(text)}
            keyboardType="number-pad"
            placeholderTextColor={Color.textGray}
            style={styles.textInputBox}
          />
          <View style={{width: '85%'}}>
            <Text style={styles.buttonText}>UPI Details</Text>

            <TextInput
              placeholder="UPI ID"
              value={upiId}
              onChangeText={text => setUpiId(text)}
              placeholderTextColor={Color.textGray}
              style={[styles.textInputBox, {width: '100%'}]}
            />
          </View>
          <View style={{width: '80%'}}>
            <CustomButton name={'WITHDRAW'} handleAction={handleWithdraw} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
  imageStyle: {
    width: moderateScale(250),
    height: moderateScale(150),
    alignSelf: 'center',
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    color: Color.white,
    fontSize: textScale(15),
  },
  balanceHolder: {
    borderWidth: 2,
    width: '90%',
    padding: moderateScale(10),
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    backgroundColor: Color.red,
    borderColor: Color.red,
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(5),
    flexDirection: 'row',
  },
  timerImageHolder: {
    width: moderateScale(100),
    height: moderateScale(50),
  },
  buttonHolder: {
    width: moderateScale(150),
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FontFamily.Inter_SemiBold,
    fontSize: textScale(14),
    color: Color.black,
    padding: moderateScale(3),
  },
  buttonView: {
    marginVertical: moderateScaleVertical(10),
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  text2: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(14),
    color: Color.textGray,
  },
  textInputBox: {
    borderWidth: 2,
    width: '85%',
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(14),
    paddingHorizontal: moderateScale(10),
    color: Color.black,
    borderRadius: moderateScale(5),
    borderColor: Color.textGray,
  },
  contentHolder: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
    marginTop: moderateScaleVertical(10),
  },
  checkBox: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(10),
    flexDirection: 'row',
  },
});
