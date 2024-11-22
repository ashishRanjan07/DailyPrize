import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale} from '../../utils/Responsive';
import Color from '../../utils/Colors';
import {showMessage} from 'react-native-flash-message';
import {fetchLeaderBoard} from '../../api/auth_api';

const Prize = () => {
  const [leaderboardData, setLeaderBoardData] = useState([]);

  useEffect(() => {
    fetchLeaderBoardData();
  }, []);

  const fetchLeaderBoardData = async () => {
    try {
      const response = await fetchLeaderBoard();
      if (response?.status_code === 200) {
        setLeaderBoardData(response?.data);
      }
    } catch (error) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: error,
      });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.white} />
      <Text style={styles.headerText}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        renderItem={({item}) => (
          <View style={styles.rankCard}>
            <Text style={styles.rankText}>{item.rank}</Text>
            <Image
              source={{uri: 'https://picsum.photos/200/300?grayscale'}}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userPoints}>{item.points} pts</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Prize;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  rankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
  },
  rankText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginRight: 15,
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(15),
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userPoints: {
    fontSize: 14,
    color: '#555',
  },
  listContainer: {
    paddingBottom: 20,
  },
});
