import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Color from '../../utils/Colors';
import {ImagePath} from '../../utils/ImagePath';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontFamily from '../../utils/FontFamily';
import CustomButton from '../../component/CustomButton';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {contactUs} from '../../api/auth_api';
import Header from '../../component/Header';
import {WaveIndicator} from 'react-native-indicators';
const ContactUs = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRegex =
    /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmitForm = async () => {
    if (name.trim() === '') {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Please enter the name',
      });
      return null;
    }
    if (email.trim() === '') {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Please enter the email',
      });
      return null;
    }
    if (message.trim() === '') {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Please enter the message',
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
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem('userData');
      const parseData = JSON.parse(userData);

      const data = {
        user_id: parseData?.id,
        name: name,
        email: email,
        message: message,
      };
      const response = await contactUs(data);
      if (response?.status_code === 200) {
        showMessage({
          type: 'success',
          icon: 'success',
          message: response?.message,
        });
        navigation.goBack();
      }
    } catch (error) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: error,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.main}>
    <SafeAreaView/>
      <Header />
      <MaterialCommunityIcons
        name="message-flash"
        size={textScale(50)}
        color={Color.primary}
        style={{alignSelf: 'center'}}
      />
      <Text style={styles.contactUsText}>Contact Us</Text>
      <Text style={styles.text}>
        Please fill the below form in decent manner
      </Text>
      {!loading ? (
        <ScrollView>
          <View style={styles.view}>
            <Text style={[styles.text, {textAlign: 'left'}]}>Name</Text>
            <TextInput
              placeholder="Name"
              placeholderTextColor={Color.black}
              value={name}
              onChangeText={text => setName(text)}
              keyboardType="default"
              style={styles.textInputBox}
            />
          </View>
          <View style={styles.view}>
            <Text style={[styles.text, {textAlign: 'left'}]}>Email</Text>
            <TextInput
              placeholder="Email"
              placeholderTextColor={Color.black}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
              style={styles.textInputBox}
            />
          </View>
          <View style={styles.view}>
            <Text style={[styles.text, {textAlign: 'left'}]}>Message</Text>
            <TextInput
              placeholder="Message"
              placeholderTextColor={Color.black}
              value={message}
              multiline={true}
              onChangeText={text => setMessage(text)}
              keyboardType="default"
              style={styles.textInputBox}
            />
          </View>
          <View style={styles.view}>
            <CustomButton name={'Submit'} handleAction={handleSubmitForm} />
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
               <WaveIndicator color={Color.red} />
          </View>
      )}
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
    gap: moderateScaleVertical(10),
  },
  contactUsText: {
    fontFamily: FontFamily.Inter_ExtraBold,
    color: Color.primary,
    fontSize: textScale(20),
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    color: Color.black,
    fontSize: textScale(14),
    textAlign: 'center',
  },
  view: {
    width: '95%',
    alignSelf: 'center',
    padding: moderateScale(10),
    gap: moderateScaleVertical(10),
  },
  textInputBox: {
    borderWidth: 2,
    borderColor: Color.borderColor,
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: Color.borderColor,
    fontFamily: FontFamily.Inter_Medium,
    color: Color.black,
    fontSize: textScale(14),
  },
});
