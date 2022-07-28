import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

const AuthHeader = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={{
                resizeMode:'center',
                width:100,
                alignSelf:'center'
            }}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        backgroundColor:'#fff'
    }
})
export default AuthHeader 