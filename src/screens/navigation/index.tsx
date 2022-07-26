import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

const Navigation = () => {
    const {token,login,logout} = useAuth()
    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text>{!token?'Not loged in':'Loged in'}</Text>
        </View>    
    )
}

export default Navigation