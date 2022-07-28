import { AxiosResponse } from 'axios'
import { instance } from './api'

export const get_token = async(email:string,password:string) =>{
    let response = null
    try {
        response = await instance.post<AxiosResponse>('/user/login',{
            email:email,
            password:password
        }) 
        return response
    } catch (error) {
        return error.response
    }
}

export const register_user =async (email:string,password:string,password_confirm:string) => {
    let response = null
    try {        
        response = await instance.post('/user/register',{
            email:email,
            password:password,
            password_confirm:password_confirm
        })
        return response
    } catch (error) {
        return error
    } 
}