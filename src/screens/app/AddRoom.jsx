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
import {fetchAllVoucher} from '../../api/auth_api';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import FontFamily from '../../utils/FontFamily';
import Header from '../../component/Header';
import {useNavigation} from '@react-navigation/native';
import {WaveIndicator} from 'react-native-indicators';

const AddRoom = ({route}) => {
  const {data} = route.params;
  console.log(data, 'Line 24');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // Sample images array
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

 
;

  return (
    <View style={styles.main}>
      <Header />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <WaveIndicator color={Color.red} />
        </View>
      ) : (
        <View style={styles.flatListHolder}>
          <TouchableOpacity
            style={styles.itemHolder}
            onPress={() =>
              navigation.navigate('Scratch Card', {
                item: data,
                image: imageArray[data?.id],
              })
            }>
            <ImageBackground
              source={imageArray[data?.id]}
              resizeMode="stretch"
              style={styles.backgroundImage}
            />
          </TouchableOpacity>
        </View>
      )}
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
    width: '98%',
    alignItems: 'center',
    borderColor: Color.borderColor,
    backgroundColor: Color.borderColor,
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    height: moderateScale(200),
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  flatListHolder: {
    flex: 1,
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
  loadingText: {
    fontFamily: FontFamily.Inter_Bold,
    fontSize: textScale(18),
    color: Color.black,
    textAlign: 'center',
    marginTop: moderateScaleVertical(50),
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
});
