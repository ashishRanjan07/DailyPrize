import {Image, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {ScratchCard} from 'rn-scratch-card';
import Color from '../../utils/Colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import {ImagePath} from '../../utils/ImagePath';
import FontFamily from '../../utils/FontFamily';
import {gameRunDuration} from '../../api/auth_api';
import { useNavigation } from '@react-navigation/native';

const ScratchCardContainer = () => {
  const navigation = useNavigation();
  const [point, setPoint] = useState(0);
  const [scratchComplete, setScratchComplete] = useState(false);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [timerActive, setTimerActive] = useState(true);
  const [cardKey, setCardKey] = useState(0);
  const intervalRef = useRef(null);
  const [hasScratched, setHasScratched] = useState(false);
  useEffect(() => {
    fetchGameDuration();
  }, []);

  const fetchGameDuration = async () => {
    try {
      const response = await gameRunDuration();
      console.log(response, 'Line 28');
      if (response?.status_code === 200 && response?.data?.length > 0) {
        // Ensure the time is a valid number and multiply by 60 to convert to seconds
        const time = response.data[0].time;
        if (typeof time === 'number' && !isNaN(time)) {
          setRemainingTime(time * 60);  // Set remaining time in seconds
        } else {
          console.error('Invalid time value:', time);
          setRemainingTime(60);  // Default time if invalid
        }
      }
    } catch (error) {
      console.error('Error fetching game duration:', error);
      setRemainingTime(60);  // Default time in case of an error
    }
  };
  

  const handleScratch = (isScratched) => {
    if (isScratched && !scratchComplete && !hasScratched) {
      setScratchComplete(true);
      setPoint((prevPoint) => prevPoint + 20);
      setHasScratched(true);  // Mark card as scratched
      setNextButtonVisible(true);
    }
  };

  const handleNext = () => {
    // setScratchComplete(false);
    // setNextButtonVisible(false);
    // setCardKey((prevKey) => prevKey + 1);
    // setHasScratched(false); // Reset for the next round
    Alert.alert("Success","Scratch Successfully");
    navigation.navigate('Home')
  };

  useEffect(() => {
    if (timerActive) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
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
    <>
      <View style={styles.balanceHolder}>
        <Image
          source={ImagePath.timer}
          resizeMode="contain"
          style={styles.timerImageHolder}
        />
        <Text style={styles.text}>Your wallet Point: {point}</Text>
      </View>

      <Text style={styles.text2}>Your Remaining time: {remainingTime}s</Text>  

      <View style={styles.container}>
        <Image
          source={require('./scratch_background.png')}
          style={styles.background_view}
        />
        <ScratchCard
          key={cardKey}
          source={ImagePath.scratchCard}
          brushWidth={50}
          onScratch={(scratched) => handleScratch(scratched)}
          style={styles.scratch_card}
          disabled={hasScratched || !timerActive}  
        />
      </View>

      {nextButtonVisible && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
    </>
  );
};


export default ScratchCardContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  background_view: {
    position: 'absolute',
    width: moderateScale(250),
    height: moderateScale(250),
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 16,
  },
  scratch_card: {
    width: moderateScale(250),
    height: moderateScale(250),
    backgroundColor: 'transparent',
  },
  balanceHolder: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    height: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(5),
  },
  timerImageHolder: {
    width: moderateScale(50),
    height: moderateScale(50),
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    color: Color.red,
    fontSize: textScale(16),
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(10),
  },
  timerText: {
    fontFamily: FontFamily.Inter_Medium,
    color: Color.white,
    fontSize: textScale(16),
    backgroundColor: Color.red,
    padding: moderateScale(5),
    borderRadius: moderateScale(8),
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
  },
  nextButtonText: {
    fontFamily: FontFamily.Inter_Medium,
    color: Color.blue,
    fontSize: textScale(16),
  },
  text2: {
    fontFamily: FontFamily.Inter_Medium,
    color: Color.blue,
    textAlign: 'center',
    marginTop: moderateScaleVertical(10),
  },
});
