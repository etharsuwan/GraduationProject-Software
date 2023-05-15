import React ,{Component}from 'react';
import { View, StyleSheet ,Text,Button, Touchable} from 'react-native';

import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';
import { Marker } from 'react-native-maps';
import axios from 'axios';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {regionFrom} from '../helpers/location';

import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const GOOGLE_API_KEY = Config.GOOGLE_API_KEY;

class DriverMap extends Component {
  
  constructor(props) {

  super(props);
  this.intervalId = null;
  navigationOptions = ({navigation}) => {
    const showHeaderButton = navigation.getParam('showHeaderButton');
    return {
      title: 'Drive Map',
      headerRight: showHeaderButton ? (
        <View style={styles.navHeaderRight}>
          <TouchableOpacity onPress={() => console.log('chat button pressed')}>
            <Ionicons name="ios-chatbubbles" size={30} color="#e19400" />
          </TouchableOpacity>
          <Button
            onPress={navigation.getParam('headerButtonAction')}
            title={navigation.getParam('headerButtonLabel')}
            color="#e19400"
          />
        </View>
      ) : null,
    };
  };



  
    // Set initial state values
    const { route } = this.props;
    const { data } = route.params;
    if(data){
      this.state = {
        ...this.state,
        userId:data?.userId,
        sender:data?.sender,

        driverId:data?.driver,
        packageId: data?.packageId,
        senderLatitude: data.senderlatitude,
        senderLongitude: data.senderlongitude,
        recipientLatitude: data.recipientlatitude,
        recipientLongitude: data.recipientlongitude,
        driverLatitude: '',
        driverlongitude: '',
        shipped:data.shipped
        
      };
  }else{
    console.log("No data ")
  }
    // Fetch driver location data every 5 seconds
  //   this.intervalId = setInterval(() => {
  //     this.fetchDriverLocation();
  //  }, 3000);
  this.intervalId = setInterval(() => {
    this.fetchDriverLocation();
 }, 1000);
 }
  
  
 async componentDidMount() {
  this.fetchDriverLocation();

  this.props.navigation.setParams({
    headerButtonLabel: 'Picked Order',
    headerButtonAction: this._pickedOrder,
  });

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
    
        let driver_location = regionFrom(
          position.coords.latitude,
          position.coords.longitude,
          position.coords.accuracy,
    
        );
        
        this.setState({
          driver_address: geocoded_location.results[0].formatted_address,
          driver_location,
          //extras
          driverLatitude: position.coords.latitude,
          driverlongitude:   position.coords.longitude,
    
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

  }}
  componentWillUnmount() {
    // Stop the interval when component is unmount
    clearInterval(this.intervalId);
  }
    
  
  contactDriver = () => {
    this.props.navigation.navigate('ChatScreen');
  };
  fetchDriverLocation() {


    axios.get(`http://172.20.10.6:8000/api/updateDriverLocation?driverId=${this.state.driverId}`)
    
            .then(response => {

              if (response.data.driverLatitude && response.data.driverLongitude) {
                this.setState({
                    driverLatitude: response.data.driverLatitude,
                    driverlongitude: response.data.driverLongitude,
                    sender:response.data.name
                });

            }
            })
            .catch(error => {
              console.log(error);
            });
        
}

  render() {
    const{ senderLatitude,
      senderLongitude,
      recipientLatitude,
      recipientLongitude,
      driverLatitude,
      driverlongitude,shipped}=this.state;
      return (
        <View style={styles.wrapper}>
       {driverLatitude && (<MapView 
        style={styles.map}
        zoomControlEnabled={true}

        initialRegion={{
           latitude: Number(driverLatitude),
           longitude: Number(driverlongitude),
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421
        }
        }
        >
          {driverLatitude && (
            <Marker
              coordinate={{
                latitude: Number(driverLatitude),
                longitude: Number(driverlongitude),
              }}
              title={"You're here"}
            />
          )}

          {driverLatitude && senderLatitude && (
            <MapViewDirections
              origin={
                {                latitude: Number(driverLatitude),
                  longitude: Number(driverlongitude),
  }
              }
              destination={
                {
                  latitude: Number(senderLatitude),
                  longitude: Number(senderLongitude),
                  }

              }
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          )}

          {senderLatitude && recipientLatitude && (
            <MapViewDirections
              origin={
                {
                  latitude: Number(senderLatitude),
                  longitude: Number(senderLongitude),
                  }
              }
              destination={{
                latitude: Number(recipientLatitude),
                longitude: Number(recipientLongitude),
                  }}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor="#1b77fb"
            />
          )}

          {senderLatitude && (
            <Marker
              coordinate={{
                latitude: Number(senderLatitude),
                longitude: Number(senderLongitude),
            }}
              title={'Sender is here'}
              pinColor={'#4CDB00'}
            />
          )}

          {recipientLatitude && (
            <Marker
              coordinate={{
                latitude: Number(recipientLatitude),
                longitude: Number(recipientLongitude),
              }}
              title={'Recipent is here'}
              pinColor={'#6f42c1'}
            />
          )}
        </MapView>)}

        <View style={styles.floatingButtonContainer}>
           <TouchableOpacity onPress={()=>{this.props.navigation.navigate("ChatScreen", { driverId: this.state.userId ,sender:this.state.sender})}}
 style={{
    backgroundColor:"#EA9937",
    height:54,
    alignItems:'center',
    justifyContent:'center',
    alignSelf: 'center',
    borderRadius:35,
    width:200,
    marginVertical:40,
    borderWidth:1,
    borderColor:'#EA9937',
    shadowColor:'#000',
    shadowOffset:{
        width:0,
        height:4,
    },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5,
   }}>
<Text style={{    fontSize:15,
    fontWeight:'600',
    color:'white',
    letterSpacing:0.5}}>Contact Customer</Text>
      </TouchableOpacity>
        </View>

       
      </View>
          );
          }
          }
      
const styles = StyleSheet.create({
  navHeaderRight: {
    marginRight: 10,
  },
  wrapper: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: '0%',
    left: '21%',
    alignSelf: 'flex-end',
  },
  modal: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  close: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    color: '#0366d6',
  },
  modalBody: {
    marginTop: 20,
  },
  addressContainer: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

          export default withNavigation(DriverMap);

