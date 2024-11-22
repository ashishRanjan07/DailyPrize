import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Color from '../../utils/Colors';
import {ImagePath} from '../../utils/ImagePath';
import FontFamily from '../../utils/FontFamily';
import {textScale} from '../../utils/Responsive';
import CustomButton from '../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';

import notifee from '@notifee/react-native';

const Welcome = () => {
  const navigation = useNavigation();

  const onDisplayNotification = async() => {
    console.log('Clicked on the button');
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Daily Prize Application',
      body: 'Welcome to the Daily Prize Application',
      android: {
        channelId,
        smallIcon: 'ic_launcher', 
        pressAction: {
          id: 'default',
        },
      },
    });
    navigation.navigate('Login')
  };

  return (
    <View style={styles.main}>
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />

      <Image
        source={ImagePath.logo}
        resizeMode="cover"
        style={styles.imageStyle}
      />
      <Text style={styles.text}>START</Text>
      <Text style={[styles.text, {color: Color.orange}]}>YOUR</Text>
      <Text style={[styles.text, {color: Color.orange}]}>EARNING.</Text>
      <View style={{width: '70%'}}>
        <CustomButton
          name="Continue"
          handleAction={onDisplayNotification}
          // handleAction={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '30%',
  },
  text: {
    fontFamily: FontFamily.Lalezar,
    color: Color.black,
    fontSize: textScale(50),
  },
});
