const Driver = require("../models/drivers");
const Customer = require("../models/customer");
const Package = require("../models/package");
const mongoose = require('mongoose');
const Message = require("../models/message");
const Conversation=require("../models/conversation");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");
const { nanoid } = require("nanoid");
const cloudinary = require("cloudinary");


// sendgrid
require("dotenv").config();





exports.createChat=async(req,res)=>{
    const newChat= new Conversation({
        members:[req.body.senderId,req.body.receiverId],
    })
try {
    const result=await newChat.save();
    req.status(200).json(result);
} catch (error) {
    res.status(500).json(error);
}
}

exports.findChat=async (req,res)=>{
    const firstId = req.query.firstId;  
    const secondId = req.query.secondId;  

try {
    const chat=await Conversation.findOne({
        members:{$all: [firstId,secondId]}
    })

res.status(200).json(chat);
} catch (error) {
    res.status(500).json(error);
}
}

exports.addMessage=async(req,res)=>{
    const conversationId=req.body.conversationId;
    const {senderId,text}=req.body;
    console.log("Conversation ID: ", conversationId);
        const message=new Message({
        conversationId,
        senderId,
        text
    })
    try{
        const result=await message.save();
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json(error);
    }
}

exports.getMessages=async(req,res)=>{
    console.log("here!!!")
    const conversationId = req.query.conversationId;  
    if(conversationId){
        try {
            const result=await Message.find({conversationId: conversationId});
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(404).json({error: "conversationId not found"});
    }
}

exports.customers=async (req, res) => {
    
    const userId = req.query.driverId;  

  try {
    // Find the conversation where the current user is a member
    const conversation = await Conversation.findOne({ members:userId });
    
    // Find all messages in the conversation
    const messages = await Message.find({ conversationId: conversation._id });
    
    // Return the conversation and messages in the response
    res.json({ conversation, messages });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching conversation and messages' });
  }
}