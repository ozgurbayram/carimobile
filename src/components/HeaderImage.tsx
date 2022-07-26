import { View, Text, Image } from 'react-native'
import React from 'react'

const HeaderImage = () => {
    return (
        <View style={{width:150}}>
            <Image source={require('../../assets/logo.png')} style={{
                resizeMode:'center',
                width:100
            }}/>
        </View>
    )
}

export default HeaderImage