import 'react-native-gesture-handler'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigation from './src/navigation'
import AuthContextProvider from './src/context/AuthContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ErrorContextProvider from './src/context/ErrorContext'
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import ProductContextProvider from './src/context/ProductContext'
import { StatusBar } from 'react-native'
import BasketContextProvider from './src/context/BasketContext'

const App = () => {
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <BottomSheetModalProvider>
                <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
                <SafeAreaProvider style={{flex:1}}>
                    <ErrorContextProvider>
                        <AuthContextProvider>
                            <BasketContextProvider>
                                <ProductContextProvider>
                                    <Navigation/>
                                </ProductContextProvider>
                            </BasketContextProvider>
                        </AuthContextProvider>
                    </ErrorContextProvider>
                </SafeAreaProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

export default App