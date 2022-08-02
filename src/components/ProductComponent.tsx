import React from 'react'
import AnimatedPress from './AnimatedPress'
import { Ionicons } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { instance } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { AxiosResponse } from 'axios';
import { useError } from '../context/ErrorContext';
import Animated, { SlideInRight, SlideOutLeft,Layout } from 'react-native-reanimated';
import { StyleSheet, Text, View } from 'react-native';
import { useRef } from 'react';
import { Product } from '../../types';
import { useBasket } from '../context/BasketContext';

const ProductComponent = ({
    id,
    barcode,
    name,
    price
}:Product) => {
    const {token} = useAuth()
    const {productDispatch} = useProducts()
    const {createError} = useError()
    const swipeableRef = useRef<Swipeable>()
    const deleteProduct = async()=>{
        const res:AxiosResponse = await instance.delete(`/product/${id}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        if(res.status==200) {
            productDispatch({type:'DELETE_PRODUCT',id:id})
            swipeableRef.current?.close()
        }else{
            createError(res.data['message'])
        }
    }

    const renderLeftActions = () => {
        return (
            <RectButton style={[styles.leftAction]} onPress={deleteProduct}>
                <Text>Delete</Text>
            </RectButton>
        );
    };
    const {basketDispatch} = useBasket()
    const add = () =>{
        basketDispatch({type:'ADD_TO_BASKET',product:{id,barcode,name,price}})
    } 
    return (
        <Swipeable renderRightActions={renderLeftActions} ref={swipeableRef}>
            <Animated.View style={styles.item} entering={SlideInRight} exiting={SlideOutLeft} layout={Layout}>
                <View>
                    <Text style={[styles.text]}>İsim:{name}</Text>
                    <Text style={styles.text}>Bakod:{barcode}</Text>
                    <Text style={styles.text}>Fiyat:{price} TL</Text>
                </View>
                <AnimatedPress style={styles.addButton} onPress={add}>
                    <Ionicons name='cart' size={22} color="#fff" />
                </AnimatedPress>
            </Animated.View>
        </Swipeable>
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
        backgroundColor:'#fff'
    },
    text:{
        fontSize:16
    },
    addButton:{
        height:40,
        width:40,
        backgroundColor:'#ff3838',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    actionText:{},
    leftAction:{
        backgroundColor:'red',
        width:100,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default ProductComponent