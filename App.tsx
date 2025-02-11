import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './src/navigation/AuthNavigation';
import FlashMessage from 'react-native-flash-message';
import {
  requestUserPermission,
  notificationListener,
} from './src/component/NotificationServices';
// import './src/services/PushNotificationService';
import {Text, View} from 'react-native';
const App = () => {
  // useEffect(() => {
  //   requestUserPermission();
  //   notificationListener();
  // }, []);

  return (
    <>
      <NavigationContainer>
        <AuthNavigation />
        <FlashMessage
          position={'top'}
          animated={true}
          titleStyle={{textTransform: 'capitalize'}}
        />
      </NavigationContainer>
    </>
  );
};

export default App;
