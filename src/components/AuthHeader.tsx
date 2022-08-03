import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

const AuthHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>CariApp</Text>
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
    },
    text:{
        fontSize:24,
        fontWeight:'bold'
    }
})
export default AuthHeader 