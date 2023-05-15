import { StyleSheet, Text,View ,SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LogOut = () => {
    const [state, setState] = useContext(AuthContext);

    const signOut = async () => {
        AsyncStorage.clear()
        .then(() => {
          console.log('Async storage cleared successfully!');
        })
        .catch(error => {
          console.log('Error clearing async storage: ', error);
        });
              await AsyncStorage.removeItem('auth-rn');
    }

    return (
        <SafeAreaView>
                        <View style={styles.buttonStyle} >
          <Ionicons name="log-out-outline" size={30} color='#EA9937' />

          <TouchableOpacity  
                           onPress={signOut}
                           style={styles.buttonStyle}>
                          
                          <Text style={styles.buttonText}>Log Out</Text>
                      </TouchableOpacity>  
                      </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({  buttonText:{
    fontSize:18,
    fontWeight:'600',
    color:'black',
    letterSpacing:0.5
    
   },
   buttonStyle:{
    flex:1,
    flexDirection:'row',
backgroundColor:"white",
alignSelf:'center',
height:54,
alignItems:'center',
borderRadius:9,
paddingHorizontal:10,
marginVertical:10,
}})

export default LogOut;