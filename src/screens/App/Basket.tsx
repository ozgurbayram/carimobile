import { Button, FlatList, ListRenderItemInfo, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBasket } from '../../context/BasketContext'
import { Product } from '../../../types'
import { AnimatedPress } from '../../components'
import { Ionicons } from '@expo/vector-icons'
const BasketProduct = React.memo(({
    barcode,
    id,
    name,
    price,
    count
}:Product)=>{
    const {basketDispatch} = useBasket()
    const incerase = () =>{basketDispatch({type:'INCERASE',id:id})}
    const decrase = ()=>{
        if(count==1) {
            basketDispatch({type:'REMOVE_FROM_BASKET',id:id})   
        }else{
            basketDispatch({type:'DECRASE',id:id})
        }
    }  
    return( 
        <View style={styles.product} key={id}> 
            <View style={styles.prodctLeft}>
                <Text>Ürün: {name}</Text>
                <Text>Barkod: {barcode}</Text>
                <Text>Fiyat: {price}</Text>
            </View>
            <View style={styles.productRight}>
                <AnimatedPress onPress={incerase} style={styles.basketProductButton}>
                    <Ionicons name='add' size={19} color="#333"/>
                </AnimatedPress>
                <Text>{count}</Text>
                <AnimatedPress onPress={decrase} style={styles.basketProductButton}>
                    <Ionicons name='remove' size={19} color="#333"/>
                </AnimatedPress>
            </View>
        </View>
    )
})

const Basket = () => {
    const {basketState,basketDispatch} = useBasket()
    const {basket} = basketState
    const calculateBasketTotal = useCallback(
        () => {
            return basket?.reduce((a,b)=>a+b.price*(b.count?b.count:1),0)
        },
        [basket],
    )
    
    const _renderItem = ({item}:ListRenderItemInfo<Product>) =>{
        return(
            <View>
                <BasketProduct {...item}/>
            </View>
        ) 
    }
    if(!basket) {
        return(
            <View style={styles.emptyScreen}>
                <Text style={{fontSize:21}}>Sepetiniz boş</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    style={{
                        backgroundColor:'#fff',
                        padding:15,
                    }}
                    endFillColor={'#ddd'}
                    data={basket}
                    renderItem={_renderItem}
                />
                <View style={styles.bottom}>
                    <Text>Ödenecek Tutar: {calculateBasketTotal()}TL</Text>
                    <Button title='Ödeme yap' onPress={()=>{basketDispatch({type:'CLEAR_BASKET'})}}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Basket

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    product:{
        borderColor:'#ddd',
        backgroundColor:'#fff',
        borderWidth:1,
        marginVertical:10,
        borderRadius:6,
        paddingHorizontal:10,
        paddingVertical:20,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    productRight:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'30%',
        justifyContent:'space-between'
    },
    productLeft:{
    },
    basketProductButton:{
        height:30,
        width:30,
        backgroundColor:'#ddd',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100
    },
    bottom:{
        height:100,
        justifyContent:'space-between',
        paddingVertical:15,
        alignItems:'center',
        borderTopColor:'#ddd',
        borderTopWidth:1
    },
    emptyScreen:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    }
})