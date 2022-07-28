import { View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './AuthNavigation'
import AppNavigation from './AppNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Navigation = () => {
    const [loading, setLoading] = useState(true)
    const {token,login} = useAuth()
    const getToken = async()=>{
        const token = await AsyncStorage.getItem('token')
        const email = await AsyncStorage.getItem('email')
        if(token && email) {
            login(token,email)
            setLoading(false)
        }else{
            setLoading(false)
        }
    }
    useEffect(() => {
        getToken()
    }, [])
    
    if(loading) {
        return(
            <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <ActivityIndicator size={'large'} color="#333"/>
            </View>
        )   
    }else{
        return(
            <NavigationContainer>
                {token&&(<AppNavigation/>)}
                {!token&&<AuthNavigation/>}
            </NavigationContainer>
        )
    }
}

export default Navigation