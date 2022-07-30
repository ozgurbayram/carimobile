import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../context/AuthContext'
import AddProductButton from './AddProductButton'
import AnimatedPress from './AnimatedPress'

const HomeHeader = () => {
    const {email,logout} = useAuth()
    const askForLogout = () =>{ 
        Alert.alert('Çıkış yapmak istiyormusunuz.',undefined,[{
            text:'Hayır',
            onPress:()=>{null}
        },
        {
            text:'Evet',
            onPress:()=>{logout()}
        }
        ])
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.left}>
                    <AnimatedPress onPress={askForLogout}>
                        <MaterialCommunityIcons name='logout' size={28} color="#333"/>
                    </AnimatedPress>
                </View>
                <View>
                    <AddProductButton/>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:60,
        paddingHorizontal:20
    },
    left:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    }
})
export default HomeHeader