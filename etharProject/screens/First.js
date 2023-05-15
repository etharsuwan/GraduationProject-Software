import React from 'react';
import Svg,{Image} from "react-native-svg";
import { Text,StyleSheet,View,Dimensions ,TouchableOpacity} from "react-native";

const {height,width}=Dimensions.get('window');

export default function First({navigation}) {

    return(
      <View style={styleFirst.container}>
          <View style={[StyleSheet.absoluteFill]}>
            <Svg height={height} width={width}>
              <Image
              href={require('../assets/d.png')}
              width={width}
              height={height}
              preserveAspectRatio="xMidYMid slice"
              />
            </Svg>
       
          </View>
      
        <View style={styleFirst.bottomContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate('Logincustomer')}>
          <View style={styleFirst.button}>
            <Text style={styleFirst.buttonText}>Customer</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <View style={styleFirst.button}>
          <Text style={styleFirst.buttonText}>Driver</Text>

          </View></TouchableOpacity>
          </View>

          {/* 
          <View  style={styles.formContainer}>
          <View style={styles.formInputContainer}>
              
            <TextInput
              name="Email" 
              placeholder='Email' 
              autoCompleteType="email"  
              keyboardType='email-address' 
              placeholderTextColor="black"
              style={styles.textinput}/>
            
            
              

              <TextInput 
              placeholder='Password'
              autoCompleteType="password"  
              keyboardType='password' 
              placeholderTextColor="black"

              secureTextEntry={true} 
              style={styles.textinput} />
            <View style={styles.formButton}>
              <Text style={styles.formButtonText}>Log In</Text>
            </View>
            </View>       </View>
*/}
        </View>
    );
}

const styleFirst=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-end'
},
bottomContainer:{
  justifyContent:'center',
  height:height/3,
  backgroundColor:"white",

},
button:{
  backgroundColor:'#EA9937',
  height:55,
  alignItems:'center',
  justifyContent:'center',
  borderRadius:35,
  marginHorizontal:20,
  marginVertical:10,
  borderWidth:1,
  borderColor:'white'
},


buttonText:{
  fontSize:17,
  fontWeight:'600',
  color:'white',
  letterSpacing:0.5
},
})