import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons'
import AnimatedPress from './AnimatedPress'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackType } from '../../types'

const ProductListHeader = ({onSelect}:{onSelect:()=>void}) => {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackType>>()
    const navigateToSearch = ()=>{navigation.navigate('SearchProduct')}
    return (
        <View style={styles.container}>
            <AnimatedPress style={styles.filterButton} onPress={onSelect}>
                <Text style={{color:'#fff'}}>Sıralama Ölçütü</Text>
                <Ionicons name='arrow-down-circle-sharp' size={20} color="#fff"/>
            </AnimatedPress>
            <AnimatedPress onPress={navigateToSearch}>
                <Ionicons name='search' size={28} color="#333"/>
            </AnimatedPress>
        </View>
    )
}

export default ProductListHeader

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        height:70,
        paddingHorizontal:20,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
    },
    item:{
        height:'100%',
        width:'20%',
        alignItems:'center',
        justifyContent:'center'
    },
    search:{
        width:'10%'
    },
    filterButton:{
        backgroundColor:'rgba(0,0,0,0.5)',
        padding:8,
        borderRadius:25,
        display:'flex',
        flexDirection:'row',
        width:130,
        alignItems:'center',
        justifyContent:'space-between'
    },
    searchContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%'
    }
})