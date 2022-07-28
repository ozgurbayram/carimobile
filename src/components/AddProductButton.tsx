import { StyleSheet } from 'react-native'
import React from 'react'
import AnimatedPress from './AnimatedPress'

import {Ionicons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackType } from '../../types'

const AddProductButton = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackType>>()
    const navigateToAddProductPage = () =>{navigation.navigate('CreateProduct')}

    return (
        <AnimatedPress style={styles.button} onPress={navigateToAddProductPage}>
            <Ionicons name='add' size={28} color={"#fff"}/>
        </AnimatedPress>
    )
}

const styles = StyleSheet.create({
    button:{
        position:'absolute',
        bottom:30,
        right:30,
        height:65,
        width:65,
        borderRadius:100,
        backgroundColor:'#333',
        alignItems:'center',
        justifyContent:'center'
    }
})

export default AddProductButton