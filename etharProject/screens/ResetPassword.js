import React, { useState,useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image ,Dimensions} from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from '../context/auth';
import styleAuth from '../style/authStyle';
import { useNavigation } from '@react-navigation/native';
const {height,width}=Dimensions.get("screen");

import axios from 'axios';


export default function ResetPassword(navigation) {
    const nav = useNavigation();

    const { email } = navigation.route.params;

    const [password,setPassword]=useState("");
const [resetCode,setReset]=useState("");

    const handleClick= async () => {
        if(!email){
            alert(" error");
            return;
        }
        if(!resetCode){
            alert("Reset Code is required");
            return;
        }
        if(!password){
            alert("New password is required");
            return;
        }
        try {
            const { data } = await axios.post("http://172.20.10.6:8000/api/resetpassword", { email ,resetCode,password}); 
            if (data.error) alert(data.error) 
            else {
                alert("Your password is updated!");

                nav.navigate('Logincustomer');

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
                        <Text style={{ fontSize: 14, color: '#EA9945' }}>New Password</Text>
                        <TextInput               autoCompleteType="password"  
              keyboardType='password'                secureTextEntry={true} 
              placeholderTextColor="black" value={password} 
                style={styleAuth.loginInput}
                onChangeText={text => setPassword(text)}/>

<Text style={{ fontSize: 14, color: '#EA9945' }}>Reset Code</Text>
                        <TextInput autoCompleteType="email"    keyboardType='email-address' placeholderTextColor="black" value={resetCode} 
                style={styleAuth.loginInput}
                onChangeText={text => setReset(text)}/>
                    </View>
                    <TouchableOpacity  style={styleAuth.buttonStyle}  onPress={() => handleClick(this)} >
                <Text style={styleAuth.buttonText}>Update Password</Text>
            </TouchableOpacity>


</View>
                </View>

</KeyboardAwareScrollView>
);
}
