import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Colors';
import {moderateScale, textScale} from '../../utils/Responsive';
import FontFamily from '../../utils/FontFamily';
import {fetchRewardItem} from '../../api/auth_api';
import Header from '../../component/Header';
import {WaveIndicator} from 'react-native-indicators';

const Reward = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReward();
  }, []);

  const fetchReward = async () => {
    try {
      setLoading(true);
      const response = await fetchRewardItem();
      if (response?.status_code === 200) {
        setData(response?.data || []);
      } else {
        Alert.alert('Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

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
    data.forEach(item => {
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
    <SafeAreaView/>
      {/* Header */}
      <Header />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <WaveIndicator color={Color.red} />
        </View>
      ) : (
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
                keyExtractor={rewardItem => rewardItem.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
          keyExtractor={(item, index) => `category-${index}`}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    padding: moderateScale(8),
    marginRight: moderateScale(15),
    alignItems: 'center',
    width: moderateScale(175),
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: Color.borderColor,
  },
  rewardImage: {
    width: moderateScale(100),
    height: moderateScale(80),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  rewardName: {
    fontFamily: FontFamily.Inter_SemiBold,
    fontSize: textScale(16),
    color: Color.black,
    textAlign: 'center',
    marginBottom: moderateScale(5),
  },
  rewardDescription: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(14),
    color: Color.darkGray,
  },
});
