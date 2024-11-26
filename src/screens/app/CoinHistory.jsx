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
import {WaveIndicator} from 'react-native-indicators';

const CoinHistory = ({route}) => {
  const {coinBalance} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPointHistory();
  }, []);

  const fetchPointHistory = async () => {
    setLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    // console.log(parsedData, 'Line 28');
    const data = {
      id: parsedData?.id,
    };
    try {
      const response = await pointHistory(data);
      if (response?.status_code === 200) {
        console.log(response?.data, 'Line 38');
        setData(response?.data);
      }
    } catch (error) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Something went wrong please try again',
      });
    } finally {
      setLoading(false);
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.card}>
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
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <WaveIndicator color={Color.red} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          {data.length > 0 ? (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
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
                No Transaction found.
              </Text>
            </View>
          )}
        </View>
      )}
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
    width: '95%',
    alignSelf: 'center',
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
