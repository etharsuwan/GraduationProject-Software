import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const FooterItem = ({ name, text,handlePress,screenName,routeName}) => {
const activeScreenColor=screenName===routeName&&"darkmagenta";
    return (
        <TouchableOpacity onPress={handlePress}>
            <>
                <Ionicons name={name} size={25} style={styles.fontStyle} color={activeScreenColor}/>
                <Text style={styles.iconText}>{text}</Text>
            </>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
    fontStyle: { marginBottom: 3, alignSelf: 'center' ,color:'#EA9937'},
    iconText: { fontSize: 9, textAlign: 'center', textTransform: 'uppercase' }
})

export default FooterItem