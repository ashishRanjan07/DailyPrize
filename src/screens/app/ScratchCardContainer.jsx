import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ScratchCard} from 'rn-scratch-card';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {showMessage} from 'react-native-flash-message';
import Header from '../../component/Header';
import {gameRunDuration, scratchRandomPoint} from '../../api/auth_api';
import Color from '../../utils/Colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import FontFamily from '../../utils/FontFamily';

const ScratchCardContainer = ({route}) => {
  const {item, image} = route.params;
  const navigation = useNavigation();
  const [point, setPoint] = useState(0);
  const [scratchComplete, setScratchComplete] = useState(false);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [timerActive, setTimerActive] = useState(true);
  const intervalRef = useRef(null);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    fetchGameDuration();
  }, []);

  const fetchGameDuration = async () => {
    try {
      const response = await gameRunDuration();
      if (response?.status_code === 200 && response?.data?.length > 0) {
        const time = response.data[0].time;
        setRemainingTime(
          typeof time === 'number' && !isNaN(time) ? time * 60 : 60,
        );
      }
    } catch (error) {
      console.error('Error fetching game duration:', error);
      setRemainingTime(60);
    }
  };

  const handleScratch = async progress => {
    if (progress >= 75 && !apiCalled) {
      setApiCalled(true);
      try {
        const data = {
          amount: item?.amount,
        };
        const response = await scratchRandomPoint(data);
        console.log(response?.data[0]?.prize, 'line 503');
        const prize = response?.data[0]?.prize;
        if (response?.status_code === 200) {
          Alert.alert('Success', `you have won${prize}`);
          setPoint(prevPoint => prevPoint + prize);
          setScratchComplete(true);
          setNextButtonVisible(true);
          console.log('API call successful, response:', response);
        } else {
          console.error('Unexpected API response:', response);
        }
      } catch (error) {
        console.error('Error during scratch API call:', error);
        showMessage({
          type: 'warning',
          icon: 'warning',
          message: 'Error fetching scratch reward.',
        });
      }
    }
  };

  const handleNext = () => {
    navigation.navigate('Home');
  };

  // Timer logic
  useEffect(() => {
    if (timerActive) {
      intervalRef.current = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setTimerActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [timerActive]);

  useEffect(() => {
    if (!timerActive) {
      setNextButtonVisible(false);
    }
  }, [timerActive]);

  return (
    <View style={{flex: 1, backgroundColor: Color.white}}>
      <Header />
      <View style={styles.pointsHolder}>
        <FontAwesome6 name="wallet" size={textScale(25)} color={Color.white} />
        <Text style={styles.text}>Your wallet Point: {point}</Text>
      </View>
      <Text style={styles.text2}>
        Please scratch the card within: {remainingTime}s
      </Text>
      <View style={styles.container}>
        <Image
          source={require('./scratch_background.png')}
          style={styles.background_view}
        />
        <ScratchCard
          source={image}
          brushWidth={100}
          onScratch={progress => {
            handleScratch(progress);
          }}
          style={styles.scratch_card}
          disabled={scratchComplete || !timerActive}
        />
      </View>

      {nextButtonVisible && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ScratchCardContainer;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    marginTop: moderateScaleVertical(20),
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  background_view: {
    position: 'absolute',
    width: moderateScale(350),
    height: moderateScale(350),
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  scratch_card: {
    width: moderateScale(400),
    height: moderateScale(350),
    backgroundColor: 'transparent',
    borderRadius: moderateScale(20),
    overflow: 'hidden',
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    color: Color.white,
    fontSize: textScale(16),
  },
  nextButton: {
    borderWidth: 2,
    borderColor: Color.borderColor,
    width: '80%',
    alignItems: 'center',
    backgroundColor: Color.borderColor,
    borderStyle: 'dashed',
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(10),
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  nextButtonText: {
    fontFamily: FontFamily.Inter_Medium,
    color: Color.blue,
    fontSize: textScale(16),
  },
  text2: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(14),
    color: Color.red,
    textAlign: 'center',
    marginTop: moderateScaleVertical(14),
  },
  pointsHolder: {
    borderWidth: 2,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Color.red,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    borderColor: Color.red,
    gap: moderateScale(10),
  },
});
