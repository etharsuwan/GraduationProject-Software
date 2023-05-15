
import React, { useState ,useEffect} from 'react';
import { 
  StyleSheet, 
  KeyboardAvoidingView, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { io } from "socket.io-client";
import PushNotification from 'react-native-push-notification';

import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({route}) => {
  socket = io("ws://172.20.10.6:8800");

  if(route && route.params){
    const {   customer_address, to_address, userId, sender, deliveryDate } = route.params;
    // console.log(sender);
  }
  const navigation = useNavigation();

  
  const [packageid, setPackageId] = useState("");

// useEffect(()=>{
//   this.socket.on("driverAccepted", (data) => {
//     console.log(data.driverName);
//     console.log(data.driverId);
//     console.log(data.driverLocation);
//     PushNotification.localNotification({
//       title: "Test Notification",
//       message: "This is a test notification",
//       channelId:"com.etharproject"
//     });
//   });
  
// },[])
const handleSubmit = async () => {
  try {
    // console.log(packageid)
    const response = await axios.post(`http://172.20.10.6:8000/api/findPackage`,{packageid});
    console.log(response.data.sender);
    const data=response.data;
    navigation.navigate('TrackOrder', { data });
  } catch (error) {
    console.log(error);
    // handle the error here, for example, by showing an error message to the user
  }
}


  return (
    <KeyboardAvoidingView style={{ flex:1 , backgroundColor:'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex:1, marginHorizontal:20, marginVertical:100 }}>
          <Text style={styles.text}>Enter Your Tracking Number</Text>
          <TextInput 
            style={styles.TextInput}                      
            onChangeText={text => setPackageId(text)}                   
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Show Delivery Details</Text>
          </TouchableOpacity>
        </View>    
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    text:{ fontSize:15, color:'black', marginBottom:10, marginLeft:9,   alignSelf:'center',justifyContent: 'center', fontWeight:'500',
  },
    TextInput:{  
        height:50,
        padding:5,
        marginTop:5,
        fontSize:12,
        borderWidth:0.8,
        borderColor:'gray',
        borderRadius:8,
        backgroundColor:"white"
    },
    buttonText:{
        fontSize:13,
        fontWeight:'600',
        color:'white',
        letterSpacing:0.5
    },
    buttonStyle:{
        backgroundColor:"#EA9937",
        height:54,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        marginHorizontal:28,
        marginVertical:15,
        borderWidth:1,
        borderColor:'#EA9937',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:4,
        }
    }
});

export default HomeScreen;
