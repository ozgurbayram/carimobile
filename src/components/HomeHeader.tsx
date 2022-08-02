import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useBasket } from '../context/BasketContext'
import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppStackType } from '../../types'
import { useAuth } from '../context/AuthContext'
import AnimatedPress from './AnimatedPress'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useProducts } from '../context/ProductContext'

const HomeHeader = () => {
    const {logout} = useAuth()
    const {basketState,basketDispatch} = useBasket()
    const {productDispatch} = useProducts()
    const {basket} = basketState
    const askForLogout = () =>{ 
        Alert.alert('Çıkış yapmak istiyormusunuz.',undefined,[{
            text:'Hayır',
            onPress:()=>{null}
        },
        {
            text:'Evet',
            onPress:async()=>{
                await AsyncStorage.removeItem('basket')
                basketDispatch({type:'CLEAR_BASKET'})
                productDispatch({type:'CLEAR'})
                logout()
            }
        }
        ])
    }
    const navigation = useNavigation<NativeStackNavigationProp<AppStackType>>()
    const navigateToAddProductPage = () =>{navigation.navigate('CreateProduct')}
    const navigateToBasketPage = ()=>{navigation.navigate('Basket')}
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.left}>
                    <Text style={styles.headerText}>Ürün Listesi</Text>
                </View>
                <View style={styles.right}>
                    <AnimatedPress style={styles.button} onPress={navigateToBasketPage}> 
                        <Text style={styles.basketSizeText}>{basket?.length}</Text>
                        <Ionicons name='basket' size={24} color="#fff"/>
                    </AnimatedPress>
                    <AnimatedPress style={styles.button} onPress={navigateToAddProductPage}>
                        <Ionicons name='add' size={24} color="#fff"/>
                    </AnimatedPress>
                    <AnimatedPress onPress={askForLogout} style={styles.button}>
                        <MaterialCommunityIcons name='logout' size={22} color="#fff"/>
                    </AnimatedPress>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:60,
        paddingHorizontal:20
    },
    left:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'50%'
    },
    right:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'45%'
    },
    button:{
        backgroundColor:'rgba(0,0,0,0.5)',
        height:40,
        width:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100,
    },
    basketSizeText:{
        position:'absolute',
        right:10,
        top:1,
        color:'#fff',
        fontWeight:'bold'
    },
    headerText:{
        fontSize:24
    }
})
export default HomeHeader