import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// eslint-disable-next-line no-unused-vars
const AuthContext = createContext<{token:string|null,email:string|null,login:(token:string,email:string)=>void,logout:()=>void}>({
    login:()=>null,
    token:null,
    email:null,
    logout:()=>null
})


interface Props {
    children:ReactNode
}
const AuthContextProvider = ({children}:Props)=>{
    const [token, setToken] = useState<string|null>(null)
    const [email, setEmail] = useState<string|null>(null)
    const login = async(token:string,email:string)=>{
        await AsyncStorage.setItem('token',token)
        await AsyncStorage.setItem('email',email)
        setToken(token)
        setEmail(email)
    }
    const logout = async()=>{
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('email')
        setToken(null)
        setEmail(null)
    }  
    const getExistUser = async()=>{
        const token = await AsyncStorage.getItem('token')
        const email = await AsyncStorage.getItem('email')
        if(token && email) {
            setToken(token)
            setEmail(email)
        }
    }
    useEffect(() => {
        getExistUser()
    }, [])
    
    return (
        <AuthContext.Provider value={{
            login:login,
            logout:logout,
            token:token,
            email:email
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = ()=>{
    const auth = useContext(AuthContext)
    return auth 
}
export default AuthContextProvider