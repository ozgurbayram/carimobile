import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Home = () => {
	const {logout} = useAuth()
	return ( 
		<View style={{flex:1,backgroundColor:'#fff'}}>
		<Text>Home</Text>
		<Button title='Logout' onPress={()=>{logout()}}/>
		</View>
	)
}

export default Home