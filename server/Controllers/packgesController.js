const Driver = require("../models/drivers");
const Customer = require("../models/customer");
const Package = require("../models/package");
const mongoose = require('mongoose');

const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");
const { nanoid } = require("nanoid");
const cloudinary = require("cloudinary");


// sendgrid
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);


exports.packagesUpdate=async (req, res) => {
  const { packageid, shipped } = req.body;
try{
  const package = await Package.findOneAndUpdate({ packageid: packageid }, { $set: { shipped:shipped } }, { new: true });
  if(package){
    res.status(200).json(package)
  }
}catch(error){
  return res.status(404).json({ error: 'Package not found' });

}

}

exports.packagesUpdateArrived=async (req, res) => {
  const { packageid, arrived } = req.body;
try{
  const package = await Package.findOneAndUpdate({ packageid: packageid }, { $set: { arrived:arrived } }, { new: true });
  if(package){
    res.status(200).json(package)
  }
}catch(error){
  return res.status(404).json({ error: 'Package not found' });

}

}

exports.updateDriverLocation = (req, res) => {
  const driverId = req.query.driverId;  
  console.log("driverId",driverId)

  if(!driverId){
    return res.status(500).json({
      message: 'userId not found'
    });
  }
  Driver.findById(driverId, (err, driver) => {
      if (err) {
          return res.status(500).json({
            
              message: 'Error fetching driver location',
              error: err
          });
      }
      if (!driver) {
          return res.status(404).json({
              message: 'Driver not found'
          });
      }
      res.status(200).json({
          driverLatitude: driver.driverlatitude,
          driverLongitude: driver.driverlongitude,
name:driver.name,
      }
      );
  });

}

exports.driverLocation = async (req, res) => {
  try {
    console.log("djjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
      const { driverId, driver_location } = req.body;
      const driver = await Driver.findOneAndUpdate({ _id: driverId }, { $set: { driverlatitude: driver_location.latitude, driverlongitude: driver_location.longitude } }, { new: true });
      if (!driver) {
          return res.status(404).json({ message: 'Driver not found' });
      } else {
          res.status(200).json({
              message: 'Driver location updated successfully',
              driver
          });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error updating driver location' });
  }
}

exports.addDriver = async (req, res) => {
  try {
    const { packageid, driverId,driver_location } = req.body;
    const package = await Package.findOne({ packageid });
console.log("driver that is added :",driverId)
    // check if package exists
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // update package with driver's information
    package.driver = mongoose.Types.ObjectId(driverId);
    package.driverlatitude = driver_location.latitude;
    package.driverlongitude = driver_location.longitude;
    await package.save();

    return res.json({ message: 'Driver added to package successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Failed to add driver to package' });
  }
};


exports.findPackage=async  (req, res) => {
  console.log("kjflkdjflkd")
  try {
    const { packageid } = req.body;
    console.log(packageid)
    // check if our db has user with that email

    const package = await Package.findOne({ packageid });
   
  if (!package) {
console.log("ffffffffffffffffff")  }else{  console.log(package)

  res.status(200).send(package);
}

      }catch(err) {
        console.log(err)
      }
}

exports.orderFetching=async (req, res) => {
  console.log("im heree");
  try{
  const orders = await Package.find();
  console.log(orders)
  if(!orders.driver){
      res.send(orders);
}
}catch(error){
    console.log(error)
  }
}

exports.foundPackage=async(req,res)=>{


    const packageid = req.query.packageId;

    Package.findOne({ packageid })
      .then(package => {
        if (!package) {
          return res.status(404).json({ success: false, message: 'Package not found' });
        }
  console.log(package)
        res.json({ success: true, data: package });
      })
      .catch(err => res.status(404).json({ success: false, message: 'Package not found' }));
  

}
exports.informrecipient= async(req,res)=>{
 console.log('hereeeeeee');
    const { packageid,recipientEmail } = req.body;
    // find user by email
      console.log(packageid);
    // prepare email
    const emailData = {
      from: 'atobapplication@gmail.com',
      to: recipientEmail,
      subject: "Your Package is on the way!",
      html: `<h1>Your package is on the way!</h1>
              <p>Your package id is: ${packageid}</p>
              <p>Track your package by clicking <a href="https://localhost:3001?packageid=${packageid}">here</a>.</p>`
  };

    // send email
    try {
        const data = await sgMail.send(emailData);
        console.log(data);
        res.json({ ok: true });
    } catch (err) {
        console.log(err);
        res.json({ ok: false });
    }

};

exports.driverPackages = async (req, res) => {
  const driver = req.query.driver;
  console.log(driver)
  if(!driver){
    return res.status(400).send({ message: 'Driver id is required' });
  }
  try {
      const packages = await Package.find({driver});
      if (!packages.length) {
          return res.status(404).send({ message: 'No packages found' });
      }
      res.send({ data: packages });
  } catch (error) {
      res.status(500).send({ message: 'Error retrieving packages', error });
  }
};


exports.packages = async (req, res) => {
  const userId = req.query.userId;
  try {
      const packages = await Package.find({userId});
      if (!packages.length) {
          return res.status(404).send({ message: 'No packages found' });
      }
      res.send({ data: packages });
  } catch (error) {
      res.status(500).send({ message: 'Error retrieving packages', error });
  }
};
exports.newOrder = async (req, res) => {
  try {
    const {
      packageid,
      userId,
      recipient,
      sender,
      recipientEmail,
      recipientPhone,
      recipientlatitude,
      recipientlongitude,
      senderlatitude,
      senderlongitude,
      deliveryDate,
      description,
      customer_address,
      to_address
    } = req.body;

    const newPackage = await new Package({
      packageid,
      userId,
      recipient,
      sender,
      recipientEmail,
      recipientPhone,
      recipientlatitude,
      recipientlongitude,
      senderlatitude,
      senderlongitude,
      deliveryDate,
      description,
      customer_address,
      to_address
    });
    try {
      const package = await newPackage.save();

      // Send email
      const emailData = {
        from: 'atobapplication@gmail.com',
        to: recipientEmail,
        subject: "Your Package is on the way!",
        html: `<h1>Track  Your order using this number: ${packageid}...`
      };
      sgMail.send(emailData);

      // Send package details as response
      res.status(200).send(package);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
