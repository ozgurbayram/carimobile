import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { AnimatedPress, CustomTextInput, LoadingComponent } from '../../components'
import { instance } from '../../services/api'
import { useAuth, useError } from '../../context'
import { AxiosResponse } from 'axios'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackType } from '../../../types'
import { useBasket } from '../../context/BasketContext'

const Payment = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackType>>()
    const [loading, setLoading] = useState<boolean>(false)
    const [companyName, setCompanyName] = useState<string|null>(null)
    const [recipient, setRecipient] = useState<string|null>()
    const {token} = useAuth()
    const {basketState,basketDispatch} = useBasket()
    const {basket} = basketState
    const {createError} = useError()
    const companyNameRef = useRef<TextInput>(null)
    const recipientRef = useRef<TextInput>(null)

    const calculateBasketTotal = useCallback(
        () => {
            return basket?.reduce((a,b)=>a+b.price*(b.count?b.count:1),0)
        },
        [basket],
    )
    const pay = useCallback(
        async() => {
            setLoading(true)
            if(basket&&companyName&&recipient) {
                const res:AxiosResponse = await  instance.post('/payment/create',{
                    companyName:companyName,
                    recipient:recipient,
                    products:JSON.stringify(basket),
                    amount:calculateBasketTotal()
                },{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                })
                if(res.status==200) {
                    setLoading(false)
                    navigation.navigate('CompleatedPayments')
                    basketDispatch({type:'CLEAR_BASKET'})
                }else{
                    setLoading(false)
                    createError(res.data['message'])
                }
            }
            Alert.alert('Payment Succes')
        },
        [companyName,recipient],
    )
    

    const onCompanyNameChange = (text:string)=>{setCompanyName(text)}
    const onRecipientChange = (text:string)=>{setRecipient(text)}

    return (
        <View style={styles.container}>
            <CustomTextInput
                ref={companyNameRef}
                placeholder='Şirket ismi'
                onChangeText={onCompanyNameChange}
                onSubmitEditing={()=>{recipientRef.current?.focus()}}
                autoFocus
            />
            <CustomTextInput
                ref={recipientRef}
                placeholder='Alıcı'
                onChangeText={onRecipientChange}
            />
            <AnimatedPress onPress={pay} style={styles.payButton}>
                <Text style={styles.payText}>Ödemeyi Tamamla</Text>
            </AnimatedPress>
            {loading&&(
                <LoadingComponent/>
            )}
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:15
    },
    payButton:{
        height:50,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#333'
    },
    payText:{
        color:'#fff'
    }
})