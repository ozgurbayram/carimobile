import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
type State = {
    token:string|null
    login:(token:string)=>void
    logout:()=>void
}


const AuthContext = createContext<{token:string|null,login:(token:string)=>void,logout:()=>void}>({
    login:()=>{},
    token:null,
    logout:()=>{}
})


interface Props {
    children:ReactNode
}
const AuthContextProvider = ({children}:Props)=>{
    const [token, setToken] = useState<string|null>(null)
    const login = (token:string)=>{
        AsyncStorage.setItem('token',token)
        setToken(token)
    }
    const logout = ()=>{
        AsyncStorage.removeItem('token')
        setToken(null)
    }
    
    return (
        <AuthContext.Provider value={{
                login:login,
                logout:logout,
                token:token
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