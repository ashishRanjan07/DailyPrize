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
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import {ImagePath} from '../../utils/ImagePath';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontFamily from '../../utils/FontFamily';
import CustomButton from '../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {registration} from '../../api/auth_api';

const Registration = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [refer, setRefer] = useState('');
  const [selected, setSelected] = useState(false);
  const navigation = useNavigation();
  const indianMobileRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  const emailRegex =
    /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handelRegistration = async () => {
    if (name.trim() === '') {
      showMessage({
        type: 'info',
        icon: 'info',
        message: 'Please enter the name',
      });
      return null;
    }
    if (email.trim() === '') {
      showMessage({
        type: 'info',
        icon: 'info',
        message: 'Please enter the email id',
      });
      return null;
    }
    if (!emailRegex.test(email)) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Please enter valid email id',
      });
      return null;
    }
    if (mobile.trim() === '') {
      showMessage({
        type: 'info',
        icon: 'info',
        message: 'Please enter the Mobile Number',
      });
      return null;
    }
    if (!indianMobileRegex.test(mobile)) {
      showMessage({
        type: 'danger',
        message: 'Please enter the Valid Mobile number',
        icon: 'danger',
      });
      return null;
    }
    if (password.trim() === '') {
      showMessage({
        type: 'info',
        icon: 'info',
        message: 'Please enter the password',
      });
      return null;
    }
    if (password.length < 6) {
      showMessage({
        type: 'warning',
        message: 'Please enter the strong password,',
        icon: 'warning',
      });
      return null;
    }
    if (!selected) {
      showMessage({
        type: 'danger',
        message: 'Please accept the terms and conditions',
        icon: 'danger',
      });
      return null;
    }
    try {
      const fcm_token = await AsyncStorage.getItem('fcmToken');
      const data = {
        name: name,
        email: email,
        mobile: mobile,
        referralCode: refer,
        password: password,
        fcm_token: fcm_token,
      };
      const response = await registration(data);
      console.log(response, 'Line 119');
      if (response.status_code === 200) {
        showMessage({
          type: 'success',
          message: 'Account Created Successfully, Please login',
          icon: 'success',
        });
        navigation.navigate('Login');
      } else if (response.status_code === 500) {
        showMessage({
          type: 'warning',
          icon: 'warning',
          message: response?.message,
        });
      }
    } catch (error) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: error,
      });
    }
  };

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.view}>
          <Image
            source={ImagePath.logo}
            resizeMode="cover"
            style={{width: '80%', height: moderateScale(250)}}
          />
          <View style={styles.textInputBoxHolder}>
            <Feather name="user" color={Color.orange} size={textScale(20)} />
            <TextInput
              placeholder="Name"
              placeholderTextColor={Color.textGray}
              value={name}
              keyboardType="default"
              onChangeText={text => setName(text)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputBoxHolder}>
            <Feather name="mail" color={Color.orange} size={textScale(20)} />
            <TextInput
              placeholder="Email"
              placeholderTextColor={Color.textGray}
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputBoxHolder}>
            <Feather
              name="smartphone"
              color={Color.orange}
              size={textScale(20)}
            />
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor={Color.textGray}
              maxLength={10}
              value={mobile}
              onChangeText={text => setMobile(text)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputBoxHolder}>
            <Feather name="lock" color={Color.orange} size={textScale(20)} />
            <TextInput
              placeholder="Password"
              placeholderTextColor={Color.textGray}
              value={password}
              keyboardType="default"
              onChangeText={text => setPassword(text)}
              style={styles.textInput}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.textInputBoxHolder}>
            <Entypo name="code" color={Color.orange} size={textScale(20)} />
            <TextInput
              placeholder="Referral Code"
              placeholderTextColor={Color.textGray}
              value={refer}
              keyboardType="default"
              onChangeText={text => setRefer(text)}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity
            style={styles.tcHolder}
            onPress={() => setSelected(!selected)}>
            <MaterialCommunityIcons
              name={selected ? 'checkbox-outline' : 'checkbox-blank-outline'}
              color={Color.black}
              size={textScale(20)}
            />
            <Text style={styles.text}>Terms and Conditions</Text>
          </TouchableOpacity>

          <CustomButton name={'Register'} handleAction={handelRegistration} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
  textInputBoxHolder: {
    borderWidth: 2,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.textGray,
    borderRadius: moderateScale(10),
    padding: moderateScale(5),
    paddingHorizontal: moderateScale(10),
  },

  textInput: {
    width: '85%',
    padding: moderateScale(10),
    fontFamily: FontFamily.Inter_SemiBold,
    fontSize: textScale(16),
    color: Color.black,
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    color: Color.black,
    fontSize: textScale(15),
  },
  tcHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  view: {
    marginVertical: moderateScaleVertical(25),
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(10),
    width: '95%',
    alignSelf: 'center',
  },
});
