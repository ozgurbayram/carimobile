import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useReducer } from 'react';
import { Product } from '../../types';

type State = {
    basket:Product[] |null
}

type Action = 
    {type:'ADD_TO_BASKET',product:Product}|
    {type:'REMOVE_FROM_BASKET',id:string}|
    {type:'INCERASE',id:string}|
    {type:'DECRASE',id:string}|
    {type:'SET_BASKET',products:Product[]}|
    {type:'CLEAR_BASKET'}

// eslint-disable-next-line no-unused-vars
type Dispatch = (action:Action) =>void

const BasketContext = createContext<
    {basketState:State,basketDispatch:Dispatch}
>({
    basketState:{
        basket:null
    },
    basketDispatch:()=>{null}
})

const basketReducer = (state:State,action:Action)=>{
    switch (action.type) {
    case 'SET_BASKET':
        return{
            ...state,
            basket:action.products
        }
    case 'ADD_TO_BASKET':
        if(state.basket) {
            const id = action.product.id
            const product= state.basket.find((i)=>{return i.id==id})
            if(product!=undefined) {    
                product.count = product.count ? product.count+1:2
                return{
                    ...state,
                }
            }
            else{
                return {
                    ...state,
                    basket:[...state.basket,{...action.product,count:1}]
                }
            }
        }
        return {
            ...state,
            basket:[action.product]
        }
    case 'REMOVE_FROM_BASKET':
        if(state.basket) {
            const new_list = state.basket.filter((i)=>{return i.id!=action.id})
            return{
                ...state,
                basket:new_list
            }
        }
        return {...state}
    case 'INCERASE':
        if(state.basket) {
            const product = state.basket.find((i)=>{return i.id==action.id})
            if(product!=undefined) {
                product.count = product.count ? product.count+1:2

                return {
                    ...state
                }
            }
            return {
                ...state
            }
        }
        else{
            return {...state}
        }
    case 'DECRASE':
        if(state.basket) {
            const product = state.basket.find((i)=>{return i.id==action.id})
            if(product?.count) {
                product.count = product.count-1
            }
            return {
                ...state
            }
        }
        else{
            return {...state}
        }
    
    case 'CLEAR_BASKET':
        return{
            ...state,
            basket:null
        }
    default:
        return {
            ...state
        }
    }
}

const  BasketContextProvider = ({children}:{children:ReactNode}) =>{
    const [basketState,basketDispatch] = useReducer(basketReducer, {basket:null})
    const value = {basketState,basketDispatch}
    const saveBasket = useCallback(
        async() => {
            if(basketState.basket) {
                await AsyncStorage.setItem('basket',JSON.stringify(basketState.basket))
            }
        },
        [basketState.basket],
    )
    useEffect(() => {
        saveBasket()
    }, [basketState.basket])
    
    return(
        <BasketContext.Provider value={value}>
            {children}
        </BasketContext.Provider>
    )
}

export const useBasket = () =>{
    const ctx = useContext(BasketContext)
    return ctx
}

export default BasketContextProvider 