import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export const showLocalNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: 'fcm_channel',
    autoCancel: true,
    bigText: message,
    subText: title,
    title: title,
    message: message,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    importance: 'high',
    priority: 'high',
  });
};
