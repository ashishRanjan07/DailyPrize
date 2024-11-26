import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Colors';
import {ImagePath} from '../../utils/ImagePath';
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from '../../utils/Responsive';
import FontFamily from '../../utils/FontFamily';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../component/Header';
import {fetchCoinBalanceCount} from '../../api/auth_api';

const Profile = () => {
  const focus = useIsFocused();
  const [coinBalance, setCoinBalance] = useState(0);
  const navigation = useNavigation();
  const [name, setName] = useState();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.replace('Splash');
  };
  useEffect(() => {
    fetchLoginData();
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
        setCoinBalance(response?.data?.[0]?.points);
      }
    } catch (error) {
      console.log(error, 'Line 22');
    }
  };

  const fetchLoginData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const parseData = JSON.parse(userData);
    console.log(parseData, 'Line 43');
    setName(parseData?.display_name);
    withdrawalHistoryData(parseData?.id);
    depositHistoryData(parseData?.id);
  };

  const showLogoutAlert = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: handleLogout,
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.main}>
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <Header />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.nameText}>Hello,{name}!</Text>
        <LinearGradient colors={['orange', 'red']} style={styles.gradientBox}>
          <View style={{width: '50%'}}>
            <Text style={styles.gradientText}>
              Point Balance{'\n'}
              {coinBalance}
            </Text>
          </View>
          <View style={{width: '50%'}}>
            <Image
              source={ImagePath.coin}
              resizeMode="contain"
              style={{width: '100%', height: moderateScale(150)}}
            />
          </View>
        </LinearGradient>
        <TouchableOpacity
          style={styles.boxHolder}
          onPress={() => navigation.navigate('Deposit History')}>
          <MaterialCommunityIcons
            name="locker-multiple"
            color={Color.black}
            size={textScale(22)}
          />
          <Text style={styles.text}>Deposit History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxHolder}
          onPress={() => navigation.navigate('WithDrawal History')}>
          <MaterialCommunityIcons
            name="history"
            color={Color.black}
            size={textScale(22)}
          />
          <Text style={styles.text}>Withdrawal History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxHolder}
          onPress={() => navigation.navigate('Refer')}>
          <FontAwesome name="share" color={Color.black} size={textScale(22)} />
          <Text style={styles.text}>Refer and Earn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxHolder}
          onPress={() => navigation.navigate('Privacy policy')}>
          <MaterialIcons
            name="security"
            color={Color.black}
            size={textScale(22)}
          />
          <Text style={styles.text}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxHolder}
          onPress={() => navigation.navigate('Terms And Conditions')}>
          <MaterialIcons
            name="policy"
            color={Color.black}
            size={textScale(22)}
          />
          <Text style={styles.text}>Terms and Condition</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxHolder}
          onPress={() => navigation.navigate('Contact us')}>
          <MaterialIcons
            name="contact-support"
            color={Color.black}
            size={textScale(22)}
          />
          <Text style={styles.text}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxHolder} onPress={showLogoutAlert}>
          <MaterialIcons
            name="logout"
            color={Color.black}
            size={textScale(22)}
          />
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
    // alignItems: 'center',
  },
  nameText: {
    fontFamily: FontFamily.Inter_Medium,
    color: Color.black,
    fontSize: textScale(18),
  },
  gradientBox: {
    width: '95%',
    height: moderateScale(150),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    padding: moderateScale(10),
    marginVertical: moderateScaleVertical(10),
  },
  gradientText: {
    color: Color.white,
    fontSize: textScale(18),
    fontFamily: FontFamily.Inter_Medium,
    lineHeight: scale(30),
    textAlign: 'center',
    letterSpacing: scale(1),
  },
  text: {
    fontFamily: FontFamily.Inter_SemiBold,
    color: Color.black,
    fontSize: textScale(16),
  },
  boxHolder: {
    borderBottomWidth: 1,
    width: '90%',
    padding: moderateScale(5),
    flexDirection: 'row',
    gap: moderateScale(20),
    alignItems: 'center',
    borderColor: Color.borderColor,
    marginVertical: moderateScale(5),
  },
});
