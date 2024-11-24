import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Color from '../../utils/Colors';
import {moderateScale, textScale} from '../../utils/Responsive';
import FontFamily from '../../utils/FontFamily';
import {ImagePath} from '../../utils/ImagePath';
import {showMessage} from 'react-native-flash-message';
import Header from '../../component/Header';
import {addPoints} from '../../api/auth_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCoupon = ({route}) => {
  const {data} = route.params;
  const imageArray = [
    ImagePath.image1,
    ImagePath.image2,
    ImagePath.image4,
    ImagePath.image6,
    ImagePath.image8,
    ImagePath.image10,
    ImagePath.image11,
    ImagePath.image14,
    ImagePath.image16,
  ];

  const handleAdd = async item => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedData = JSON.parse(userData);
      console.log(parsedData, 'line 47');
      
      const data = {
        user_id: parsedData?.id,
        points: item?.point,
      };
      console.log(data, 'line 52');
      const response = await addPoints(data);
      console.log(response, 'Line 54');
    } catch (error) {
     
      const errorMessage = error?.message || 'An error occurred';
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: errorMessage, 
      });
    }
  };
  

  const renderItem = ({item}) => {
    const imageIndex = item.id - 1; 
    const imageSource = imageArray[imageIndex] || null;

    return (
      <TouchableOpacity
        style={styles.itemHolder}
        onPress={() => handleAdd(item)}>
        <ImageBackground
          source={imageSource}
          resizeMode="cover"
          style={{width: '100%', height: moderateScale(150)}}>
          <View style={styles.textOverlay}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <Header />
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
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
  },
  container: {
    width: '95%',
    alignSelf: 'center',
    flex: 1,
  },
  itemHolder: {
    borderWidth: 2,
    width: '100%',
    height: moderateScale(150),
    margin: moderateScale(5),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    borderColor: Color.borderColor,
    backgroundColor: Color.borderColor,
    alignSelf: 'center',
  },
  textOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: moderateScale(5),
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(16),
    color: Color.white,
    textAlign: 'center',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
