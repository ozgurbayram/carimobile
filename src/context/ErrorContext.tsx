import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";

const ErrorContext= createContext<{error:string|null,createError:(error:string)=>void,removeError:()=>void}>({
    error:null,
    createError:()=>{},
    removeError:()=>{}
})


interface Props {
    children:ReactNode
}

const ErrorContextProvider = ({children}:Props)=>{
    const [error, setError] = useState<string|null>(null)
    const createError = (error:string)=>{
        setError(error)
        const timer = setTimeout(() => {
            setError(null)
        },2000);
        return ()=>clearTimeout(timer)
    }
    const removeError =()=>{
        setError(null)
    }
    useEffect(() => {
        console.log(error);
    }, [error])
    
    const value = {error,createError,removeError}

    return (
        <ErrorContext.Provider value={value}>
            {children}
            {error!=null&&(
                <Animated.View entering={FadeInRight} exiting={FadeOutRight} style={{
                    position:'absolute',
                    top:50,
                    padding:20,
                    zIndex:1000,
                    borderRadius:10,
                    backgroundColor:'red',
                    alignSelf:'center'
                }}>
                    <Text style={{color:'#fff'}}>{error}</Text>
                </Animated.View>
            )}
        </ErrorContext.Provider>
    )
}
export const useError = () =>{
    const error = useContext(ErrorContext)
    return error
}
export default ErrorContextProvider