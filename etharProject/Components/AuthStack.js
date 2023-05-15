import React,{setState,useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Account from '../screens/Account';
import SuccessModal from '../screens/SuccessModal';
import ResetPassword from '../screens/ResetPassword';
import SignUpcustomer from '../screens/SignUpcustomer';
import Logincustomer from '../screens/Logincustomer';
import { AuthContext } from '../context/auth';
import ForgetPassword from '../screens/forgetPassword';
// import OrderMap from '../screens/OrderMap';//for driver
import First from '../screens/First';
import AboutPage from '../screens/AboutPage';
import LogOut from './logout';
import MainContainer from './MainContainer';
import styleAuth from '../style/authStyle';
import {Text, View, TextInput, TouchableOpacity, Image ,StyleSheet,Dimensions} from 'react-native'
import TrackOrder from '../screens/TrackOrder'
import OrderDetails from '../screens/OrderDetails'
import DriverOrderDetail from '../screens/driverOrderDetail'
import ChatScreen from '../screens/Chat'
import DriverChat from '../screens/DriverChat'

import DriverMap from '../screens/driverMapView'
const Stack=createNativeStackNavigator();
const {height,width}=Dimensions.get("screen");

const NavigationScreen = () => {
    
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.token !== "" && state.user !== null;

    return (
        <Stack.Navigator initialRouteName="HomeScreen" >
            {authenticated ? (
                <>
                {/* ,headerRight: () => <LogOut /> */}
                    <Stack.Screen name="MainContainer" component={MainContainer} options={{ title:'',headerStyle: {
      backgroundColor: '#EA9937'    },headerLeft:(()=> <View style={{marginHorizontal:width/2.8,backgroundColor:"#EA9937"}}>
      <Image source={require("../assets/logo-no-background.png")} style={styles.logoStyle} /></View>
     )}}/>                     
         <Stack.Screen name="TrackOrder" component={TrackOrder} options={{ title:""}}/>
         <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ title:""}}/>
         <Stack.Screen name="AboutPage" component={AboutPage} options={{ title:""}}/>

                         <Stack.Screen name="Account" component={Account} options={{ title:""}}/>
                         <Stack.Screen name="SuccessModal" component={SuccessModal} options={{ title:""}}/>
                         <Stack.Screen name="DriverOrderDetail" component={DriverOrderDetail} options={{ title:""}}/>

                    <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title:" " }}    />      
                    <Stack.Screen name="DriverMap" component={DriverMap}/>       
                    <Stack.Screen name="DriverChat" component={DriverChat}/>       

                </>
                ) : (

                <>                  
                                  <Stack.Screen name="First" component={First} options={{ title:""}}/>

                <Stack.Screen name="Logincustomer" component={Logincustomer} options={{title:""}}/>
                <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title:""}}/>

                    <Stack.Screen name="SignUp" component={SignUp} options={{ title:""}}/>
                    <Stack.Screen name="SignUpcustomer" component={SignUpcustomer} options={{title:""}}/>
                    <Stack.Screen name="Login" component={Login} options={{ title:""}}/>
                    <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ title:""}}/>


                </>
            )}
            
        </Stack.Navigator>
    )
}
      export default NavigationScreen;
const styles=StyleSheet.create({

  
  
     logoStyle:{
        paddingLeft:20,
      width: 65, 
      height: 65,
      marginVertical:2
    
     },
})