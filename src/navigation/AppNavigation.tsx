import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackType } from '../../types'
import Home from '../screens/App/Home'
import CreateProduct from '../screens/App/CreateProduct'
import HomeHeader from '../components/HomeHeader'
const AppStack = createNativeStackNavigator<AppStackType>()

const AppNavigation = () => {
    return (
        <AppStack.Navigator
            screenOptions={{
                headerShown:false,
                animation:'fade_from_bottom'
            }}
        >
            <AppStack.Screen 
                name='Home'
                component={Home}
                options={{
                    headerShown:true,
                    header:()=>{
                        return (
                            <HomeHeader/>
                        )
                    }
                }}
            />
            <AppStack.Screen name='CreateProduct' component={CreateProduct}/>
        </AppStack.Navigator>
    )
}

export default AppNavigation