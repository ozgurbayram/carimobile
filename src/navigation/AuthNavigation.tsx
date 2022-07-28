import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackType } from '../../types'
import Login from '../screens/Auth/Login'
import Register from '../screens/Auth/Register'
import AuthHeader from '../components/AuthHeader'

const AuthStack = createNativeStackNavigator<AuthStackType>()
const AuthNavigation = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                header:AuthHeader,
                animation:'fade_from_bottom'
            }}
        >
            <AuthStack.Screen name='Login' component={Login}/>
            <AuthStack.Screen name='Register' component={Register}/>
        </AuthStack.Navigator>
    )
}

export default AuthNavigation