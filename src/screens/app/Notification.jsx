import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import Color from '../../utils/Colors';
import SecondaryHeader from '../../component/SecondaryHeader';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/Responsive';
import {useNavigation} from '@react-navigation/native';

const Notification = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
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
