import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Colors';
import SecondaryHeader from '../../component/SecondaryHeader';
import FontFamily from '../../utils/FontFamily';
import {moderateScale, textScale} from '../../utils/Responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {pointHistory} from '../../api/auth_api';

const CoinHistory = ({route}) => {
  const {coinBalance} = route.params;
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchPointHistory();
  }, []);

  const fetchPointHistory = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    // console.log(parsedData, 'Line 28');
    setName(parsedData?.display_name);
    const data = {
      id: parsedData?.id,
    };
    try {
      const response = await pointHistory(data);
      if (response?.status_code === 200) {
        setData(response?.data);
      }
    } catch (error) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Something went wrong please try again',
      });
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.card}>
        <Text style={styles.header}>Player: {name}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{item.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Points Credited:</Text>
          <Text style={styles.value}>{item.point_credit}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Points Debited:</Text>
          <Text style={styles.value}>{item.point_debit}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Remark:</Text>
          <Text style={styles.value}>{item.remark}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <SafeAreaView />
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <SecondaryHeader />
      <View style={styles.nameHolder}>
        <Text style={styles.nameText}>
          Your Current Wallet Points {coinBalance}
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default CoinHistory;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
  nameText: {
    fontFamily: FontFamily.Inter_SemiBold,
    color: Color.white,
    fontSize: textScale(16),
    textAlign: 'center',
  },
  nameHolder: {
    borderWidth: 2,
    marginVertical: moderateScale(10),
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Color.red,
    borderColor: Color.red,
    borderRadius: moderateScale(5),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
  },
});
