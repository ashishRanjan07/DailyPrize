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
import Share from 'react-native-share';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/Header';

const Refer = () => {
  const navigation = useNavigation();
  const [copiedText, setCopiedText] = useState('ASHISHRANJAN');
  const [referralCode, setReferralCode] = useState('');
  const copyToClipboard = () => {
    Clipboard.setString(copiedText);
  };

  const handleShareCode = async () => {
    const customOptions = {
      message: `Use my referral code: ${copiedText} to earn 500 coins!`,
      title: 'Refer and Earn',
    };

    try {
      await Share.open(customOptions);
    } catch (err) {
      if (err && err.message) {
        console.log('Error while sharing:', err.message);
      }
    }
  };

  const handleReferralCode = async () => {
    showMessage({
      type: 'success',
      icon: 'success',
      message:
        'Congratulation Referral Code Applied Successfully. you have earned 500 coins',
    });
    navigation.goBack();
  };
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <Header/>
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
        {referralCode.length > 0 && (
          <CustomButton name={'Apply Code'} handleAction={handleReferralCode} />
        )}
        <CustomButton
          name={'Share Referral Code'}
          handleAction={handleShareCode}
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
    width: moderateScale(250),
    height: moderateScale(150),
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerText: {
    fontFamily: FontFamily.Inter_Bold,
    fontSize: textScale(16),
    textAlign: 'center',
    color: Color.red,
  },
  subHeaderText: {
    fontFamily: FontFamily.Inter_Medium,
    width: '90%',
    fontSize: textScale(15),
    textAlign: 'center',
    alignSelf: 'center',
    color: Color.black,
    marginVertical: moderateScaleVertical(10),
  },
  codeHolder: {
    borderWidth: 2,
    marginVertical: moderateScaleVertical(10),
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    padding: moderateScale(5),
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
    gap: moderateScale(15),
  },
  referText2: {
    fontFamily: FontFamily.Inter_SemiBold,
    fontSize: textScale(15),
    color: Color.black,
  },
  referCode: {
    borderWidth: 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
