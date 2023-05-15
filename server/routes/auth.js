const express = require('express');
const router = express.Router();


const { signup, signin,forgotPassword,customerSignup,signincustomer,resetPassword} = require("../Controllers/auth");
const { pusher,packages,newOrder,informrecipient,foundPackage,orderFetching,findPackage,addDriver,driverLocation,updateDriverLocation,driverPackages,packagesUpdate,packagesUpdateArrived} = require("../Controllers/packgesController");
const{sendMessage,createChat,findChat,addMessage,getMessages}=require("../Controllers/ChatsController");
const {notification}=require("../Controllers/notificationController")
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
router.get("/", (req, res) => {
    return res.json({
        data: "Hello World from API"
    })
})

router.post("/signup", signup);
router.post("/customerSignup",customerSignup);
router.post("/signin", signin);
router.post("/signincustomer", signincustomer);
 router.post("/forgot-password", forgotPassword);
 router.post("/newOrder", newOrder);
 router.get("/packages", packages);
 router.get("/driverPackages", driverPackages);

router.post('/informrecipient',informrecipient);
router.post('/resetpassword',resetPassword);
router.get('/foundpackage',foundPackage);
router.get('/orders',orderFetching);
router.post('/findPackage',findPackage);
router.post('/addDriver',addDriver);
router.post('/driverLocation',driverLocation)
router.get('/updateDriverLocation',updateDriverLocation);
router.post('/createChat',createChat)
// router.get('/userChats',userChat)
router.get('/findChat',findChat)
router.post('/addMessage',addMessage)
router.get('/getMessages',getMessages)
router.post('/packagesUpdate/',packagesUpdate)
router.post('/packagesUpdateArrived',packagesUpdateArrived)
router.post('/notification', notification)
module.exports = router;