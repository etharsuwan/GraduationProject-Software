import React from 'react';
import { View, StyleSheet ,Text,TouchableOpacity} from 'react-native';

import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';
import { Marker } from 'react-native-maps';
import axios from 'axios';

import { withNavigation } from 'react-navigation';


const GOOGLE_API_KEY = Config.GOOGLE_API_KEY;

class TrackOrder extends React.Component {
  
  constructor(props) {

  super(props);
  this.intervalId = null;

  
    // Set initial state values
    const { route } = this.props;
    const { data } = route.params;
    console.log(data);
    if(data){
      this.state = {
        ...this.state,
        sender:'',
        userId:data?.userId,
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
    this.intervalId = setInterval(() => {
      this.fetchDriverLocation();
   }, 1000);
  }
  
  
  componentDidMount() {
    this.fetchDriverLocation();
  

  }
  componentWillUnmount() {
    // Stop the interval when component is unmount
    clearInterval(this.intervalId);
  }

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
  contactDriver = () => {
    this.props.navigation.navigate('ChatScreen');
  };
  
  render() {
    const{ senderLatitude,
      senderLongitude,
      recipientLatitude,
      recipientLongitude,
      driverLatitude,
      driverlongitude,shipped}=this.state;
      return (
        <View style={styles.wrapper}>
          {/* <Text style={styles.infoText}>{orderStatusText}</Text> */}

          {/* <Button
  onPress={() => {
    if (this.state.driverId) {
      this.props.navigation.navigate("ChatScreen", { driverId: this.state.driverId });
    } else {
      console.log("driverId is undefined");
    }
  }}
  title="Contact driver"
  color="#c53c3c"
/> */}

        {/* </View> */}

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            zoomControlEnabled={true}
            initialRegion={{
              latitude: Number(senderLatitude),
              longitude: Number(senderLongitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}>
                          <Marker
              coordinate={{
                latitude: Number(recipientLatitude),
                longitude: Number(recipientLongitude),
              }}
            
              title={'Recipient location'}
            />
{/* 
{driverLatitude && ( */}
              <Marker
              coordinate={{
                latitude: Number(driverLatitude),
                longitude: Number(driverlongitude),
                        }}
                  title={'Driver location'}
                  image={require('../assets/car-icon.png')}
                  />
            {/* )} */}

            <Marker
                coordinate={{
                  latitude: Number(senderLatitude),
                  longitude: Number(senderLongitude),
                        }}
      
              title={'Your location'}
              pinColor={'#4CDB00'}
            />

            {driverLatitude &&(
              <MapViewDirections
              origin={{
                latitude: Number(driverLatitude),
                longitude: Number(driverlongitude),
                }}
                destination={{
                  latitude: Number(senderLatitude),
                  longitude: Number(senderLongitude),
                  }}
                apikey={GOOGLE_API_KEY}
                strokeWidth={3}
                strokeColor="hotpink"
              />
            )}

            <MapViewDirections
              origin={{
                latitude: Number(senderLatitude),
                longitude: Number(senderLongitude),
            }}
              destination={{
                latitude: Number(recipientLatitude),
                longitude: Number(recipientLongitude),
                  }}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor="#1b77fb"
            />
      
          </MapView>

        </View>
        <View style={styles.floatingButtonContainer}>
           <TouchableOpacity            onPress={()=>{this.props.navigation.navigate("ChatScreen", { driverId: this.state.driverId,sender:this.state.sender })}}
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
    letterSpacing:0.5}}>Contact Driver</Text>
      </TouchableOpacity>
        </View>
      </View>
          );
          }
          }
          const styles = StyleSheet.create({
            floatingButtonContainer: {
              position: 'absolute',
              bottom: '0%',
              left: '21%',
              alignSelf: 'flex-end',
            },
            wrapper: {
              flex: 1,
            },
            infoContainer: {
              
              padding: 10,
            },
            infoText: {
              marginBottom: 10,
            },
            mapContainer: {
              flex: 9,
            },
            map: {
              ...StyleSheet.absoluteFillObject,
            },
          });
          export default withNavigation(TrackOrder);

