import { Button, FlatList, Text, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import AddProductButton from '../../components/AddProductButton'
import { useAuth } from '../../context/AuthContext'
import { instance } from '../../services/api'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackType } from '../../../types'
import {ProductComponent,ProductListHeader} from '../../components/'

const Home = () => {
    const isFocuesed = useIsFocused()
    const {token} = useAuth()
    const [products, setProducts] = useState()
    const getProducts = async()=>{
        const products = await instance.get('/product/list',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then((res)=>{return res.data})
        console.log(products);
        setProducts(products['products'])
        return products
    }
    useEffect(() => {
        getProducts()
    }, [isFocuesed])
   
    return ( 
        <View style={{flex:1,backgroundColor:'#fff'}}>
            {products&&(
                <FlatList
                    data={products}
                    renderItem={({item})=>(<ProductComponent item={item}/>)}
                    ListHeaderComponent={()=>(<ProductListHeader/>)}
                />
            )}
            <AddProductButton/>
        </View>
    )
}

export default Home