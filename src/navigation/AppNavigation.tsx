import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackType } from '../../types'
import Home from '../screens/App/Home'
import CreateProduct from '../screens/App/CreateProduct'
import HomeHeader from '../components/HomeHeader'
import SearchProduct from '../screens/App/SearchProduct'
import Basket from '../screens/App/Basket'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useBasket } from '../context/BasketContext'
import Payment from '../screens/App/Payment'
import CompleatedPayments from '../screens/App/CompleatedPayments'
const AppStack = createNativeStackNavigator<AppStackType>()

const AppNavigation = () => {
    const {basketDispatch} = useBasket()
    const getBasket= async()=>{
        const basket = await AsyncStorage.getItem('basket')
        if(basket!=undefined) {
            basketDispatch({type:'SET_BASKET',products:JSON.parse(basket)})
        }
    }
    useEffect(() => {
        getBasket()
    }, [])
       
    return (
        <AppStack.Navigator
            screenOptions={{
                headerShown:false,
                animation:'fade_from_bottom'
            }}
        >
            <AppStack.Screen 
                name='Home'
                component={Home}
                options={{
                    headerShown:true,
                    header:()=>{
                        return (
                            <HomeHeader/>
                        )
                    }
                }}
            />
            <AppStack.Screen name='CreateProduct' component={CreateProduct}/>
            <AppStack.Screen name='SearchProduct' component={SearchProduct}/>
            <AppStack.Screen name='Basket' component={Basket}/> 
            <AppStack.Screen name='Payment' component={Payment}/>
            <AppStack.Screen name='CompleatedPayments' component={CompleatedPayments}/>
        </AppStack.Navigator>
    )
}

export default AppNavigation