// Create the channel 
const channel = new firebase.notifications.Android.Channel('channel_id', 'Channel Name', firebase.notifications.Android.Importance.Max) 
.setDescription('A natural description of the channel'); 
 
// Create the channel 
firebase.notifications().android.createChannel(channel); 
 
// Add users to the channel 
users.forEach(user => { 
firebase.messaging().subscribeToTopic(user.id); 
}); 

// Send a notification 
const notification = new firebase.notifications.Notification() 
.setNotificationId('notification_id') 
.setTitle('Notification Title') 
.setBody('Notification Message') 
.setData({ 
key1: 'value1', 
key2: 'value2', 
}); 

notification 
.android.setChannelId('channel_id') 
.android.setSmallIcon('ic_launcher'); 

firebase.notifications().sendNotification(notification);.