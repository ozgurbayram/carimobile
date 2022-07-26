import 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigation from './src/navigation'
import AuthContextProvider from './src/context/AuthContext'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
	return (
		<GestureHandlerRootView style={{flex:1}}>
			<SafeAreaProvider style={{flex:1}}>
				<AuthContextProvider>
					<Navigation/>
				</AuthContextProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	)
}

export default App