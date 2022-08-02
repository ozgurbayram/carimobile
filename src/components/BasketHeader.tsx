import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackType } from '../../types'
import AnimatedPress from './AnimatedPress'
import { FontAwesome5, Ionicons} from '@expo/vector-icons'

const BasketHeader = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackType>>()
    const navigateToCompleatedPayments=()=>{navigation.navigate('CompleatedPayments')}
    return (
        <View style={styles.container}>
            <AnimatedPress onPress={()=>{navigation.navigate('Home')}}>
                <Ionicons name="arrow-back" size={24} color="#333"/>
            </AnimatedPress>
            <Text>Sepetim</Text>
            <View>
                <AnimatedPress onPress={navigateToCompleatedPayments} style={styles.pastButton}>
                    <FontAwesome5 name="history" size={24} color="black" />
                </AnimatedPress>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:20
    },
    pastButton:{
        alignItems:'center',
    }
})
export default BasketHeader