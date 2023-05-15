import React, { Component, useState,useEffect,useContext } from 'react';
import {Text,View,StyleSheet, TextInput, Button,TouchableOpacity, Image,TouchableWithoutFeedback ,Modal,Dimensions} from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styleAuth from '../style/authStyle';
import axios from 'axios';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config';
import {regionFrom} from '../helpers/location';
import { AuthContext } from '../context/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { withNavigation } from 'react-navigation';
import { io } from "socket.io-client";
import  Sound  from 'react-native-sound';
import successSound from '../assets/success.mp3';
import PushNotification,{Importance} from 'react-native-push-notification';

const {height,width}=Dimensions.get("screen");

// const AuthContext = React.createContext();
function generateId() {
  return Math.random().toString(36);
}

packageid = generateId();


const random = require('string-random');
const GOOGLE_API_KEY = Config.GOOGLE_API_KEY;

Geocoder.init(GOOGLE_API_KEY);


   
  


  //
class NewOrder extends Component {

  socket = io("ws://172.20.10.6:8800");

  static contextType = AuthContext;
 
  resetForm = () => {
    this.setState({
      to_address: '',
      to_location: null,
      stage: 1,
      recipient: '',
      sender: '',
      deliveryAddress: '',
      pickupAddress: '',
      deliveryDate : new Date(),
      userid: '',
      recipientEmail: '',
      recipientPhone: '',
      deliveryCost: 0,
      deliverySize: '',
      senderEmail: '',
      recipientlatitude: null,
      recipientlongitude: null,
      description:''
    });
  }
  handleClose = () => {
    this.setState({modalVisible: false});
    }
handleSubmit = () => {
  this.resetForm();

  const [{ user, token }, setState] = this.context;
  const userId = user?._id;
  //just incase
  const senderemail = user?.email;
  const sender = user?.name;
  const senderPhone = user?.phone;
  const city=user?.city;

  const {recipientPhone, recipientEmail,recipient,customer_location,customer_address,to_address,deliveryDate ,to_location,description} = this.state;
  // console.log("packageid",packageid)
  this.socket.emit("send-deliveryReq",  {
    "packageid":packageid,
    "sender":sender,
"recipient":recipient,
"userId":userId,
"senderemail":senderemail,
"senderPhone":senderPhone,
"recipientEmail":recipientEmail,
"recipientPhone":recipientPhone,
"description":description,
"customer_address":customer_address,
"recipient_address":to_address,
"deliveryDate":deliveryDate,
"city":city,
"senderlatitude":senderlatitude,
"senderlongitude":senderlongitude
}
);

  axios.post("http://172.20.10.6:8000/api/newOrder", {
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
        })
        .then(response => {
          // console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
          packageid = generateId();
          //  this.props.navigation.navigate('SuccessModal')
          this.openModal()


        })
        .catch(error => {
        console.log(error);
        });
       }
       openModal = () => {
        this.setState({ modalVisible: true });
      };
    
      closeModal = () => {
        this.setState({ modalVisible: false });
      };
  state = {
    customer_address: '',
    customer_location: null,
    to_address: '',
    to_location: null,
    stage: 1,
recipient: '',
sender: '',
deliveryAddress: '',
pickupAddress: '',
deliveryDate: '',
userid:'',
recipientEmail:'',
recipientPhone:'',
deliveryCost:0,

senderEmail:'',
modalVisible: false,
senderlatitude:null,

        senderlongitude:null,
        recipientlatitude:null,
        
        recipientlongitude:null,
        packageid:null,
        deliveryDate : new Date(),
        showDatePicker: false,
        description:'',
        sound: new Sound('../assets/success.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          // loaded successfully
          console.log('duration in seconds: ' + this.state.sound.getDuration() + 'number of channels: ' + this.state.sound.getNumberOfChannels());
        }),
      
    
  };
  handleNext = () => {
    this.setState(prevState => ({ stage: prevState.stage + 1 }));
    }
    handleBack=()=>{
      this.setState(prevState => ({ stage: prevState.stage - 1 }));
 
    }

    
    //time and date picker
    onChange = (event, selectedDate) => {
      this.setState({ deliveryDate: selectedDate });
    }
  
    showDatePicker = () => {
      this.setState({ showDatePicker: true });
    }
  
    hideDatePicker = () => {
      this.setState({ showDatePicker: false });
    }
  
    
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
    const [{ user, token }, setState] = this.context;
    const userId=user?._id;
  this.socket.emit("addCustomer",userId );
  // this.socket.on("recieve-deliveryReq", (data) => {
  //   console.log("recieve-message", data.packageid)
  //   PushNotification.localNotification({
  //     title: "New Delivery Request!",
  //     message: "tap to see the details",
  //     channelId:"com.etharproject"
  //   });
  // }
  this.socket.on("driverAccepted", (data) => {
    // console.log("Driver Accepted: ", data);
    PushNotification.localNotification({
      title: "You've got a Driver",
      message: `The driver name is ${data.driver_name}`,
      channelId:"com.etharproject"
    });
    PushNotification.configure({
      onNotification: (notification) => {
          console.log("NOTIFICATION:", notification);
          this.openModal();
      },
    });
    }
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
      Geolocation.getCurrentPosition(
        async position => {
          const geocoded_location = await Geocoder.from(
            position.coords.latitude,
            position.coords.longitude,
          );

          let customer_location = regionFrom(
            position.coords.latitude,
            position.coords.longitude,
            position.coords.accuracy,

          );
          
    
          this.setState({
            customer_address: geocoded_location.results[0].formatted_address,
            customer_location,
            //extras
            senderlatitude: position.coords.latitude,
            senderlongitude:   position.coords.longitude,
  
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    }
    if (this.state.modalVisible) {
      this.state.sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  }

  openPlacesSearchModal_From = async () => {
    try {
      const place = await RNGooglePlaces.openAutocompleteModal();
      senderlatitude=place.location.latitude;
      senderlongitude=place.location.longitude;
      const customer_location = regionFrom(
        place.location.latitude,
        place.location.longitude,

        16,
      );

      this.setState({
        customer_address: place.address,
        customer_location,
        
      });
    } catch (err) {
      console.log('err: ', err);
    }
    
  };

  openPlacesSearchModal_To = async () => {
    try {
      const place = await RNGooglePlaces.openAutocompleteModal();
recipientlatitude=place.location.latitude;
recipientlongitude=place.location.longitude;
      const to_location = regionFrom(
        place.location.latitude,
        place.location.longitude,

        16,
      );

      this.setState({
        to_address: place.address,
        to_location,
      });
    } catch (err) {
      console.log('err: ', err);
    }
  };

  renderAddressParts = customer_address => {
    return customer_address.split(',').map((addr_part, index) => {
      return (
        <Text key={index} style={styles.addressText}>
          {addr_part}
        </Text>
      );
    });
  };

render(){
  
  const [{ user, token }, setState] = this.context;
  const driverFee=20;
  const deliveryCost=0;
  let total;
  if (typeof deliveryCost === 'number' && !isNaN(deliveryCost) && typeof driverFee === 'number' && !isNaN(driverFee)) {
    total = deliveryCost + driverFee;
  } else {
    total = 0;
  }
  const {    description,customer_address,to_address, recipientEmail,recipientPhone,stage, recipient, sender, packageType, packageWeigh, deliveryDate, senderlatitude,senderlongitude,recipientlatitude,recipientlongitude,modalVisible} = this.state;

 if(modalVisible){
  return (
    <View>
      <Modal visible={this.state.modalVisible} onRequestClose={this.closeModal}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,  padding: 20,marginVertical:60}}>
          <Image source={require('../assets/check.png')} style={{ width: 100, height: 100 }} />
          <Text style={{fontWeight:'bold',fontSize:16,marginTop:20}}>Order sent successfully!</Text>
          <Text style={{fontWeight:'bold',fontSize:16,marginTop:20}}>Your Tracking Number is : {packageid}</Text>
          <View style={{margin:20}}>       
          </View>
        </View>
        <TouchableOpacity onPress={this.closeModal} style={{ alignSelf: 'center', position: 'absolute', bottom: 20 }}>
          <Ionicons name="close" size={65} color='black'  />
        </TouchableOpacity>
      </Modal>
    </View>
  );
 }
  if (stage === 1) {
    
      return (
        <KeyboardAwareScrollView >
          <TouchableWithoutFeedback style={{ backgroundColor: 'white' ,height:height,width:width}}>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>  Sender Information  </Text>
              <View style={{ alignItems: 'center', marginVertical: 5 }}>

                <TextInput
                  value={user.name}
                  onChangeText={(text) => this.setState({ sender: text })}
                  placeholder="Sender Name"
                  style={[styles.inputField, { marginHorizontal: 5 }]}
                />
              </View>
      
              <View style={{ alignItems: 'center', marginVertical: 5 }}>
                <TextInput
                  value={user.email}
                  onChangeText={(text) => this.setState({ senderEmail: text })}
                  placeholder="Sender Email"
                  style={[styles.inputField, { marginHorizontal: 5 }]}
                />
              </View>
      
              <View style={{ alignItems: 'center', marginVertical: 5 }}>
                <TextInput
                  value={user.phone}
                  onChangeText={(text) => this.setState({ sender: text })}
                  placeholder="Sender phone"
                  style={[styles.inputField, { marginHorizontal: 5 }]}
                />
              </View>
      
              <View style={{ alignItems: 'center', marginVertical: 5 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.openPlacesSearchModal_From();
                  }}
                >
                  <TextInput
                    value={customer_address}
                    onChangeText={(text) => this.setState({ customer_address: text })}
                    editable={false}
                    placeholder="Your Address"
                    style={[styles.inputField, { marginHorizontal: 5 }]}
                  />
                </TouchableOpacity>
              </View>
      
              <View style={{ marginHorizontal: 70, marginVertical: 20 }}>
                <TouchableOpacity
                  onPress={this.handleNext}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      );
      
              }
              
      else if (stage === 2) {
        return (                     
          <KeyboardAwareScrollView >

           <TouchableWithoutFeedback style={{ backgroundColor: 'white' }}>

         <View style={styles.formContainer}>

        <Text style={styles.formTitle}>  Recipient Information  </Text>
            <View style={{flexDirection:'row',alignItems:'center',marginVertical:10}}>
        <TextInput
              value={recipient}
              onChangeText={text => this.setState({ recipient: text })}
              placeholder="Recipient name"
              style={styles.inputField}
              />
              </View>
              <View style={{flexDirection:'row',alignItems:'center',marginVertical:10}}>
        <TextInput
              value={recipientPhone}
              onChangeText={text => this.setState({ recipientPhone: text })}
              placeholder="Recipient phone"
              style={styles.inputField}
              />
              </View>
              <View style={{flexDirection:'row',alignItems:'center',marginVertical:10}}>
        <TextInput
              value={recipientEmail}
              onChangeText={text => this.setState({ recipientEmail: text })}
              placeholder="Recipient Email"
              style={styles.inputField}
              />
              </View>
              <TouchableOpacity
                  onPress={() => {
                    this.openPlacesSearchModal_To();
                  }}
                >
                  <TextInput
                    value={to_address}
                    onChangeText={(text) => this.setState({ to_address: text })}
                    editable={false}
                    placeholder="Recipient Address"
                    style={[styles.inputField, { marginHorizontal: 10 }]}
                  />
                </TouchableOpacity>
              <View style={{flexDirection:'row',marginVertical:30}}>
            <TouchableOpacity onPress={this.handleBack}  style={styles.buttonStyle} >
            <Text style={styles.buttonText}>Back</Text>

            </TouchableOpacity>  

             <TouchableOpacity  onPress={this.handleNext} style={styles.buttonStyle}>
             <Text style={styles.buttonText}>Next</Text>

             </TouchableOpacity>          
          </View>
          </View>      
              </TouchableWithoutFeedback>
              </KeyboardAwareScrollView>

      );
      } else if (stage === 3) {
        return (
          <KeyboardAwareScrollView >

          <TouchableWithoutFeedback style={{ backgroundColor: 'white' }}>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>  Package Information </Text>
            <TouchableOpacity onPress={() => this.showDatePicker()} >
  <View style={{ flexDirection: 'row', alignSelf: 'center' ,justifyContent:'center'}}>
   
    <TextInput
  value={this.state.deliveryDate === '' ? 'Select a date' : this.state.deliveryDate.toDateString()}
  onFocus={this.showDatePicker}
  placeholder="Delivery date"
  editable={false}
  style={styles.inputField}
/>
  </View>
</TouchableOpacity>


{this.state.showDatePicker && (
  <DateTimePicker
    value={this.state.deliveryDate}
    onChange={(event, selectedDate) => {
      this.setState({deliveryDate: selectedDate});
      this.hideDatePicker();
    }}
    onClose={this.hideDatePicker}
  />
)}

            <TextInput
              value={description}
              onChangeText={text => this.setState({ description: text })}
              placeholder="Package Description"
              style={styles.inputField}
            />
        
            <TextInput
              value={deliveryCost}
              onChangeText={text => this.setState({ deliveryCost: text })}
              placeholder="Package cost"
              style={styles.inputField}
            />
         
            <View style={{ flexDirection: 'row', marginVertical: 60 ,marginBottom:80}}>
              <TouchableOpacity onPress={this.handleBack}   style={[styles.buttonStyle]}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
        
              <TouchableOpacity onPress={this.handleNext} style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
          </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
          
        );
        }else if (stage === 4) {
          return (
            <KeyboardAwareScrollView>
              <TouchableWithoutFeedback style={{ backgroundColor: 'white' }}>
                <View style={styles.reciptContainer}>
                  <Text style={styles.formTitle}>  Order details </Text>
                  
            
                  <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginRight: 10 }}>Recipent Email:</Text>
                    <Text style={{ fontSize: 14 }}>{recipientEmail}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginRight: 10 }}>Recipient phone:</Text>
                    <Text style={{ fontSize: 14 }}>{recipientPhone}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginRight: 10 }}>From Location:</Text>
                    <Text style={{ fontSize: 14 }}>{customer_address}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginRight: 10 }}>To Location:</Text>
                    <Text style={{ fontSize: 14 }}>{to_address}</Text>
                  </View>
                  
                  <View style={{ flexDirection: 'row', marginVertical: 10 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 15, marginRight: 10 }}>Total:</Text>
    <Text style={{ fontSize: 14 }}>{total}</Text>
  </View>


  <View style={{ flexDirection: 'row', marginVertical: 60 ,marginBottom:80,        paddingHorizontal:20}}>

                  <TouchableOpacity onPress={this.handleBack} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Back</Text>
                  </TouchableOpacity>
          
                  <TouchableOpacity onPress={this.handleSubmit
                } style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
          );
          
        }
      }
    
    }
    const styles = StyleSheet.create({
      datePickerContainer:{

      },
      buttonText:{
        fontSize:13,
        fontWeight:'600',
        color:'white',
        letterSpacing:0.5
       },
        buttonStyle:{

marginLeft:5,
          backgroundColor:"#EA9937",
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
      width:150,
        borderWidth:1,
        borderColor:'#EA9937',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:4,
        }},
      formTitle:{
        fontSize:20,
        justifyContent:'center',
        alignContent:'center',
      marginVertical:10,
      fontWeight:'bold',
    color:'#EA9937',
    alignSelf:'center'
  },
    inputField:{
      height:50,
      width:400,
      paddingLeft:30,
      marginTop:20,
          fontSize:15,
          borderBottomWidth:0.8,
          borderColor:'rgba(0,0,0,0.2)',
          borderRadius:30,
          backgroundColor:"white",
    },
      formContainer: {
        height:height,
        width:width,
        backgroundColor:'white',
        paddingVertical:height/10,
        alignItems:'center'
        },
       reciptContainer: {
        height:height,
        width:width,
        paddingHorizontal:20,
          backgroundColor:'white',
          paddingVertical:height/9,
          },
        input: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20
        },
        button: {
        marginTop: 10
        },
        wrapper: {
          flex: 1,
        },
        addressSummaryContainer: {
          flex: 2,
          flexDirection: 'column',
          marginHorizontal:70,
          marginVertical:40
        },
        addressContainer: {
          padding: 5,
        },
        mapContainer: {
          width: 125,
          height: 125,
        },
        map: {
          ...StyleSheet.absoluteFillObject,
        },
        addressText: {
          fontSize: 13,
        },
        linkButtonContainer: {
          marginTop: 5,
        },
        linkButton: {
          color: '#EA9937',
          fontSize: 13,
        },
        cartItemsContainer: {
          flex: 5,
          marginTop: 20,
        },
        lowerContainer: {
          flex: 1,
          flexDirection: 'row',
        },
        spacerBox: {
          flex: 2,
        },
        cartItemContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        },
        paymentSummaryContainer: {
          flex: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 20,
        },
        endLabelContainer: {
          alignItems: 'flex-end',
        },
        price: {
          fontSize: 17,
          fontWeight: 'bold',
        },
        priceLabel: {
          fontSize: 16,
        },
        messageBox: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#4c90d4',
        },
        messageBoxText: {
          fontSize: 18,
          color: '#fff',
        },
        buttonContainer: {
          flex: 1,
          padding: 20,
        },
        
      });

      export default withNavigation(NewOrder);
