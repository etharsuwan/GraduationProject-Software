import React, { useState,useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from '../context/auth';
import styleAuth from '../style/authStyle';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
const {height,width}=Dimensions.get("screen");

export default function ForgetPassword(props) {
    const nav = useNavigation();

    const [email,setEmail]=useState("");

    const handleClick= async () => {
        if (!email) {
            alert("Email is required");
            return;
        }
        try {
            const { data } = await axios.post("http://172.20.10.6:8000/api/forgot-password", { email }); 
            if (data.error) alert(data.error) 
            else {
                nav.navigate('ResetPassword', {
                    email,
                  });
            }
        } catch (err) { alert("Error sending email. Try again."); console.log(err); }
    };
return(
<KeyboardAwareScrollView contentCotainerStyle={styleAuth.container} >
<View style={{backgroundColor:'white',  height:height,
      width:width}}>       
       <View style={{ marginVertical: 100 }}>
                <View style={styleAuth.imageContainer}>
                  <Image source={require("../assets/logo-no-background.png")} style={styleAuth.logoStyle} />
                </View>
                <View style={{ marginHorizontal: 23,marginBottom:20 }}>
                        <Text style={{ fontSize: 14, color: '#EA9945' }}>Write your Email</Text>
                        <TextInput autoCompleteType="email"    keyboardType='email-address' placeholderTextColor="black" value={email} 
                style={styleAuth.loginInput}
                onChangeText={text => setEmail(text)}/>
                    </View>
                    <TouchableOpacity  style={styleAuth.buttonStyle}  onPress={() => handleClick(this)} >
                <Text style={styleAuth.buttonText}>Send Code</Text>
            </TouchableOpacity>


</View>
                </View>

</KeyboardAwareScrollView>);
}
