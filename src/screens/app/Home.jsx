import {
  Dimensions,
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
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from '../../utils/Responsive';
import {ImagePath} from '../../utils/ImagePath';
import FontFamily from '../../utils/FontFamily';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import WaitingContainer from '../../component/WaitingContainer';
import AddCoupon from './AddCoupon';
import ScratchCardContainer from './ScratchCardContainer';
import Carousel from 'react-native-reanimated-carousel';
import {showMessage} from 'react-native-flash-message';
import {fetchAllVoucher, fetchBannerImage} from '../../api/auth_api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';

const Home = () => {
  const navigation = useNavigation();
  const [waitingTime, setWaitingTime] = useState(3);
  const [userPoints, setUserPoints] = useState(100);
  const [couponData, setCouponData] = useState([]);

  const width = Dimensions.get('window').width;

  const [adsImages, setAdsImages] = useState([]);

  useEffect(() => {
    fetchBannerImageFunction();
    fetchCouponList();
  }, []);
  // Fetch Banner Images
  const fetchBannerImageFunction = async () => {
    try {
      const response = await fetchBannerImage();
      if (response?.status_code === 200) {
        // Map API response to image URLs
        const images = response.data.map(item => ({
          id: item.id,
          banner_img: item.banner_img,
        }));
        setAdsImages(images);
      } else {
        showMessage({
          type: 'warning',
          icon: 'warning',
          message: 'No banners available to display!',
        });
      }
    } catch (error) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Failed to fetch banners!',
      });
    }
  };
  // Fetch All Coupon LIst
  const fetchCouponList = async () => {
    console.log('Fetching All Coupon List');
    try {
      const response = await fetchAllVoucher();
      if (response?.status_code === 200) {
        setCouponData(response?.data);
        console.log(response?.data, 'Line 70');
      }
    } catch (error) {
      showMessage({
        icon: 'warning',
        type: 'warning',
        message: error,
      });
    }
  };
  useEffect(() => {
    if (waitingTime > 0) {
      const interval = setInterval(() => {
        setWaitingTime(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [waitingTime]);

  return (
    <View style={styles.main}>
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <Header />
      {/* View Holder */}
      <View style={styles.nameHolder}>
        <Text style={styles.nameText}>Welcome Ashish Ranjan</Text>
      </View>
      {userPoints === 0 ? (
        <WaitingContainer waitingTime={waitingTime} data={couponData} />
      ) : (
        <>
          <TouchableOpacity
            style={styles.addCouponHolder}
            onPress={() =>
              navigation.navigate('Add Coupon', {data: couponData})
            }>
            <View style={styles.innerView}>
              <View style={styles.textView}>
                <Text style={styles.text}>🏷️Add Coupon🎁</Text>
                <Text
                  style={[
                    styles.text,
                    {fontSize: textScale(12), color: Color.black},
                  ]}>
                  💥Click here to add Coupon🎟
                </Text>
              </View>
              <Image
                source={ImagePath.coupon}
                resizeMode="contain"
                style={styles.couponImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addCouponHolder}
            onPress={() => navigation.navigate('Join Room List')}>
            <View style={styles.innerView}>
              <View style={styles.textView}>
                <Text style={styles.text}>Play Scratch and Win</Text>
                <Text
                  style={[
                    styles.text,
                    {fontSize: textScale(12), color: Color.black},
                  ]}>
                  ⌛Next game will Start🎖️{'\n'} in 10:00mins
                </Text>
                <View style={styles.buttonHolder}>
                  <Text style={[styles.text, {padding: moderateScale(2)}]}>
                    Join Now
                  </Text>
                </View>
              </View>
              <Image
                source={ImagePath.scratch}
                resizeMode="contain"
                style={styles.couponImage}
              />
            </View>
          </TouchableOpacity>
          {/* Ads Image  */}
          <View style={{alignSelf: 'center'}}>
            <Carousel
              loop
              width={width - moderateScale(30)}
              height={moderateScale(150)}
              autoPlay={true}
              data={adsImages}
              scrollAnimationDuration={1000}
              renderItem={({item}) => (
                <Image
                  source={{uri: item.banner_img}}
                  resizeMode="stretch"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: moderateScale(10),
                  }}
                />
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
  amountText: {
    fontFamily: FontFamily.Inter_SemiBold,
    fontSize: textScale(18),
    color: Color.blue,
  },
  timerImage: {
    width: moderateScale(25),
    height: moderateScale(25),
  },

  addCouponHolder: {
    borderWidth: 2,
    marginVertical: moderateScaleVertical(20),
    width: '90%',
    alignSelf: 'center',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    borderColor: Color.borderColor,
    backgroundColor: Color.borderColor,
  },
  text: {
    fontFamily: FontFamily.Inter_SemiBold,
    color: Color.blue,
    fontSize: textScale(15),
    textAlign: 'center',
    lineHeight: scale(20),
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView: {
    width: '70%',
    alignItems: 'center',
    gap: moderateScaleVertical(5),
  },
  couponImage: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  nameText: {
    fontFamily: FontFamily.Inter_SemiBold,
    color: Color.white,
    fontSize: textScale(16),
    textAlign: 'center',
  },
  nameHolder: {
    borderWidth: 2,
    marginVertical: moderateScale(10),
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Color.red,
    borderColor: Color.red,
    borderRadius: moderateScale(5),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonHolder: {
    borderWidth: 2,
    width: '50%',
    alignItems: 'center',
    backgroundColor: Color.red,
    borderColor: Color.red,
    borderRadius: moderateScale(5),
  },
});
