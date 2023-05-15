import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from '../context/auth';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const Account = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');

    const [role, setRole] = useState('');
    const [image, setImage] = useState({ url: "", public_id: "" })
    const [state, setState] = useContext(AuthContext);
    const [edit, setEdit] = useState("");

    useEffect(() => {
        if(state) {
            const { name, email, phone,city,role, } = state.user;
            setName(name);
            setEmail(email);
            setPhone(phone);
            setImage(image);
            setCity(city);
            setRole(role);

        }
    }, [state]);

//     const handleSubmit = async () => {
//         try {
//             let storedData = await AsyncStorage.getItem("auth-rn");
//             const user = JSON.parse(storedData);
//             console.log('stored ---->')
//             console.log(storedData)
//             console.log(user)
//             const resp = await axios.post("http://172.20.10.6:8000/api/update-password", { password, user });
//             const data = resp.data;
//             if(data.error) alert(data.error);
//             else{
//                 alert("Password updated successfully");
//                 setPassword("");
//             }
//         } catch (error) {
//             alert("Password update failed");
//             console.log(error);
//         }
//     };


    return (
        <KeyboardAwareScrollView style={{backgroundColor:'white'}}>
            <View style={{ marginVertical: 30 ,marginHorizontal:15}}>
                <Text style={{alignSelf:'center',justifyContent:'center',fontWeight:'bold',fontSize:26,marginBottom:25}}>Profile</Text>
              <Text style={{marginLeft:20,fontSize:17}}>Username</Text>
            <View style={styles.borderStyle}>
            <Text style={styles.Text}>{name} </Text>
                </View>
                <Text style={{marginLeft:20,fontSize:17}}>Email</Text>
                <View style={styles.borderStyle}>
                <Text style={styles.Text}>{email} </Text>
               </View>
               <Text style={{marginLeft:20,fontSize:17}}>Phone</Text>

               <View style={styles.borderStyle}>
               <Text style={styles.Text}>{phone} </Text>
               </View>
               <Text style={{marginLeft:20,fontSize:17}}>City</Text>

               <View style={styles.borderStyle}>
               <Text style={styles.Text}>{city} </Text>

               </View>
               <Text style={{marginLeft:20,fontSize:17}}>Role</Text>

               <View style={styles.borderStyle}>
               <Text style={styles.Text}> {role}  </Text>
               </View>
               
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    iconStyle: { marginTop: -5, marginBottom: 10, alignSelf: "center"},
    container: { flex:1, justifyContent: 'center',backgroundColor:'white'},
    borderStyle:{ marginVertical:10,marginLeft:20},
    Text: { fontSize: 15,color:'black'},
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#EA9945",
        marginBottom: 30,
    },

    buttonStyle: {
        backgroundColor: "darkmagenta",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 1,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
})

export default Account