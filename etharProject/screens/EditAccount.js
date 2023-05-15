import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from '../context/auth';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const Edit = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');

    const [role, setRole] = useState('');
    const [image, setImage] = useState({ url: "", public_id: "" })
    const [state, setState] = useContext(AuthContext);
    const [uploadImage, setUploadImage] = useState("");

    useEffect(() => {
        if(state) {
            const { name, email, phone,city } = state.user;
            setName(name);
            setEmail(email);
            setPhone(phone);
            setImage(image);
            setCity(city);
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
            <View style={{ marginVertical: 50 }}>
              <Text style={{marginLeft:15}}>Username</Text>
            <View style={styles.borderStyle}>
                <TextInput value={name}  style={styles.Text}/>
                </View>
                <Text style={{marginLeft:15}}>Email</Text>
                <View style={styles.borderStyle}>
                <TextInput value={email} style={styles.Text}/>
               </View>
               <Text style={{marginLeft:15}}>Phone</Text>

               <View style={styles.borderStyle}>
               <TextInput value={phone}  style={styles.Text}/>
               </View>
               <Text style={{marginLeft:15}}>City</Text>

               <View style={styles.borderStyle}>
               <TextInput value={city}  style={styles.Text}/>
               </View>
               
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    iconStyle: { marginTop: -5, marginBottom: 10, alignSelf: "center"},
    container: { flex:1, justifyContent: 'center',backgroundColor:'white'},
    borderStyle:{borderWidth:1,borderRadius:5, borderColor:"#434242",margin:10},
    Text: { fontSize: 16, padding: 10 ,color:'#434242'},
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
    imageContainer: { justifyContent: "center", alignItems: "center" },
    imageStyles: { width: 100, height: 100, marginVertical: 20 }
})

export default Edit