import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Color from '../../utils/Colors';
import Header from '../../component/Header';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';

const WithDrawalHistory = ({route}) => {
  const {data} = route.params;

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.title}>Withdrawal Details</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{item.date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Account Number:</Text>
        <Text style={styles.value}>{item.account_no}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>IFC Code:</Text>
        <Text style={styles.value}>{item.ifc_code}</Text>
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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
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
