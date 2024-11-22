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
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import {ImagePath} from '../../utils/ImagePath';
import Feather from 'react-native-vector-icons/Feather';
import FontFamily from '../../utils/FontFamily';
import CustomButton from '../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import { FETCH_REWARD } from '../../api/API_Services';
import { validateLogin } from '../../api/auth_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const indianMobileRegex = /^(\+91|91|0)?[6-9]\d{9}$/;

  useEffect(()=>{
FETCH_REWARD();
  },[])

  // const handleLogin = async () => {
  //   if (mobile.trim() === '') {
  //     showMessage({
  //       type: 'danger',
  //       message: 'Please enter the Mobile number',
  //       icon: 'danger',
  //     });
  //     return;
  //   }
  //   if (mobile.length < 10) {
  //     showMessage({
  //       type: 'danger',
  //       message: 'Please enter the 10 digit Mobile number',
  //       icon: 'danger',
  //     });
  //     return null;
  //   }
  //   if (!indianMobileRegex.test(mobile)) {
  //     showMessage({
  //       type: 'danger',
  //       message: 'Please enter the Valid Mobile number',
  //       icon: 'danger',
  //     });
  //     return null;
  //   }
  //   if (password.trim() === '') {
  //     showMessage({
  //       type: 'danger',
  //       message: 'Please enter the password',
  //       icon: 'danger',
  //     });
  //     return null;
  //   }
  //   if (password.length < 6) {
  //     showMessage({
  //       type: 'warning',
  //       message: 'Please enter the strong password,',
  //       icon: 'warning',
  //     });
  //     return null;
  //   }
  //   const data ={
  //     mobile:mobile,
  //     password:password
  //   }

  //   // showMessage({
  //   //   type: 'success',
  //   //   message: 'Login Successfully!',
  //   //   icon: 'success',
  //   // });
  //   // navigation.navigate('BottomNavigation');
  // };

  const handleLogin = async () => {
    if (mobile.trim() === '') {
      showMessage({
        type: 'danger',
        message: 'Please enter the Mobile number',
        icon: 'danger',
      });
      return;
    }
    if (mobile.length < 10) {
      showMessage({
        type: 'danger',
        message: 'Please enter the 10 digit Mobile number',
        icon: 'danger',
      });
      return;
    }
    if (!indianMobileRegex.test(mobile)) {
      showMessage({
        type: 'danger',
        message: 'Please enter a valid Mobile number',
        icon: 'danger',
      });
      return;
    }
    if (password.trim() === '') {
      showMessage({
        type: 'danger',
        message: 'Please enter the password',
        icon: 'danger',
      });
      return;
    }
    if (password.length < 6) {
      showMessage({
        type: 'warning',
        message: 'Please enter a strong password',
        icon: 'warning',
      });
      return;
    }
    try{
      const data ={
        mobile:mobile,
        password:password
      }
      const response = await validateLogin(data);
      if(response?.status_code===200){
        await AsyncStorage.setItem('userData', JSON.stringify(response?.data));
        showMessage({
          type: 'success',
          message:'Login Successful!',
          icon: 'success',
        });
        navigation.replace('BottomNavigation');
      }
      else{
        showMessage({
          type: 'warning',
          message:"Invalid Id Password! try again",
          icon: 'warning',
        });
      }
    }catch(error){
      showMessage({
          type: 'danger',
          message:error,
          icon: 'danger',
        });
    }

    
  };

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.white} />
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <Image
        source={ImagePath.logo}
        resizeMode="cover"
        style={styles.imageStyle}
      />
      <View style={styles.textInputBoxHolder}>
        <Feather name="smartphone" color={Color.orange} size={textScale(20)} />
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
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          style={styles.textInput}
        />
      </View>
      <View style={styles.contentHolder2}>
        <CustomButton name={'Login'} handleAction={handleLogin} />
        <Text style={styles.registerText}>Or</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.registerText}>
            Not have an account? Register here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentHolder: {
    marginVertical: moderateScaleVertical(75),
    alignItems: 'center',
    gap: moderateScaleVertical(20),
  },
  imageStyle: {
    width: '100%',
    height: '35%',
  },
  textInput: {
    width: '85%',
    padding: moderateScale(10),
    fontFamily: FontFamily.Inter_SemiBold,
    fontSize: textScale(16),
    color: Color.black,
  },
  textInputBoxHolder: {
    borderWidth: 2,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.textGray,
    borderRadius: moderateScale(10),
    padding: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScaleVertical(10),
  },
  registerText: {
    fontFamily: FontFamily.Inter_SemiBold,
    color: Color.black,
    fontSize: textScale(16),
    textAlign: 'center',
  },
  contentHolder2: {
    width: '90%',
    alignItems: 'center',
    gap: moderateScaleVertical(20),
  },
});
