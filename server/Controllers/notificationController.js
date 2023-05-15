const Driver = require("../models/drivers");
const Customer = require("../models/customer");
const Package = require("../models/package");
const mongoose = require('mongoose');
const Message = require("../models/message");
const Conversation=require("../models/conversation");
const notification=require("../models/notification");

const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");
const { nanoid } = require("nanoid");
const cloudinary = require("cloudinary");


// sendgrid
require("dotenv").config();

exports.notification=async (req, res) => {
  const newNotification = new notification(req.body);
  try {
    const savedNotification = await newNotification.save();
    res.send({savedNotification});

  } catch (error) {
    res.send({ status: "error" });
  }
}

exports.getNotification= async (req, res) => {
  try {
    const notifications = await notification.find({
        receiverName: req.params.receiverId,
    });
    res.send(notifications);

  } catch (error) {
    res.send({ status: "error" });
  }
}
