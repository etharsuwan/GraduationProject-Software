import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { AuthProvider } from '../context/auth'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthStack from './AuthStack';
const Navigation = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

        <NavigationContainer>
            <AuthProvider>
                    < AuthStack/>
            </AuthProvider>
        </NavigationContainer>
        </GestureHandlerRootView>
    )
}

export default Navigation;