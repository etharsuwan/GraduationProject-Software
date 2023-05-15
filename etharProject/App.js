import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View} from 'react-native';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthStack from './Components/AuthStack';

import {createStackNavigator} from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';
import Navigation from './Components/Navigation';

// import render from 'react-native-web/dist/cjs/exports/render';

export default function App(){
      return(
<Navigation/>   
 )
}

 
//     return (
//   <View>
   
//       <First/>
//   </View>
 

//     );}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
