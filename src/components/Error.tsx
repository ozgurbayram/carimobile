import { Text, StyleSheet } from 'react-native'
import React from 'react'
import Animated, {  FadeInUp, FadeOutUp } from 'react-native-reanimated'

interface Props {
    error:string
}
const Error = ({error}:Props) => {
    return (
        <Animated.View entering={FadeInUp} exiting={FadeOutUp} style={styles.container}>
            <Text>{error}</Text>
        </Animated.View>
    )
}
const styles  = StyleSheet.create({
    container:{
        top:0,
        width:'100%',
        backgroundColor:'red',
        height:50
    }
})
export default Error