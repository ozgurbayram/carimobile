import AsyncStorage from '@react-native-async-storage/async-storage'
import { instance } from './api'

export const create_product = async (productName:string,productPrice:number,barcode:string)=>{
    let response = null
    const token = await AsyncStorage.getItem('token')
    try {
        response = await instance.post('/product/create',{
            'barcode':barcode,
            'name':productName,
            'price':productPrice
        },
        {
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}