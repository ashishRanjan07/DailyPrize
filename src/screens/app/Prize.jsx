import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import {moderateScale} from '../../utils/Responsive';

const Prize = () => {
  // Sample leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      name: 'Alice',
      points: 1200,
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      rank: 2,
      name: 'Bob',
      points: 1100,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      rank: 3,
      name: 'Charlie',
      points: 900,
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      rank: 4,
      name: 'David',
      points: 850,
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      rank: 5,
      name: 'Eve',
      points: 800,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Leaderboard</Text>

      <FlatList
        data={leaderboardData}
        renderItem={({item}) => (
          <View style={styles.rankCard}>
            <Text style={styles.rankText}>{item.rank}</Text>
            <Image source={{uri: item.avatar}} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userPoints}>{item.points} pts</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.rank.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Prize;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
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
