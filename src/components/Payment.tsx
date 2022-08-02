import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PaymentInfo } from '../../types'

const Payment = ({
    amount,
    companyName,
    created_at,
    recipient
}:PaymentInfo)=>{
    return (
        <View style={styles.container}>
            <Text>Tutar: {amount}</Text>
            <Text>Şirket: {companyName}</Text>
            <Text>Alıcı: {recipient}</Text>
            <Text>Ödeme Tarihi: {new Date(created_at).toLocaleDateString()}</Text>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    container:{
        alignItems:'flex-start',
        paddingVertical:20
    }
})