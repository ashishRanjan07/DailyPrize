import {
  FlatList,
  Image,
  ImageBackground,
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
import {showMessage} from 'react-native-flash-message';

const AddCoupon = ({route}) => {
  const {data} = route.params;
  const imageArray = [
    ImagePath.image1,
    ImagePath.image2,
    ImagePath.image4,
    ImagePath.image6,
    ImagePath.image8,
    ImagePath.image10,
    ImagePath.image12,
    ImagePath.image13,
    ImagePath.image14,
  ];

  const handleAdd = async item => {
    console.log(item, 'line 49');
    showMessage({
      type: 'success',
      icon: 'success',
      message: `Coupon of ${item?.name} points are added Successfully`,
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemHolder}>
        <ImageBackground
          source={imageArray[index]}
          resizeMode="contain"
          style={{width: '100%', height: moderateScale(175)}}>
          <TouchableOpacity
            style={styles.buttonHolder}
            onPress={() => handleAdd(item)}>
            <Text style={styles.text}>Add</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          width: '98%',
          justifyContent: 'center',
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
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
    width: '47%',
    margin: moderateScale(5),
    alignItems: 'center',
    borderRadius: moderateScale(5),
    borderColor: Color.borderColor,
    backgroundColor: Color.borderColor,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(16),
    color: Color.white,
    padding: moderateScale(5),
    textAlign: 'center',
  },
  imageStyle: {
    width: moderateScale(200),
    height: moderateScale(100),
  },
  buttonHolder: {
    borderWidth: 2,
    bottom: 10,
    position: 'absolute',
    width: '75%',
    alignSelf: 'center',
    backgroundColor: Color.red,
    borderColor: Color.red,
    alignItems: 'center',
    borderRadius: moderateScale(5),
  },
  buttonText: {
    fontFamily: FontFamily.Inter_SemiBold,
    color: Color.blue,
    fontSize: textScale(14),
    padding: moderateScale(5),
  },
});
