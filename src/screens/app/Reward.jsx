import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Colors';
import {ImagePath} from '../../utils/ImagePath';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, textScale} from '../../utils/Responsive';
import FontFamily from '../../utils/FontFamily';
import { fetchRewardItem } from '../../api/auth_api';

const Reward = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchReward();
  }, []);

  const fetchReward = async () => {
    try {
      const response = await fetchRewardItem();
      if (response?.status_code === 200) {
        setData(response?.data || []);
      } else {
        Alert.alert('Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  // Function to render individual reward items
  const renderRewardItem = ({item}) => (
    <View style={styles.rewardCard}>
      <Image
        source={{uri: item.image_url}}
        resizeMode="contain"
        style={styles.rewardImage}
      />
      <Text style={styles.rewardName}>{item.name}</Text>
      <Text style={styles.rewardDescription}>{item.description}</Text>
    </View>
  );

  const groupRewardsByType = () => {
    const grouped = {};
    data.forEach((item) => {
      if (!grouped[item.type_name]) {
        grouped[item.type_name] = [];
      }
      grouped[item.type_name].push(item);
    });
    return grouped;
  };

  const groupedData = groupRewardsByType();

  return (
    <View style={styles.main}>
      {/* Header */}
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

      {/* Render Rewards */}
      <FlatList
        data={Object.keys(groupedData)}
        renderItem={({item}) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
            <FlatList
              data={groupedData[item]}
              renderItem={renderRewardItem}
              keyExtractor={(rewardItem) => rewardItem.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        keyExtractor={(item, index) => `category-${index}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Reward;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
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
  amountText: {
    fontFamily: FontFamily.Inter_SemiBold,
    fontSize: textScale(18),
    color: Color.blue,
  },
  categoryContainer: {
    marginBottom: moderateScale(20),
    paddingHorizontal: moderateScale(15),
    alignItems: 'center',
  },
  categoryTitle: {
    fontFamily: FontFamily.Inter_Bold,
    fontSize: textScale(20),
    color: Color.black,
    marginBottom: moderateScale(10),
  },
  rewardCard: {
    backgroundColor: Color.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    marginRight: moderateScale(15),
    alignItems: 'center',
    width: moderateScale(155),
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: Color.borderColor,
    
  },
  rewardImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  rewardName: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(14),
    color: Color.black,
    textAlign: 'center',
    marginBottom: moderateScale(5),
  },
  rewardDescription: {
    fontFamily: FontFamily.Inter_Regular,
    fontSize: textScale(12),
    color: Color.darkGray,
    textAlign: 'center',
  },
});
