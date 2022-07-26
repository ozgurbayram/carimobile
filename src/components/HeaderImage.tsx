import { View, Text, Image } from 'react-native'
import React from 'react'

const HeaderImage = () => {
    return (
        <Image source={require('../../assets/logo.png')} style={{
            resizeMode:'center',
            width:100
        }}/>
    )
}

export default HeaderImage