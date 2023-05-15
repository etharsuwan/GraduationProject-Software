import React, { Component } from 'react';
import PushNotification,{Importance} from 'react-native-push-notification';
import { View, Text,TextInput,Button,StyleSheet ,TouchableOpacity} from 'react-native';
import { AuthContext } from '../context/auth';
import { io } from "socket.io-client";
import Modal from 'react-native-modal';
import RNGooglePlaces from 'react-native-google-places';
import axios from 'axios';
import { Switch } from 'react-native';

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config';
import {regionFrom} from '../helpers/location';
import * as geolib from 'geolib';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const GOOGLE_API_KEY = Config.GOOGLE_API_KEY;

Geocoder.init(GOOGLE_API_KEY);

class DriverHome extends Component {
  static contextType = AuthContext;

constructor(props) {
super(props);
this.openModal = this.openModal.bind(this);
this.state = {
  locationTracking: true,

message: '',
isModalVisible:false,
driver_address: '',
driver_location: null,
driverlatitude: null,
driverlongitude:   null,
packageid: null,
      sender: null,
      recipient: null,
      senderemail: null,
      senderPhone: null,
      recipientEmail: null,
      recipientPhone: null,
      description: null,
      customer_address: null,
      recipient_address: null,
      deliveryDate: null,
      userId:null,
      driver_name:null,
      driverId:null
};
}



  



static contextType = AuthContext;

socket = io("ws://172.20.10.6:8800");

async componentDidMount() {
  PushNotification.createChannel(
    {
      channelId: "com.etharproject",
      channelName: "My channel",
      channelDescription: "A channel to categorise your notifications",
      playSound: false,
      soundName: "default",
      importance: Importance.HIGH,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );

  let location_permission = await check(
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  );

  if (location_permission === 'denied') {
    location_permission = await request(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
  }

  if (location_permission == 'granted') {
    this.interval = setInterval(() => {

    Geolocation.getCurrentPosition(
      async position => {
        const geocoded_location = await Geocoder.from(
          position.coords.latitude,
          position.coords.longitude,
        );
    
        let driver_location = regionFrom(
          position.coords.latitude,
          position.coords.longitude,
          position.coords.accuracy,
    
        );
        
        this.setState({
          driver_address: geocoded_location.results[0].formatted_address,
          driver_location,
          //extras
          driverlatitude: position.coords.latitude,
          driverlongitude:   position.coords.longitude,
    
        });
        // console.log("driverhome",this.state.driver_location)
        // setTimeout(()=>{
        //           console.log(this.state.driver_location.latitude)

        // },3000)
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );},1000)
    
 

  }

  setTimeout(() => {
    const [{ user }, setState] = this.context;
    if (user) {
      this.setState({
        driverId: user._id,
        driver_name: user.name
      });
      this.socket.emit("addDriver", this.state.driverId);
      // console.log(this.state.driverId)
    }
  }, 3000);

  
  
  this.socket.on("recieve-deliveryReq", (data) => {
// console.log("recieve-message", data.packageid)
this.setState({
  packageid: data.packageid,
  sender: data.sender,
  recipient: data.recipient,
  userId: data.userId,
  senderemail: data.senderemail,
  senderPhone: data.senderPhone,
  recipientEmail: data.recipientEmail,
  recipientPhone: data.recipientPhone,
  description: data.description,
  customer_address: data.customer_address,
  recipient_address: data.recipient_address,
  deliveryDate: data.deliveryDate,
  senderlatitude:data?.senderlatitude,
  senderlongitude:data?.senderlongitude
});
// console.log("userID!",this.state.userId)

let distance = geolib.getDistance(

  {latitude: this.state.driverlatitude, longitude: this.state.driverlongitude},
  {latitude: this.state.senderlatitude, longitude: this.state.senderlongitude},
);
console.log("distanse",distance)
if (distance < 20000){
PushNotification.localNotification({
  title: "New Delivery Request!",
  message: `tap to see the details`,
  channelId:"com.etharproject",
  // channelName: "com.etharproject", // (required)

});
PushNotification.configure({
  onNotification: (notification) => {
      console.log("NOTIFICATION:", notification);
      this.openModal();
  },
});
}
});

this.interval = setInterval(() => {
  if(this.state.locationTracking) {

  this.driverLocation();
  }
}, 1000);
}

componentWillUnmount() {
  clearInterval(this.interval);
}

openModal = () => {
  this.setState({ isModalVisible: true });
};
handleReject = () => {
  this.socket.emit("rejectDelivery", packageid);
  this.setState({isModalVisible: false});
}

handleAccept = (driver_location, packageid,driver_name,driverId,userId) => {
  if (packageid) {
    this.setState({ isModalVisible: false }, () => {
      this.socket.emit("acceptDelivery", { "packageid":packageid,
      "driver_name":driver_name,
      "driver_location":driver_location,});
      this.currentRoom = packageid;
      this.socket.emit("joinRoom", packageid);
    });
  }
  axios.post("http://172.20.10.6:8000/api/addDriver", {
    packageid,
        driverId,
        driver_location
})
.then(response => {
//  console.log("driver is added")
   
})
.catch(error => {
console.log(error);
});
// console.log(driver_location)
axios.post("http://172.20.10.6:8000/api/driverLocation", {
  
      driverId,
      driver_location
})
.then(response => {
// console.log("driver is added")
 
})
.catch(error => {
console.log(error);
});
this.setState({
  senderId:driverId ,
  receiverId:userId
})

axios.post("http://172.20.10.6:8000/api/createChat",{
  "senderId":driverId,
 "receiverId" :userId
})

}
    
driverLocation(){
  const{driverId,driver_location}=this.state;
  // console.log("Driver",driverId)
  axios.post("http://172.20.10.6:8000/api/driverLocation", {
  
      driverId,
      driver_location
})
.then(response => {
// console.log("driver is added")
 
})
.catch(error => {
console.log(error);
});

}

sendNotification = () => {
  // this.setState({ isModalVisible: true });

const { message } = this.state;
if (message !== null) {
this.socket.emit("send-deliveryReq", message);
}
}
_hideOrderDetailsModal = () => {
  this.setState({
    isModalVisible: false,
  });
};
render() {
  const {isModalVisible, driverlatitude,
    driverlongitude,packageid,driver_location, sender, recipient,driver_name, userId, senderemail, senderPhone, recipientEmail, recipientPhone, description, customer_address, recipient_address, deliveryDate,driverId} = this.state;
// if(!approved){
// return(
//   <View style={{backgroundColor:'red',height:60,width:330,justifyContent:'center',alignItems:'center',marginVertical:70,marginHorizontal:6}}>
//     <Text style={{fontSize:18,color:'white'}}>
//       Your Account is Under Admin 
//     </Text>
//     <Text style={{fontSize:18,color:'white'}}>Review</Text>
//   </View>
// )


// }
return (

<View style={{flex:1,backgroundColor:'white'}}>
<View style={{flexDirection:'row'}}>
        <Text style={{marginVertical:15,fontSize:15,color:'#EA9937',paddingLeft:15,fontWeight:'bold'}}>On Duty?</Text>
          <Switch
value={this.state.locationTracking}
onValueChange={value => this.setState({locationTracking: value})}
style={{ height: 50, width: 80,marginVertical:5}}

/>
</View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            zoomControlEnabled={true}
            initialRegion={{
              latitude: 32.1905409,
              longitude: 35.1564353,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}>
           

           

            <Marker
                coordinate={{
                  latitude: Number(driverlatitude),
                  longitude: Number(driverlongitude),
                        }}
      
              title={'Your location'}
              pinColor={'#4CDB00'}
            />

           
              

           
          </MapView>
        </View>


<Modal isVisible={isModalVisible} >
<View style={styles.modal}>
                  <Text style={{fontWeight:'bold',fontSize:18,alignSelf: 'center', justifyContent: 'center'}}>Order Details</Text>
                  <View style={styles.addressContainer}>
                  <Text style={styles.labelText}>Pick up</Text>
                  <Text style={styles.valueText}>
                 {customer_address}
                  </Text>
                </View>
                <View style={styles.addressContainer}>
                  <Text style={styles.labelText}>Drop off</Text>
                  <Text style={styles.valueText}>
                   {recipient_address}
                  </Text>
                </View>
                <Text style={styles.labelText}>Description</Text>
                  <Text style={styles.valueText}>{description}</Text>

                  <Text style={styles.labelText}>Delivery Date</Text>

                  <Text style={styles.valueText}> {deliveryDate}</Text>
              <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.button} onPress={()=>this.handleAccept(driver_location,packageid,driver_name,driverId,userId)}>

  <Text style={{color:'white',fontSize:13,alignSelf: 'center', justifyContent: 'center'}}> Accept </Text>
</TouchableOpacity>
<TouchableOpacity style={styles.rejectButton}
onPress={this.handleReject}>
  <Text style={{color:'white',fontSize:13,alignSelf: 'center', justifyContent: 'center'}}> Decline </Text>
</TouchableOpacity>
</View>
            
                           </View>
          </Modal>
          </View>
);
}
}

const styles=StyleSheet.create({
  rejectButton:{ 
    marginTop:30,
flex:1,
    backgroundColor:"#c53c3c",
alignSelf:'center',
height:47,
alignItems:'center',
borderRadius:9,
padding:10,
fontWeight:'bold',

marginRight:7},
mapContainer: {
  marginBottom:50,
  flex: 9,
},
map: {
  ...StyleSheet.absoluteFillObject,
},
  button:{ 
    marginTop:30,
    flex:1,
fontWeight:'bold',
    alignSelf:'center',
    height:47,
    alignItems:'center',
    borderRadius:9,
    padding:10,
    marginRight:7,
backgroundColor:"#28a745",
},
  navHeaderRight: {
    marginRight: 10,
  },
  wrapper: {
    flex: 1,
  },

  modal: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical:60,
    borderRadius:20,
  },
  close: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    color: '#0366d6',
  },
  modalBody: {
    marginTop: 40,
  },
  addressContainer: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: 15,
    color: '#333',
  },
  buttonContainer: {
    marginBottom: 10,
  },
})

export default DriverHome;