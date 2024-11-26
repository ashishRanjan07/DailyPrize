import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Colors';
import Header from '../../component/Header';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import {depositHistory} from '../../api/auth_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WaveIndicator} from 'react-native-indicators';
import { showMessage } from 'react-native-flash-message';

const DepositHistory = () => {
  const [depositData, setDepositData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    depositHistoryData();
  }, []);
  const depositHistoryData = async () => {
    setLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    const parseData = JSON.parse(userData);
    console.log(parseData, 'Line 43');
    try {
      const data = {
        id: parseData?.id,
      };
      const response = await depositHistory(data);
      if (response?.status_code === 200) {
        console.log(response?.data, 'Line 104');
        setDepositData(response?.data);
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
      <Text style={styles.transactionId}>Transaction ID: {item.id}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{item.date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{item.phone_number}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>₹{item.amount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Remark:</Text>
        <Text style={styles.value}>{item.remark}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Approval Status:</Text>
        <Text
          style={[
            styles.value,
            item.approve === 0 ? styles.pending : styles.approved,
          ]}>
          {item.approve === 0 ? 'Pending' : 'Approved'}
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
        <FlatList
          data={depositData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default DepositHistory;

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
    borderRadius: 8,
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
  transactionId: {
    fontSize: textScale(16),
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
