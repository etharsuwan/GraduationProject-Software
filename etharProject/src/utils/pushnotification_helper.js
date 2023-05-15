import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

 export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken()
  }
}

const GetFCMToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmtoken');
    if (!fcmToken) {
      try {
        fcmToken = await messaging().getToken();
        console.log('New FCM token:', fcmToken);
        await AsyncStorage.setItem('fcmtoken', fcmToken);
      } catch (error) {
        console.log(error, 'Error getting FCM token');
      }
    }
  };

// async function getFCMToken() {
//     try {
//       // Request permission to send notifications
//       const authorizationStatus = await messaging().requestPermission();
  
//       // Check if permission was granted
//       if (authorizationStatus) {
//         // Get the FCM token
//         const fcmToken = await messaging().getToken();
//         console.log('FCM token:', fcmToken);
  
//         // Store the FCM token in AsyncStorage
//         await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//     } catch (error) {
//       console.log('Error getting FCM token:', error);
//     }
//   }
  
// export const NotificationListner=()=>{
//         // Assume a message-notification contains a "type" property in the data payload of the screen to open

//      // Assume a message-notification contains a "type" property in the data payload of the screen to open

//      messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log(
//           'Notification caused app to open from background state:',
//           remoteMessage.notification,
//         );
//       });
//      // Check whether an initial notification is available
//      messaging()
//      .getInitialNotification()
//      .then(remoteMessage => {
//        if (remoteMessage) {
//          console.log(
//            'Notification caused app to open from quit state:',
//            remoteMessage.notification,
//          );
//        }
//      });
//      messaging().onMessage(async remoteMessage=>{
//         console.log("notification on froground state ...",remoteMessage);
//      })
// }