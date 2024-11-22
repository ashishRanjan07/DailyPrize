import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// Function to request notification permissions
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  } else {
    console.log('Permission not granted for notifications');
  }
}

// Function to get FCM token
export const getFcmToken = async () => {
  console.log("hii")
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      const newFcmToken = await messaging().getToken();
      if (newFcmToken) {
        console.log('New generated token:', newFcmToken);
        await AsyncStorage.setItem('fcmToken', newFcmToken);
      }
    } else {
      console.log('Existing token:', fcmToken);
    }
  } catch (error) {
    console.error('Error fetching FCM token:', error);
  }
};

// Listener for notifications
export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage && remoteMessage.notification) {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    }
  });

  // Handle notification in the foreground
  messaging().onMessage(async remoteMessage => {
    if (remoteMessage && remoteMessage.notification) {
      const {title, body} = remoteMessage.notification;
      console.log('Foreground notification received:', title, body);

      // Show local notification using PushNotification
      PushNotification.localNotification({
        channelId: 'fcm_channel',
        title: title || 'No Title',
        message: body || 'No Message',
        bigText: body || 'No Message',
        importance: 'high',
        playSound: true,
        soundName: 'default',
        vibrate: true,
        smallIcon: 'ic_launcher',
      });
    }
  });

  // Handle notification when the app is opened from a quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage && remoteMessage.notification) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};
