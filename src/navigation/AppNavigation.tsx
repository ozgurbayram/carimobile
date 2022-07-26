import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackType } from '../../types'
import Home from '../screens/App/Home'
import CreateProduct from '../screens/App/CreateProduct'
import HeaderImage from '../components/HeaderImage'
import AnimatedPress from '../components/AnimatedPress'
import AddProductButton from '../components/AddProductButton'
const AppStack = createNativeStackNavigator<AppStackType>()

const AppNavigation = () => {
    return (
        <AppStack.Navigator
            screenOptions={{
                headerShadowVisible:false,
                headerTitleAlign:'center',
                animation:'fade_from_bottom'
            }}
            >
            <AppStack.Screen name='Home' component={Home}
                options={{           
                }}
            />
            <AppStack.Screen name='CreateProduct' component={CreateProduct}/>
        </AppStack.Navigator>
    )
}

export default AppNavigation