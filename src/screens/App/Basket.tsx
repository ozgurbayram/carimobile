import { Button, FlatList, ListRenderItemInfo, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBasket } from '../../context/BasketContext'
import { AppStackType, Product } from '../../../types'
import { AnimatedPress, BasketHeader } from '../../components'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
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
            <View>
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
    const navigation = useNavigation<NativeStackNavigationProp<AppStackType>>()

    const {basketState} = useBasket()
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
            <SafeAreaView style={styles.emptyScreen}>
                <BasketHeader/>
                <Text style={{fontSize:21,alignSelf:'center',paddingTop:100}}>Sepetiniz boş</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
            <View style={styles.container}>
                <BasketHeader/>
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
                    <Button title='Ödeme yap' onPress={()=>{navigation.navigate('Payment')}}/>
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
    }
})