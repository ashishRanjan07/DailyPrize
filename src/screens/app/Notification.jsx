import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Colors';
import SecondaryHeader from '../../component/SecondaryHeader';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import {useNavigation} from '@react-navigation/native';
import FontFamily from '../../utils/FontFamily';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {notificationData} from '../../api/auth_api';
import {showMessage} from 'react-native-flash-message';
import {WaveIndicator} from 'react-native-indicators';

const Notification = () => {
  const navigation = useNavigation();
  const [notificationList, setNotificationList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchNotificationData();
  }, []);
  const fetchNotificationData = async () => {
    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedData = JSON.parse(userData);
      const data = {
        user_id: parsedData?.id,
      };
      console.log(data, 'Line 50');
      const response = await notificationData(data);
      if (response?.status_code === 200) {
        setNotificationList(response?.data);
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
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item?.master_name)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.date}>{item.date}</Text>
        <Text
          style={[
            styles.status,
            item.status === 1 ? styles.active : styles.inactive,
          ]}>
          {item.status === 1 ? 'Active' : 'Inactive'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.main}>
      <SecondaryHeader />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <WaveIndicator color={Color.red} />
        </View>
      ) : (
        <View style={{flex:1}}>
          {notificationList.length > 0 ? (
            <FlatList
              data={notificationList}
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
                No Notification Found
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
  list: {
    padding: moderateScale(16),
  },
  card: {
    backgroundColor: '#f9f9f9',
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
    fontSize: textScale(16),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: moderateScale(4),
  },
  description: {
    fontSize: textScale(14),
    color: '#555',
    marginBottom: moderateScale(8),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: textScale(12),
    color: '#888',
  },
  status: {
    fontSize: textScale(12),
    fontWeight: '600',
    paddingVertical: moderateScaleVertical(2),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(12),
    textTransform: 'uppercase',
  },
  active: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  inactive: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
});
