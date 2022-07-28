import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductListHeader = () => {
    return (
        <View style={styles.container}>
            <Text>Ürün Adı</Text>
            <Text>Barkod</Text>
            <Text>Ürün Fiyatı</Text>
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
        padding:20,
        borderBottomColor:'#ddd',
        borderBottomWidth:2
    }
})