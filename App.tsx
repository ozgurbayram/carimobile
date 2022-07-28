import 'react-native-gesture-handler'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigation from './src/navigation'
import AuthContextProvider from './src/context/AuthContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ErrorContextProvider from './src/context/ErrorContext'
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'

const App = () => {
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <BottomSheetModalProvider>
                <SafeAreaProvider style={{flex:1}}>
                    <ErrorContextProvider>
                        <AuthContextProvider>
                            <Navigation/>
                        </AuthContextProvider>
                    </ErrorContextProvider>
                </SafeAreaProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

export default App