import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Color from '../../utils/Colors';
import {WebView} from 'react-native-webview';
import {WaveIndicator} from 'react-native-indicators';
const TermAndCondition = () => {
    const [loading, setLoading] = useState(true);

    return (
      <View style={styles.main}>
        {loading && <WaveIndicator color={Color.primary} />}
        <WebView
          showsVerticalScrollIndicator={false}
          source={{
            uri: 'https://www.termsfeed.com/live/1a495a02-8414-47ca-aab5-5f27e86f46d2',
          }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          style={loading ? {display: 'none'} : {flex: 1}}
        />
      </View>
    );
  };

export default TermAndCondition

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Color.white,
      },
})