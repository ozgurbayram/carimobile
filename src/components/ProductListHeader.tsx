import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import AnimatedPress from './AnimatedPress'

const ProductListHeader = ({onSelect}:{onSelect:()=>void}) => {
    return (
        <View style={styles.container}>
            <AnimatedPress style={styles.filterButton} onPress={onSelect}>
                <Text>Sıralama Ölçütü</Text>
                <Ionicons name='arrow-down-circle-sharp' size={20}/>
            </AnimatedPress>
            <RectButton style={[styles.item,styles.search]}>
                <Ionicons name='search' size={28} color="#333"/>
            </RectButton>
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
        borderBottomWidth:2
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
        backgroundColor:'#ddd',
        padding:8,
        borderRadius:25,
        display:'flex',
        flexDirection:'row',
        width:130,
        alignItems:'center',
        justifyContent:'space-between'
    }
})