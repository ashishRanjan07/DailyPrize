import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Colors';
import Header from '../../component/Header';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {withdrawalHistory} from '../../api/auth_api';
import {WaveIndicator} from 'react-native-indicators';
import {showMessage} from 'react-native-flash-message';
import FontFamily from '../../utils/FontFamily';

const WithDrawalHistory = () => {
  const [loading, setLoading] = useState(true);
  const [withdrawalData, setWithdrawalData] = useState([]);
  useEffect(() => {
    withdrawalHistoryData();
  }, []);

  const withdrawalHistoryData = async () => {
    setLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    const parseData = JSON.parse(userData);
    console.log(parseData, 'Line 43');
    try {
      const data = {
        id: parseData?.id,
      };
      const response = await withdrawalHistory(data);
      if (response?.status_code === 200) {
        setWithdrawalData(response?.data);
        console.log(response?.data, 'Line 88');
      }
    } catch (error) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: error,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.title}>Withdrawal Details</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{item.date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>UPI ID:</Text>
        <Text style={styles.value}>{item.upi_id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>₹{item.amount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Approval Status:</Text>
        <Text
          style={[
            styles.value,
            item.approve ? styles.approved : styles.pending,
          ]}>
          {item.approve ? 'Approved' : 'Pending'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.main}>
      <Header />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <WaveIndicator color={Color.red} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          {withdrawalData.length > 0 ? (
            <FlatList
              data={withdrawalData}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.list}
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  color: Color.primary,
                  fontFamily: FontFamily.Inter_Medium,
                  fontSize: textScale(18),
                }}>
                No Withdrawal history Found
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default WithDrawalHistory;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
  list: {
    padding: moderateScale(16),
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    marginVertical: moderateScale(8),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: moderateScale(3),
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: moderateScale(8),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScaleVertical(4),
  },
  label: {
    fontSize: textScale(14),
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: textScale(14),
    fontWeight: '400',
    color: '#333',
  },
  approved: {
    color: '#28a745',
    fontWeight: '600',
  },
  pending: {
    color: '#ffc107',
    fontWeight: '600',
  },
});
