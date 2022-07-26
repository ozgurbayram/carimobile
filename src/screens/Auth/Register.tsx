import { View, Text, TextInput, ActivityIndicator, StyleSheet } from 'react-native'
import React, { isValidElement, useRef, useState } from 'react'
import CustomTextInput from '../../components/CustomTextInput'
import AnimatedPress from '../../components/AnimatedPress'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackType } from '../../../types'
import { validateEmail, validatePassword } from '../../utils/validations'
import { useError } from '../../context/ErrorContext'

const Register = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackType>>()
	
	// states
	const [loading, setLoading] = useState<boolean>(false)
	const [email, setEmail] = useState<string|null>(null)
	const [password, setPassword] = useState<string|null>(null)
	const [passwordConfirm, setPasswordConfirm] = useState<string|null>(null)

	// references
	const emailRef = useRef<TextInput>()
	const passwordRef = useRef<TextInput>()
	const passwordConfirmRef = useRef<TextInput>()

	const navigatieToLogin = ()=>{navigation.navigate('Login')}
	// handle input changes
	const onEmailChange = (text:string) =>{setEmail(text)}
	const onPasswordChange = (text:string)=>{setPassword(text)}
	const onPasswordConfirmChange = (text:string)=>{setPasswordConfirm(text)}

	// hooks 
	const {createError,removeError} = useError()

	const register = ()=>{
		setLoading(true)
		if(email && password && passwordConfirm) {
			const isEmailValid = validateEmail(email)
			const isPasswordValid =validatePassword(password)
			const isPasswordConfirmValid = validatePassword(passwordConfirm)
			if(isEmailValid && isPasswordValid && isPasswordConfirmValid){
				if(password == passwordConfirm){
					console.log("make request");
				}
				else{
					setLoading(false)
					createError('Girilen şifreler uyuşmuyor')
					const timer = setTimeout(() => {
						removeError()
					},2000);
					return ()=>clearTimeout(timer)		
				}
			}
			if(!isEmailValid){
				setLoading(false)
				createError('Lütfen geçerli bir E-posta adresi giriniz')
				emailRef.current?.focus()
			}
			if(!isPasswordValid){
				setLoading(false)
				createError('Lütfen geçerli bir şifre giriniz')
				passwordRef.current?.focus()
			}
			if(!isPasswordConfirmValid){
				setLoading(false)
				createError('Lütfen geçerli bir şifre doğrulama giriniz')
				passwordConfirmRef.current?.focus( )
			}
		}
	}
    return (
		<View style={styles.container}>
			<CustomTextInput
				ref={emailRef} 
				placeholder="E-posta"
				autoFocus
				onChangeText={onEmailChange}
				onSubmitEditing={()=>{passwordRef.current?.focus()}}
				textContentType="emailAddress"
			/>
			<CustomTextInput 
				ref={passwordRef} 
				placeholder="Şifre"
				secureTextEntry
				onChangeText={onPasswordChange}	
				textContentType="newPassword"
				onSubmitEditing={()=>{passwordConfirmRef.current?.focus()}}
			/>
			<CustomTextInput 
				ref={passwordConfirmRef}
				placeholder="Şifre doğrulama"
				secureTextEntry
				onChangeText={onPasswordConfirmChange}	
				textContentType="newPassword"
			/>
			<AnimatedPress style={styles.button} onPress={register} disabled={loading}>
				{loading?(
					<ActivityIndicator color={"#fff"} size="small"/>
				):(

					<Text style={styles.buttonText}>Kayıt Ol</Text>
				)}
			</AnimatedPress>
			<AnimatedPress style={styles.registerBtn} disabled={loading} onPress={navigatieToLogin}>
				<Text style={styles.registerBtnText}>Giriş Yap</Text>
			</AnimatedPress>
		</View>
    )
}

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
export default Register