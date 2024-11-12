import {
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
import React, {useState} from 'react';
import Color from '../../utils/Colors';
import {ImagePath} from '../../utils/ImagePath';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import FontFamily from '../../utils/FontFamily';
import CustomButton from '../../component/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Wallet = () => {
  const [amount, setAmount] = useState('');
  const [trasactionId, setTransactionId] = useState('');
  const [phone, setPhone] = useState('');
  const [selected, setSelected] = useState('Deposit');
  const [withDrawalAmount, setWithDrawalAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [IFSC, setIfsc] = useState('');
  const [upiId, setUpiId] = useState('');
  const [withDrawalMethod, setWithDrawalMethod] = useState('Bank Details');

  return (
    <ScrollView style={styles.main}>
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.white} />
      <Image
        source={ImagePath.logo}
        resizeMode="cover"
        style={styles.imageStyle}
      />
      <View style={styles.balanceHolder}>
        <Image
          source={ImagePath.timer}
          resizeMode="cover"
          style={styles.timerImageHolder}
        />
        <Text style={styles.text}>Your wallet balance ₹400 </Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.buttonHolder}
          onPress={() => setSelected('Deposit')}>
          <Text style={styles.buttonText}>Deposit</Text>
        </TouchableOpacity>
        <Text style={styles.buttonText}>|</Text>
        <TouchableOpacity
          style={styles.buttonHolder}
          onPress={() => setSelected('Withdrawal')}>
          <Text style={styles.buttonText}>Withdrawal</Text>
        </TouchableOpacity>
      </View>
      {selected === 'Deposit' && (
        <View style={styles.contentHolder}>
          <Text style={styles.text2}>Recharge your wallet</Text>
          <Image
            source={ImagePath.Qr}
            resizeMode="contain"
            style={{width: moderateScale(150), height: moderateScale(125)}}
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
            value={trasactionId}
            keyboardType="number-pad"
            placeholderTextColor={Color.textGray}
            style={styles.textInputBox}
            onChangeText={text => setTransactionId(text)}
          />
          <TextInput
            placeholder="Enter Phone Number"
            value={phone}
            onChangeText={text => setPhone(text)}
            keyboardType="number-pad"
            placeholderTextColor={Color.textGray}
            style={styles.textInputBox}
          />
          <View style={{width: '80%'}}>
            <CustomButton
              name={'Recharge'}
              handleAction={() => console.log('Clicked on the Recharge Button')}
            />
          </View>
        </View>
      )}
      {selected === 'Withdrawal' && (
        <View style={styles.contentHolder}>
          <Text style={styles.text2}>Withdraw on your account</Text>
          <TextInput
            placeholder="Enter Amount"
            value={withDrawalAmount}
            onChangeText={text => setWithDrawalAmount(text)}
            keyboardType="number-pad"
            placeholderTextColor={Color.textGray}
            style={styles.textInputBox}
          />
          <TouchableOpacity
            style={styles.checkBox}
            onPress={() => setWithDrawalMethod('Bank Details')}>
            <MaterialCommunityIcons
              name={
                withDrawalMethod === 'Bank Details'
                  ? 'checkbox-outline'
                  : 'checkbox-blank-outline'
              }
              color={Color.black}
              size={textScale(25)}
            />
            <Text style={styles.buttonText}>Bank Details</Text>
          </TouchableOpacity>
          {withDrawalMethod === 'Bank Details' && (
            <>
              <TextInput
                placeholder="Account Number"
                value={accountNumber}
                keyboardType="number-pad"
                placeholderTextColor={Color.textGray}
                style={styles.textInputBox}
                onChangeText={text => setAccountNumber(text)}
              />
              <TextInput
                placeholder="IFSC Code"
                value={IFSC}
                onChangeText={text => setIfsc(text)}
                placeholderTextColor={Color.textGray}
                style={styles.textInputBox}
              />
            </>
          )}
          <TouchableOpacity
            style={styles.checkBox}
            onPress={() => setWithDrawalMethod('UPI Details')}>
            <MaterialCommunityIcons
              name={
                withDrawalMethod === 'UPI Details'
                  ? 'checkbox-outline'
                  : 'checkbox-blank-outline'
              }
              color={Color.black}
              size={textScale(25)}
            />
            <Text style={styles.buttonText}>UPI Details</Text>
          </TouchableOpacity>
          {withDrawalMethod === 'UPI Details' && (
            <TextInput
              placeholder="UPI ID"
              value={upiId}
              onChangeText={text => setUpiId(text)}
              placeholderTextColor={Color.textGray}
              style={styles.textInputBox}
            />
          )}
          <View style={{width: '80%'}}>
            <CustomButton
              name={'WITHDRAW'}
              handleAction={() => console.log('Clicked on the WITHDRAW Button')}
            />
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
    width: moderateScale(150),
    height: moderateScale(150),
    alignSelf: 'center',
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    color: Color.white,
    fontSize: textScale(14),
  },
  balanceHolder: {
    borderWidth: 2,
    width: '90%',
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    backgroundColor: Color.red,
    borderColor: Color.red,
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(5),
  },
  timerImageHolder: {
    width: moderateScale(50),
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
    marginVertical: moderateScaleVertical(5),
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
    width: '80%',
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(12),
    paddingHorizontal: moderateScale(10),
    color: Color.black,
    borderRadius: moderateScale(5),
    borderColor: Color.textGray,
  },
  contentHolder: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  checkBox: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(10),
    flexDirection: 'row',
  },
});
