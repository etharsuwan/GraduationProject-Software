import { StyleSheet, SafeAreaView,Text ,View,TextInput,TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LogOut from '../Components/logout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useContext } from 'react'
import { AuthContext } from '../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const SettingScreen = ({navigation}) => {
   
    const Account = async () => {
        navigation.navigate('Account')
    }
    const About=async()=>{
        navigation.navigate('AboutPage')
    }
    const [state, setState] = useContext(AuthContext);

    const signOut = async () => {
        await AsyncStorage.removeItem('auth-rn');

        setState({ token: "", user: null });
        navigation.navigate('First')


    }

    return (

        <KeyboardAvoidingView          
        style={{flex:1,backgroundColor:'white' }}>
          <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{padding:25,}}>
            <Text style={{fontSize:20,fontWeight:'bold',alignSelf:'center',}} >Welcome! {state.user.name}</Text>
          </View>
          <View style={{flex:1, marginHorizontal:20,marginVertical:60}}>
            
           <TouchableOpacity  
                           onPress={Account}> 
                              <View style={styles.buttonStyle} >
          <Ionicons name="person-circle-outline" size={35} color='#EA9937' />

       
                          <Text style={styles.buttonText}>Account</Text>
                          </View>               
                                 </TouchableOpacity>     

                                       <TouchableOpacity  
                           onPress={About}> 
                              <View style={styles.buttonStyle} >
          <Ionicons name="information-circle-outline" size={35} color='#EA9937' />

       
                          <Text style={styles.buttonText}>About</Text>
                          </View>               
                                 </TouchableOpacity>          

               <TouchableOpacity  
                           onPress={signOut}>       
                               <View style={styles.buttonStyle} >
          <Ionicons name="log-out-outline" size={30} color='#EA9937' />

          
                          <Text style={styles.buttonText}>Log Out</Text>
                          </View>        
                                        </TouchableOpacity>        

                        
                          
              </View>    
                 </ScrollView>
             
                </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    text:{fontSize:14,color:'black',marginBottom:10,marginLeft:29},
    container: { flex: 1 },
    mainText: { fontSize: 14, textAlign: 'center' },
    TextInput:{  height:50,
        padding:5,
        marginTop:5,
            fontSize:12,
            borderWidth:0.8,
            borderColor:'gray',
            borderRadius:8,
            backgroundColor:"white",
            
           },
           buttonText:{

            fontSize:18,
            color:'black',
            letterSpacing:0.5,marginLeft:10
           },
            buttonStyle:{
                flex:1,
                flexDirection:'row',
            backgroundColor:"#fbebd7",
            height:54,

            borderRadius:19,
            borderColor:"#EA9937",
            borderWidth:0.8,
            paddingHorizontal:15,
            marginVertical:7,
paddingVertical:7         }
});

export default SettingScreen
