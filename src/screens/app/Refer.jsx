import {
  Image,
  SafeAreaView,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../component/CustomButton';

const Refer = () => {
  const [copiedText, setCopiedText] = useState('ASHISHRANJAN');
  const [referralCode, setReferralCode] = useState('');
  const copyToClipboard = () => {
    Clipboard.setString(copiedText);
  };

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <Image
        source={ImagePath.logo}
        resizeMode="cover"
        style={styles.imageStyle}
      />
      <Text style={styles.headerText}>Get 500 Coins</Text>
      <Text style={styles.subHeaderText}>
        Share your referral code with your friends and get 500 coins to both of
        you
      </Text>
      <View style={styles.codeHolder}>
        <Text style={styles.referText}>{copiedText}</Text>
        <TouchableOpacity onPress={copyToClipboard}>
          <Ionicons
            name="copy-outline"
            size={textScale(20)}
            color={Color.blue}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.lowerViewHolder}>
        <Text style={styles.referText2}>Enter Referral Code</Text>
        <View style={styles.referCode}>
          <FontAwesome name="users" size={textScale(20)} color={Color.blue} />
          <TextInput
            placeholder="Referral Code"
            placeholderTextColor={Color.black}
            value={referralCode}
            onChangeText={text => setReferralCode(text)}
            style={styles.inputBox}
          />
        </View>
        <CustomButton
          name={'Continue'}
          handleAction={() => console.log('Clicked on the continue button')}
        />
      </View>
    </View>
  );
};

export default Refer;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
  imageStyle: {
    width: moderateScale(200),
    height: moderateScale(200),
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerText: {
    fontFamily: FontFamily.Inter_SemiBold,
    fontSize: textScale(18),
    textAlign: 'center',
    color: Color.red,
  },
  subHeaderText: {
    fontFamily: FontFamily.Inter_Regular,
    width: '90%',
    fontSize: textScale(14),
    textAlign: 'center',
    alignSelf: 'center',
    color: Color.black,
  },
  codeHolder: {
    borderWidth: 2,
    marginVertical: moderateScaleVertical(10),
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    borderStyle: 'dashed',
    borderRadius: moderateScale(10),
    borderColor: Color.borderColor,
    backgroundColor: Color.borderColor,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  referText: {
    fontFamily: FontFamily.Inter_SemiBold,
    fontSize: textScale(16),
    padding: moderateScale(10),
    color: Color.blue,
  },
  lowerViewHolder: {
    marginVertical: moderateScaleVertical(10),
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    gap: moderateScale(10),
  },
  referText2: {
    fontFamily: FontFamily.Inter_SemiBold,
    fontSize: textScale(16),
    color: Color.blue,
  },
  referCode: {
    borderWidth: 2,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    padding: moderateScale(5),
    borderRadius: moderateScale(10),
    borderColor: Color.borderColor,
    backgroundColor: Color.borderColor,
    borderStyle: 'dashed',
  },
  inputBox: {
    width: '85%',
    fontFamily: FontFamily.Inter_SemiBold,
    fontSize: textScale(14),
    color: Color.blue,
  },
});
