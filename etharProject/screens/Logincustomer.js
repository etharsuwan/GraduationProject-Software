import React, { useState,useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,TouchableWithoutFeedback } from 'react-native'
import { keyboard,KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styleAuth from '../style/authStyle';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';
import Home from './home';
export default function Logincustomer({navigation}) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [state, setState] = useContext(AuthContext);

  const handleClick = async () => {
    if(email === '' || password === '') {
        alert('Please fill all fields');
        return;
    }
    const newUser= {
         email, password
    };
    const resp = await axios.post("http://172.20.10.6:8000/api/signincustomer", newUser);
    if(resp.data.error) 
        alert(resp.data.error);
    else{
        setState(resp.data)
        await AsyncStorage.setItem('auth-rn', JSON.stringify(resp.data));
        alert("Sign In Successful");

    }
};

  

return(
// return (enableOnAndroid enableAutomaticScroll scrollEnabled={true}
  <KeyboardAwareScrollView contentCotainerStyle={styleAuth.container} >
    <TouchableWithoutFeedback>
    <View style={{backgroundColor:'white'}}>
     <View style={{ marginVertical: 130 }}>
            <View style={styleAuth.imageContainer}>
             <Image source={require("../assets/logo-no-background.png")} style={styleAuth.logoStyle} />
            </View>
                <View style={{ marginHorizontal: 23,marginBottom:20 }}>
                    <Text style={{ fontSize: 15, color: '#EA9937' }}>Email</Text>
                    
                    <TextInput
                      name="Email" 
                      value={email} 
                      autoCompleteType="email"  
                      keyboardType='email-address' 
                      placeholderTextColor="black"styleAuth
                      onChangeText={text => setEmail(text)}                   
                      style={styleAuth.loginInput}/>
                </View>
                <View style={{ marginHorizontal: 23,marginBottom:15}}>
                    <Text style={{ fontSize: 15, color: '#EA9937' }}>Password</Text>
                  
              <TextInput 
              name="password"
              value={password} 
              autoCompleteType="password"  
              keyboardType='password' 
              placeholderTextColor="#8e93a1"
              onChangeText={text => setPassword(text)}
              secureTextEntry={true} 
              style={styleAuth.loginInput} />
                    </View>
                    
                    <TouchableOpacity  
                     onPress={handleClick} 
                     style={styleAuth.buttonStyle}>
                    
                    <Text style={styleAuth.buttonText}>Log In</Text>
                </TouchableOpacity>
                <View style={{flex:1 ,flexDirection:'row',justifyContent:'center',
                        alignItems:'center',marginTop:20}}>
                          <Text style={{ fontSize: 14, textAlign: 'center' }}>
                    Already Joined? {" "}
                    <Text style={{ color: '#EA9937', alignItems:'center'}} onPress={() => navigation.navigate("SignUpcustomer")}>
                        Sign Up
                    </Text>
                </Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('ForgetPassword')}>
                <Text style={{ color:'#EA9937',fontSize: 12, textAlign: 'center'}}>Forgot Password?</Text>
              </TouchableOpacity> 
               </View>
</View>
</TouchableWithoutFeedback>
  </KeyboardAwareScrollView>

 ) }

 