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

const AddRoom = () => {
  const navigation = useNavigation();
  const [roomListData, setRoomListData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchRoomList();
  }, []);

  // Fetch Room Data
  const fetchRoomList = async () => {
    try {
      const response = await fetchAllVoucher();
      if (response.status_code === 200) {
        setRoomListData(response?.data);
      } else {
        console.error('Failed to fetch room data', response.message);
      }
    } catch (error) {
      console.error('Error fetching room list:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item, index}) => {
    const imageIndex = index % imageArray.length;

    return (
      <TouchableOpacity
        style={styles.itemHolder}
        onPress={() => navigation.navigate('Scratch Card', {item: item,image:imageArray[imageIndex]})}>
        <ImageBackground
          source={imageArray[imageIndex]}
          resizeMode="stretch"
          style={styles.backgroundImage}></ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <Header />
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <View style={styles.flatListHolder}>
          <FlatList
            data={roomListData}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>No rooms available</Text>}
          />
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
