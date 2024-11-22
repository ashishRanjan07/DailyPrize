import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Colors';
import {fetchAllVoucher, timer} from '../../api/auth_api';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import CustomButton from '../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';
import FontFamily from '../../utils/FontFamily';
import {teal100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const AddRoom = () => {
  const navigation = useNavigation();
  const imageArray = [
    require('../../assets/image/Room1.png'),
    require('../../assets/image/Room2.png'),
    require('../../assets/image/Room3.png'),
    require('../../assets/image/Room4.png'),
    require('../../assets/image/Room5.png'),
    require('../../assets/image/Room6.png'),
    require('../../assets/image/Room7.png'),
    require('../../assets/image/Room8.png'),
    require('../../assets/image/Room9.png'),
    require('../../assets/image/Room10.png'),
  ];
  const [roomListData, setRoomListData] = useState([]);

  useEffect(() => {
    fetchRoomList();
  }, []);

  const fetchRoomList = async () => {
    const response = await fetchAllVoucher();
    if (response.status_code === 200) {
      setRoomListData(response?.data);
    }
  };

  const renderItem = async({item, index}) => {
    return (
      <View style={styles.itemHolder} key={index}>
        <ImageBackground
          source={imageArray[index]}
          resizeMode="contain"
          style={styles.backgroundImage}>
          <Text style={styles.roomNameHolder}>Room {item?.amount}</Text>
          <Text
            style={[
              styles.roomNameHolder,
              {
                width: '80%',
                fontSize: textScale(12),
                position: 'absolute',
                bottom: 25,
                padding: moderateScale(2),
              },
            ]}>
            Game Starts in{'\n'} 
          </Text>
        </ImageBackground>
        <TouchableOpacity
          onPress={() => navigation.navigate('Scratch Card',{item:item})}
          style={styles.buttonHolder}>
          <Text style={styles.buttonText}>Join Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.flatListHolder}>
        <FlatList
          data={roomListData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={index => index}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default AddRoom;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
  itemHolder: {
    borderWidth: 2,
    margin: moderateScale(5),
    width: '46%',
    alignItems: 'center',
    borderColor: Color.borderColor,
    backgroundColor: Color.borderColor,
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    height: moderateScale(220),
  },
  backgroundImage: {
    width: '100%',
    height: '90%',
  },
  flatListHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomNameHolder: {
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: FontFamily.Inter_Bold,
    fontSize: textScale(14),
    color: Color.black,
    backgroundColor: Color.borderColor,
    elevation: moderateScale(10),
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    marginTop: moderateScaleVertical(10),
    textAlign: 'center',
  },
  buttonHolder: {
    borderWidth: 2,
    marginTop: moderateScale(-10),
    width: '60%',
    alignItems: 'center',
    borderRadius: moderateScale(5),
    backgroundColor: Color.red,
    borderColor: Color.red,
  },
  buttonText: {
    color: Color.white,
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(14),
  },
});
