import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: 'fcm_channel',
    channelName: 'FCM Notifications',
    channelDescription: 'A channel for Firebase Cloud Messaging notifications',
    playSound: true,
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  created => console.log(`Notification channel created: ${created}`),
);
