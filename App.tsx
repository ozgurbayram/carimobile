import 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigation from './src/screens/navigation'
import AuthContextProvider from './src/context/AuthContext'

const App = () => {
	return (
		<GestureHandlerRootView style={{flex:1}}>
			<AuthContextProvider>
				<Navigation/>
			</AuthContextProvider>
		</GestureHandlerRootView>
	)
}

export default App