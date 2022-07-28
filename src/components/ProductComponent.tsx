import { Animated, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AnimatedPress from './AnimatedPress'
import { Ionicons } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { instance } from '../services/api';
import { useAuth } from '../context/AuthContext';

type Product ={
    name:string,
    price:number,
    barcode:string 
}
const ProductComponent = ({item}:ListRenderItemInfo<Product>) => {
    const {token} = useAuth()
    const deleteProduct = async()=>{
        await instance.delete(`/product/${item.barcode}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
            .then((res)=>{
                console.log(res);
            })
    }

    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <RectButton style={styles.leftAction} onPress={deleteProduct}>
                <Text>Delete</Text>
            </RectButton>
        );
    };

    return (
        <Swipeable renderRightActions={renderLeftActions}>
            <View style={styles.item}>
                <View>

                    <Text style={[styles.text,styles.first]}>İsim:{item.name}</Text>
                    <Text style={styles.text}>Bakod:{item.barcode}</Text>
                    <Text style={styles.text}>Fiyat:{item.price} TL</Text>
                </View>
                <AnimatedPress style={styles.addButton}>
                    <Ionicons name='cart' size={22} color="#fff" />
                </AnimatedPress>
            </View>
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