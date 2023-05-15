const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Notifee = require('notifee');
const firebase = require('firebase-admin');

const serviceAccount = require('./path/to/serviceAccountKey.json');

// Initialize Firebase
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

// Initialize Notifee
const notifee = new Notifee({
  apiKey: process.env.NOTIFEE_API_KEY,
});

const {foods} = require('./data/foods.js');

const app = express();

const push_types = {
  driver_accepted_order: {
    title: 'Order accepted',
    body: '[data] has accepted your order',
  },
  driver_picked_order: {
    title: 'Picked up order',
    body: '[data] has picked up your order from the restaurant',
  },
  driver_delivered_order: {
    title: 'Order delivered',
    body: '[data] has delivered your order',
  },
  driver_sent_message: {
    title: 'New message',
    body: '[data]',
  },

  customer_confirmed: {
    title: 'Customer confirmed',
    body: '[data] has confirmed',
  },
  customer_sent_message: {
    title: 'New message',
    body: '[data]',
  },
};

app.use(
  bodyParser.text({
    type: req => {
      const contype = req.headers['content-type'];
      if (contype === 'application/json') {
        return true;
      }
      return false;
    },
  }),
);

app.use(
  bodyParser.json({
    type: req => {
      const contype = req.headers['content-type'];
      if (contype !== 'application/json') {
        return true;
      }
      return false;
    },
  }),
);

app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use('/images', express.static('images'));

const verifyRequest = req => {
    const signature = crypto
      .createHmac('sha1', CHATKIT_WEBHOOK_SECRET)
      .update(req.body)
      .digest('hex');
  
    return signature === req.get('webhook-signature');
  };
  
  const getUser = async user_id => {
    try {
      const user = await chatkit.getUser({
        id: user_id,
      });
      return user;
    } catch (err) {
      console.log('error getting user: ', err);
      return false;
    }
  };
  
  const publishNotification = async (user_type, order_id, title, body) => {
    try {
      const payload = {
        notification: {
          title,
          body,
        },
      };
  
      if (user_type === 'driver') {
        // Send notification to customer using Firebase
        await firebase.messaging().sendToTopic(order_id, payload);
  
        // Send notification to driver using Notifee
        await notifee.sendToInterests(
            [order_id],
            payload,
          );
        } else {
          // Send notification to driver using Firebase
          await firebase.messaging().sendToTopic(order_id, payload);
    
          // Send notification to customer using Notifee
          await notifee.sendToInterests(
            [order_id],
            payload,
          );
        }
      } catch (err) {
        console.log('error publishing push notification: ', err);
      }
    };
    
    const notifyUser = async ({payload}) => {
      try {
        const msg = payload.messages[0];
        const sender_id = msg.user_id;
        const sender = await getUser(sender_id);
    
        const message = msg.parts[0].content.substr(0, 37) + '...';
        const order_id = msg.room_id;
    
        const user_type = sender.custom_data.user_type;
    
        if (user_type === 'driver') {
          publishNotification('customer', order_id, push_types.driver_sent_message.title, message);
        } else {
          publishNotification('driver', order_id, push_types.customer_sent_message.title, message);
        }
      } catch (err) {
        console.log('error notifying user: ', err);
      }
    };
    
   
    
    