import { ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import React from 'react'
type Product ={
    name:string,
    price:number,
    barcode:string 
}
const ProductComponent = ({item}:ListRenderItemInfo<Product>) => {
    return (
        <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.barcode}</Text>
            <Text style={styles.text}>{item.price} TL</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    item:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:20,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
    },
    text:{
        width:'33.3%',
    }
})

export default ProductComponent