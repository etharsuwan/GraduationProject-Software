const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
    },
    receiverName: {
      type: String,
    },
    type: {
      type: Number,
    },
  },
  { timestamps: true }
);


const notification=mongoose.model('notification',NotificationSchema,'notification');
module.exports=notification;