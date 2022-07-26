import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TextInputChangeEventData, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackType } from '../../../types'
import AnimatedPress from '../../components/AnimatedPress'
import CustomTextInput from '../../components/CustomTextInput'
import { NativeEvent } from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes'
import { validateEmail, validatePassword } from '../../utils/validations'
import Error from '../../components/Error'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackType>>()
	// Local States
	const [email, setEmail] = useState<string|null>(null)
	const [password, setPassword] = useState<string|null>(null)
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	// References
	const emailRef = useRef<TextInput>()
	const passwordRef = useRef<TextInput>()
	// hooks
	const {login} = useAuth()
	// Methods
	const _login = () =>{
		// makes a login request
		setLoading(true)
		if(email && password){
			if(validateEmail(email) && validatePassword(password)){
				
			}
			setTimeout(() => {
				login("dasds")
				setLoading(false)
			}, 3000);
		}
	}

	const onEmailChange = (text:string) =>{setEmail(text)}
	const onPasswordChange = (text:string)=>{setPassword(text)}
	const navigateToRegister = () =>{navigation.navigate('Register')}

	return (
		<View style={styles.container}>
			<CustomTextInput
				ref={emailRef}
				placeholder="E-posta"
				keyboardType='email-address'
				onChangeText={onEmailChange}
				onSubmitEditing={()=>{passwordRef.current?.focus()}}
			/>
			<CustomTextInput
				ref={passwordRef}
				placeholder="Şifre"
				secureTextEntry
				onChangeText={onPasswordChange}
			/>
			<AnimatedPress style={styles.button} onPress={_login} disabled={loading}>
				{loading?(
					<ActivityIndicator color={"#fff"} size="small"/>
				):(

					<Text style={styles.buttonText}>Giriş Yap</Text>
				)}
			</AnimatedPress>
			<AnimatedPress style={styles.registerBtn} disabled={loading} onPress={navigateToRegister}>
				<Text style={styles.registerBtnText}>Kayıt Ol</Text>
			</AnimatedPress>
		</View>
    )
}

export default Login

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff',
		padding:20,
	},
	button:{
		backgroundColor:'#2089db',
		alignItems:'center',
		justifyContent:'center',
		height:50,
		borderRadius:10
	},
	buttonText:{
		color:'#fff'
	},
	registerBtn:{
		alignSelf:'center',
		marginTop:20,
		padding:10,
		backgroundColor:'#3d63f4',
		borderRadius:6
	},
	registerBtnText:{
		color:'#fff',
	}
})