import React, { useState,useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext, AuthProvider } from '../context/auth';
import {Text, View, TextInput, TouchableOpacity, Image ,StyleSheet,ActivityIndicator} from 'react-native'

// Screens
import SettingScreen from '../screens/SettingScreen';
import { Header } from 'react-native/Libraries/NewAppScreen';
import HomeScreen from '../screens/HomeScreen';
import Account from '../screens/Account';
import NewOrder from '../screens/newOrder';
import MyOrder from '../screens/MyOrders';
import DriverHome from '../screens/DriverHome';
import DriverOrder from '../screens/driverOrder';


//Screen names
const homeName = "HomeScreen";
const settingsName = "SettingScreen";
const accountName="Account";
const neworder="NewOrder";
const myorders="MyOrder";
const notification="NewOrder"
const driver = "DriverHome";
const ordersdriver="DriverOrder";

const Tab = createBottomTabNavigator();
function MainContainer() {
    const [state, setState] = useContext(AuthContext);    
const {name,email,phone,city, password,role } = state.user;
    
console.log(role);
  return (
    <AuthProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
        
            
                "tabBarActiveTintColor": "#EA9937",
                "tabBarInactiveTintColor": "grey",
                "tabBarLabelStyle": {
                  "fontSize": 10
                },
                "tabBarStyle": [
                  {
                    "display": "flex",
                    "position":"absolute",
   "backgroundColor":"white",
                

                  },
                  null
                ],
              
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            }else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            else if(rn===neworder){
                iconName = focused ? 'add-circle' : 'add-circle-outline';

            } else if(rn===myorders){
              iconName = focused ? 'list' : 'list-outline';

          }else if(rn===notification){
            iconName = focused ? 'notifications-circle' : 'notifications-circle-outline';

        } 
        else if (rn === driver) {
          iconName = focused ? 'home' : 'home-outline';

        }
        else if (rn === ordersdriver) {
          iconName = focused ? 'list' : 'list-outline';

        }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        >


{role==='customer' ? (
                <>
        <Tab.Screen name={homeName} component={HomeScreen} options={{ title:'Home',Header:'false', headerShown: false,headerRight:(()=> <Image source={require("../assets/logo-no-background.png")} style={styles.logoStyle} />
)}}/>
        <Tab.Screen name={neworder} component={NewOrder} options={{title:'Order', Header:'false', headerShown: false}}/>
        <Tab.Screen name={myorders} component={MyOrder} options={{title:'Orders', Header:'false', headerShown: false}}/>

        <Tab.Screen name={settingsName} component={SettingScreen} options={{title:'Setting', Header:'false', headerShown: false}}/>

        </>
                ) : (

                <>   

<Tab.Screen name={driver} component={DriverHome} options={{ title:'Home',Header:'false', headerShown: false,headerRight:(()=> <Image source={require("../assets/logo-no-background.png")} style={styles.logoStyle} />
)}}/>
        <Tab.Screen name={ordersdriver} component={DriverOrder} options={{title:'Orders', Header:'false', headerShown: false}}/>

        <Tab.Screen name={settingsName} component={SettingScreen} options={{title:'Setting', Header:'false', headerShown: false}}/>



</>
            )}          
      </Tab.Navigator>
      </AuthProvider>
  );
}

export default MainContainer;
const styles=StyleSheet.create({

  
  
  logoStyle:{
   width: 50, 
   height: 50, 
 
  },
})