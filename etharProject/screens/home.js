import React, { useState,useContext } from 'react';
import { StyleSheet, SafeAreaView,Text ,View,TextInput,TouchableOpacity} from 'react-native';

import { AuthContext } from '../context/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

 const Home=()=> {
    const [state, setState] = useContext(AuthContext);
    

   
        
    const {name,email,phone,city, password,role } = state.user;
        

    return(      
           <KeyboardAvoidingView
        style={{flex:1}}>     
        {role==="customer"?(
    
    <SafeAreaView style={{flex:1 ,backgroundColor:'white'}}>


<View style={{flex:1, marginHorizontal:30,marginVertical:100}}>
    <Text style={styles.text}>Enter Your Package Tracking Number:</Text>
    <TextInput style={styles.TextInput}/>
    <TouchableOpacity  
                   
                     style={styles.buttonStyle}>
                    
                    <Text style={styles.buttonText}>Show Delivery Details</Text>
                </TouchableOpacity>
    
    </View>    
   
      </SafeAreaView>
        ) :(

           
<View>
<Text style={styles.mainText}>{role}</Text>
           </View> 
        )}  
    

</KeyboardAvoidingView>
       
    )
    
}
const styles = StyleSheet.create({
    text:{fontSize:18,color:'black',marginBottom:10},
    container: { flex: 1 },
    mainText: { fontSize: 25, textAlign: 'center' },
    TextInput:{  height:50,
        padding:10,
        marginTop:5,
            fontSize:14,
            borderWidth:1.8,
            borderColor:'#EA9937',
            borderRadius:30,
            backgroundColor:"white",
            
           },
           buttonText:{
            fontSize:20,
            fontWeight:'600',
            color:'white',
            letterSpacing:0.5
           },
            buttonStyle:{
            backgroundColor:"#EA9937",
            height:54,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:35,
            marginHorizontal:30,
            
            marginVertical:15,
            borderWidth:1,
            borderColor:'#EA9937',
            shadowColor:'#000',
            shadowOffset:{
                width:0,
                height:4,
            }}
});
export default Home;