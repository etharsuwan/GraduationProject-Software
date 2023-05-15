import React, { useState } from 'react';
import {Text, View, TextInput, TouchableOpacity, Image ,TouchableWithoutFeedback} from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styleAuth from '../style/authStyle';
import axios from 'axios';
import PhoneInput from "react-native-phone-number-input";

export default function SignUpcustomer({navigation}) {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [city,setCity]=useState("");
    const [password,setPassword]=useState("");
    
    const handleSubmit = async () => {
        if(name === '' ||email === '' || phone===''||city===''|| password === '') {
            alert('Please fill all fields');
            return;
        }
        const newUser= {
            name, email,phone,city,password
        };
console.log(newUser);
        const resp = await axios.post("http://172.20.10.6:8000/api/customerSignup", newUser);
        
        if(resp.data.error) 
        alert(resp.data.error);
    else{
              alert("Sign Up Successful \n Login in to your Account");
        navigation.navigate('Logincustomer');
    }
    }

        return(
        <KeyboardAwareScrollView contentCotainerStyle={styleAuth.container} >
            <TouchableWithoutFeedback>
            <View style={{backgroundColor:'white'}}>
                <View style={{ marginVertical: 25 }}>
                        <View style={styleAuth.imageContainer}>
                        <Image source={require("../assets/logo-no-background.png")} style={styleAuth.logoStyle} />
                        </View>

                        {/* first and last name */}
                        <View style={{ marginHorizontal: 24,marginBottom:20 }}>
                                <Text style={{ fontSize: 14, color: '#EA9945'}}>Your Name</Text>
                                <TextInput
                            
                                name="name" 
                                keyboardType='text' 
                                placeholderTextColor="black"
                                value={name}
                                onChangeText={text => setName(text)}
                                style={styleAuth.loginInput}/>
                            </View>


                        {/* Email  */}
                        <View style={{ marginHorizontal: 23,marginBottom:20 }}>
                                <Text style={{ fontSize: 14, color: '#EA9945' }}>Email</Text>
                                <TextInput autoCompleteType="email"    keyboardType='email-address' placeholderTextColor="black" value={email} 
                        style={styleAuth.loginInput}
                        onChangeText={text => setEmail(text)}/>
                            </View>
                            <View style={{ marginHorizontal: 23,marginBottom:20 }}>
                                <Text style={{fontSize: 14, color: '#EA9945' }}>Phone Number</Text>

        <TextInput  style={styleAuth.loginInput}
                    value={phone} 
                    onChangeText={(text) => {
                        setPhone(text);
                    }}/>
                    {/* <View >
        <PhoneInput
     
                    initialCountry="ps"
                    onChangeText={(text) => {
                        setValue(phone);
                      }}
                    withDarkTheme

                    autoFocus
        
                />
                </View> */}
                                </View>

                                <View style={{ marginHorizontal: 24,marginBottom:20 }}>
                                <Text style={{ fontSize: 14, color: '#EA9945'}}>City</Text>
                                <TextInput
                            
                                name="City" 
                                keyboardType='text' 
                                placeholderTextColor="black"
                                value={city} 
                                onChangeText={text => setCity(text)}
                                style={styleAuth.loginInput}/>
                            </View>


                         

                    {/* password and confirmation */}

                    <View style={{ marginHorizontal: 23,marginBottom:20 }}>
                        <Text style={{ fontSize: 14, color: '#EA9945' }}>Password</Text>

                        <TextInput 
                        autoCompleteType="password"  
                        keyboardType='password' 
                        placeholderTextColor="#8e93a1"
                        secureTextEntry={true} 
                        value={password} 
                        style={styleAuth.loginInput}
                        onChangeText={text => setPassword(text)} />

                    </View>

                    
                    <TouchableOpacity  style={styleAuth.buttonStyle}  onPress={() => handleSubmit(this)} >
                        <Text style={styleAuth.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={{flex:1 ,flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ fontSize: 14, textAlign: 'center' }}>
                            Already Joined? {" "}
                            <Text style={{ color: '#EA9937', alignItems:'center'}} onPress={() => navigation.navigate("Logincustomer")}>
                                Sign In
                            </Text>
                        </Text>
                        </View>    
                        </View>
                </View>
</TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

        ) }
