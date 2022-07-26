import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './AuthNavigation'
import AppNavigation from './AppNavigation'

const Navigation = () => {
    const {token,login,logout} = useAuth()
    return (
        <NavigationContainer>
            {!token&&<AuthNavigation/>}
            {token&&(<AppNavigation/>)}
        </NavigationContainer>
    )
}

export default Navigation