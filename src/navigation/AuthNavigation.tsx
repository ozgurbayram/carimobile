import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackType } from '../../types'
import Login from '../screens/Auth/Login'
import Register from '../screens/Auth/Register'
import HeaderImage from '../components/HeaderImage'

const AuthStack = createNativeStackNavigator<AuthStackType>()
const AuthNavigation = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShadowVisible:false,
                headerTitleAlign:'center',
                headerTitle:HeaderImage,
                headerBackVisible:false,
                animation:'fade_from_bottom'
            }}
        >
            <AuthStack.Screen name='Login' component={Login}/>
            <AuthStack.Screen name='Register' component={Register}/>
        </AuthStack.Navigator>
    )
}

export default AuthNavigation