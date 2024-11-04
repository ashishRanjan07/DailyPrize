import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Color from '../../utils/Colors';

const Refer = () => {
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <SafeAreaView style={{backgroundColor: Color.white}} />
    </View>
  );
};

export default Refer;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
});
