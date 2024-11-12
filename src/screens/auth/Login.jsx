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
import FontFamily from '../../utils/FontFamily';
import CustomButton from '../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.white} />
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <Image
        source={ImagePath.logo}
        resizeMode="center"
        style={styles.imageStyle}
      />
      <View style={styles.textInputBoxHolder}>
        <Feather name="smartphone" color={Color.orange} size={textScale(25)} />
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
        <Feather name="lock" color={Color.orange} size={textScale(25)} />
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
        <CustomButton
          name={'Login'}
          handleAction={() => navigation.navigate('BottomNavigation')}
        />
        <Text style={styles.text}>Or</Text>
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
    height: '40%',
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
    paddingHorizontal: moderateScale(5),
    marginBottom: moderateScaleVertical(10),
  },
  text: {
    fontFamily: FontFamily.Inter_ExtraBold,
    color: Color.black,
    fontSize: textScale(20),
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
