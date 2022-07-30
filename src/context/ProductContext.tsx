import { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';
type Product = {
    name:string
    barcode:string,
    price:number
}
type State = {
    products:Product[] |null
}
type Action = 
    {type:'SET_PRODUCTS',products:Product[]} | 
    {type:'ADD_PRODUCT',product:Product} | 
    {type:'DELETE_PRODUCT',id:string}

type Dispatch = (action:Action)=>void 
const ProductContext = createContext<{productState:State,productDispatch:Dispatch}>({
    productState:{
        products:null
    },
    productDispatch:()=>{null}
})

const productReducer = (state:State,action:Action)=>{
    switch (action.type) {
    case 'SET_PRODUCTS':
        return {
            ...state,
            products:action.products,
        }
    case 'DELETE_PRODUCT':
        if(state.products) {

            const new_list = state.products.filter((i)=>{return i.barcode != action.id})    
            return {
                ...state,
                products:new_list
            }  
        }
        return {...state}
    case 'ADD_PRODUCT':
        if(state.products) {
            return {
                ...state,
                products:[...state.products,action.product]
            }
        }
        return {...state}
    default:
        return {
            ...state
        }
    }
}
const ProductContextProvider = ({children}:{children:ReactNode}) =>{
    const [productState, productDispatch] = useReducer(productReducer, {products:null})
    const value = {productState,productDispatch}
    return(
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProducts = () =>{
    const ctx = useContext(ProductContext)
    return ctx
}

export default ProductContextProvider