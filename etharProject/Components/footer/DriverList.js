import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FooterItem from './FooterItem'

const DriverList = () => {
  
    return (
        <View style={styles.container}>

            <FooterItem text="Account" name="md-person-circle-outline" screenName="Account" options={{name:''}} />

            <FooterItem text="Notify" name="notifications"  screenName="Post"  />

            <FooterItem text="Orders" name="md-list" screenName="Links" />
                  <FooterItem text="Home" name="home" screenName="Home" />
  </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        marginHorizontal: 30,

        justifyContent: 'space-between'
    }
})

export default DriverList