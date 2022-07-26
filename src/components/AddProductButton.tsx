import { View, Text } from 'react-native'
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
        <AnimatedPress style={{padding:15}} onPress={navigateToAddProductPage}>
           <Ionicons name='add' size={28} color={"#333"}/>
        </AnimatedPress>
    )
}

export default AddProductButton