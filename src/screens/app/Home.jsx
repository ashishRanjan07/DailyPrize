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

const Home = () => {
  const navigation = useNavigation();
  const [waitingTime, setWaitingTime] = useState(3);
  const [activeSection, setActiveSection] = useState(null);
  const [userPoints, setUserPoints] = useState(0);

  const width = Dimensions.get('window').width;

  const adsImages = [
    ImagePath.ads, 
    ImagePath.ads2, 
  ];


  useEffect(() => {
    if (waitingTime > 0) {
      const interval = setInterval(() => {
        setWaitingTime(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [waitingTime]);

  const increasePoints = points => {
    setUserPoints(prevPoints => prevPoints + points);
  };

  return (
    <View style={styles.main}>
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      {/* Header Holder */}
      <View style={styles.headerHolder}>
        <View style={styles.headerFirstView}>
          <Image source={ImagePath.timer} style={styles.timerImage} />
          <Text style={styles.amountText}>₹{userPoints}</Text>
        </View>
        <Image
          source={ImagePath.logo}
          resizeMode="contain"
          style={styles.logo}
        />

        <TouchableOpacity style={{width: '25%', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="bell-badge"
            size={textScale(30)}
            color={Color.red}
          />
        </TouchableOpacity>
      </View>
      {/* View Holder */}
      <View style={styles.nameHolder}>
        <Text style={styles.nameText}>Welcome Ashish Ranjan</Text>
      </View>
      {waitingTime > 0 ? (
        <WaitingContainer waitingTime={waitingTime} />
      ) : (
        <>
          {activeSection === 'Add Coupon' ? (
            <AddCoupon
              increasePoints={increasePoints}
              setActiveSection={setActiveSection}
            />
          ) : activeSection === 'Scratch Card' ? (
            <ScratchCardContainer setActiveSection={setActiveSection} />
          ) : (
            <>
              <TouchableOpacity
                style={styles.addCouponHolder}
                onPress={() => setActiveSection('Add Coupon')}>
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
                onPress={() => setActiveSection('Scratch Card')}>
                <View style={styles.innerView}>
                  <View style={styles.textView}>
                    <Text style={styles.text}>🏆Scratch Card💎👉</Text>
                    <Text
                      style={[
                        styles.text,
                        {fontSize: textScale(12), color: Color.black},
                      ]}>
                      🎉Click here to Scratch🎖️
                    </Text>
                  </View>
                  <Image
                    source={ImagePath.scratch}
                    resizeMode="contain"
                    style={styles.couponImage}
                  />
                </View>
              </TouchableOpacity>
              {/* Ads Image  */}
              <View style={{alignSelf:'center'}}>
              <Carousel
                loop
                width={width - moderateScale(30)}
                height={moderateScale(150)}
                autoPlay={true}
                data={adsImages}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => (
                  <Image
                    source={item}
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
  headerHolder: {
    height: moderateScale(75),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
  },
  headerFirstView: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10),
    flexDirection: 'row',
    gap: moderateScale(2),
  },
  timerImage: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  logo: {
    width: moderateScale(120),
    height: moderateScale(129),
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
});
