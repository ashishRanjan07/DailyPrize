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

const Registration = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [refer, setRefer] = useState('');
  const [selected, setSelected] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <ScrollView style={{}}>
        <View
          style={{
            marginVertical: moderateScaleVertical(25),
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(10),
            width: '95%',
            alignSelf: 'center',
          }}>
          <Image
            source={ImagePath.logo}
            resizeMode="cover"
            style={{width: '80%', height: moderateScale(250)}}
          />
          <View style={styles.textInputBoxHolder}>
            <Feather name="user" color={Color.orange} size={textScale(35)} />
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
            <Feather name="mail" color={Color.orange} size={textScale(35)} />
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
              size={textScale(35)}
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
            <Feather name="lock" color={Color.orange} size={textScale(35)} />
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
            <Entypo name="code" color={Color.orange} size={textScale(35)} />
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
              size={textScale(25)}
            />
            <Text style={styles.text}>Terms and Conditions</Text>
          </TouchableOpacity>

          <CustomButton
            name={'Register'}
            handleAction={() => navigation.navigate('Login')}
          />
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
    paddingHorizontal: moderateScale(5),
  },

  textInput: {
    width: '85%',
    padding: moderateScale(20),
    fontFamily: FontFamily.Inter_SemiBold,
    fontSize: textScale(20),
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
});
