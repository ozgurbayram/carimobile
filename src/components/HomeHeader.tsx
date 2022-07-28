import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../context/AuthContext'

const HomeHeader = () => {
    const {email} = useAuth()
    return (
        <SafeAreaView>
        </SafeAreaView>
    )
}

export default HomeHeader