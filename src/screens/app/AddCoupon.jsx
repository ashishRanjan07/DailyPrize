import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Color from '../../utils/Colors';
import Data from '../../assets/json/AddPoints.json';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import FontFamily from '../../utils/FontFamily';
import {ImagePath} from '../../utils/ImagePath';
import { showMessage } from 'react-native-flash-message';

const AddCoupon = ({ increasePoints, setActiveSection }) => {

  const handleAddCoupon = (item) => {
    increasePoints(item.points); 
    showMessage({
      message: `${item.points} Added!!`,
      type: "success",
      icon: 'success'
    });
    setActiveSection(null); 
  };

  return (
    <View style={styles.main}>
      <View style={{ width: '95%', overflow: 'hidden' }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Data.map(item => (
            <View style={styles.itemHolder} key={item.id}>
              <Text style={styles.text}>{item?.points}</Text>
              <Image
                source={ImagePath.voucher}
                resizeMode="cover"
                style={styles.imageStyle}
              />
              <TouchableOpacity style={styles.buttonHolder} onPress={() => handleAddCoupon(item)}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default AddCoupon;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemHolder: {
    borderWidth: 2,
    width: moderateScale(300),
    backgroundColor: Color.orange,
    height: moderateScale(225),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    borderColor: Color.orange,
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScaleVertical(10),
  },
  text: {
    fontFamily: FontFamily.Inter_Bold,
    fontSize: textScale(20),
    color: Color.blue,
    textAlign: 'center',
  },
  imageStyle: {
    width: moderateScale(200),
    height: moderateScale(100),
  },
  buttonHolder: {
    borderWidth: 2,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: moderateScale(5),
    backgroundColor: Color.borderColor,
    borderColor: Color.borderColor,
    borderStyle: 'dotted'
  },
  buttonText: {
    fontFamily: FontFamily.Inter_SemiBold,
    color: Color.blue,
    fontSize: textScale(14),
    padding: moderateScale(5)
  }
});
