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
import React from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <Image
        source={ImagePath.logo}
        resizeMode="cover"
        style={{width: moderateScale(150), height: moderateScale(150)}}
      />
      <Text style={styles.nameText}>Hello,Ashish Ranjan!</Text>
      <LinearGradient colors={['orange', 'red']} style={styles.gradientBox}>
        <View style={{width: '50%'}}>
          <Text style={styles.gradientText}>Balance{'\n'} 1.2k</Text>
        </View>
        <View style={{width: '50%'}}>
          <Image
            source={ImagePath.coin}
            resizeMode="contain"
            style={{width: '100%', height: moderateScale(150)}}
          />
        </View>
      </LinearGradient>
      <TouchableOpacity style={styles.boxHolder} onPress={()=> navigation.navigate('Refer')}>
        <FontAwesome
          name="share"
          color={Color.black}
          size={textScale(22)}
        />
        <Text style={styles.text}>Refer and Earn</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boxHolder}>
        <MaterialIcons
          name="security"
          color={Color.black}
          size={textScale(22)}
        />
        <Text style={styles.text}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boxHolder}>
        <MaterialIcons name="policy" color={Color.black} size={textScale(22)} />
        <Text style={styles.text}>Terms and Condition</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boxHolder}>
        <MaterialIcons
          name="contact-support"
          color={Color.black}
          size={textScale(22)}
        />
        <Text style={styles.text}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boxHolder}
        onPress={() => Alert.alert('Logout', 'Are you sure want to logout?')}>
        <MaterialIcons name="logout" color={Color.black} size={textScale(22)} />
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
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
    lineHeight:scale(30),
    textAlign:'center',
    letterSpacing:scale(1)
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
