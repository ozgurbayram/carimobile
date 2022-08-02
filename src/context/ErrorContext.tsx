import { createContext, ReactNode, useContext, useState } from 'react';
import { Text } from 'react-native';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

// eslint-disable-next-line no-unused-vars
const ErrorContext= createContext<{error:string|null,createError:(error:string)=>void}>({
    error:null,
    createError:()=>{null},
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
    
    const value = {error,createError}

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