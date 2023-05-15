import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FooterItem from './FooterItem'
import { useNavigation, useRoute } from '@react-navigation/native'

const CustomerList = () => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.container}>
            <FooterItem text="Home" name="home-outline" screenName="HomeScreen" handlePress={() => navigation.navigate('HomeScreen')} routeName={route.name} />
            <FooterItem text="Post" name="add-circle-outline" screenName="SettingScreen" handlePress={() => navigation.navigate('SettingScreen')} routeName={route.name} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexDirection: 'row',
        margin: 10,
        marginHorizontal: 30,
        justifyContent: 'space-between'
    }
})

export default CustomerList