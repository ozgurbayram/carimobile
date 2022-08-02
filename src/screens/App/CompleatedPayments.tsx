import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { instance } from '../../services/api'
import { useAuth, useError } from '../../context'
import { AxiosResponse } from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PaymentInfo } from '../../../types'
import Payment from '../../components/Payment'


const CompleatedPayments = () => {
    const {token} = useAuth()
    const {createError} = useError()
    const [payments, setPayments] = useState<PaymentInfo[]|null>(null)
    const getPayments = useCallback(
        async() => {
            const res:AxiosResponse = await instance.get('/payment/list',{headers:{
                'Authorization':`Bearer ${token}`
            }})
            if(res.status==200) {
                setPayments(res.data['payments'])
                
            }else{
                createError(res.data['message'])
            }
        },
        [],
    )
    useEffect(() => {
        getPayments()
    }, [])
    const _renderItem = ({item}:ListRenderItemInfo<PaymentInfo>)=>{
        return (
            <View>
                <Payment {...item}/>
            </View>
        )
    }
    if(payments) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{paddingBottom:20,fontSize:25}}>Geçmiş Ödemeler</Text>
                <FlatList
                    data={payments}
                    renderItem={_renderItem}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={()=>(<View style={{backgroundColor:'#eee',width:'100%',height:1}}></View>)}
                />
            </SafeAreaView>
        )
    }
    return (
        <View style={styles.container}>
        </View>
    )
}

export default CompleatedPayments

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:15
    }
})