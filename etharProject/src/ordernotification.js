import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const PushController = () => {
  useEffect(() => {
    PushNotification.configure({
      onRegister: (token) => {
        console.log('TOKEN:', token);
      },
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification);
      },
      senderID: '1090501687137',
      popInitialNotification: true,
      requestPermissions: true
    });
  }, []);

   const sendNotification = (channelId, message) => {
    console.log('nkjnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
    const serverKey =
      'AAAApBQS52k:APA91bHfUS4KEHUguJ7ms9yC85IyyI-kpAW-h0Qtfh-A-xF9-vYdVoAlArdd783kV0zQo4PcONlCDMpOwQAA3msAwUt31IHCfnzD0PHh-noFhPkASd8F5c-oqnWFymrcFcR-r7DRmFpE';

      messaging().send(serverKey, messageData);
    };
    self.addEventListener('push', function(event) {
      event.waitUntil(
        self.registration.showNotification('Background Message Title', {
          body: 'Background Message Body',
        })
      );
    });  return null;

  };

export default PushController;
