import { Pressable, PressableProps, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
interface Props extends PressableProps {
    children:ReactNode
    onPress?:()=>void,
    style?:ViewStyle
}
const AnimatedPress = ({
    children,
    onPress,
    style,
    ...props
}:Props) => {
    const scale = useSharedValue(1)
    const animatedStyle = useAnimatedStyle(()=>{
        return {
            transform:[{
                scale:scale.value
            }]
        }
    })
    const onPressIn = ()=>{scale.value = withSpring(0.9)}
    const onPressOut = () =>{scale.value = withSpring(1)}
    return (
        <AnimatedPressable 
            {...props}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[animatedStyle,style]}
        >
            {children}
        </AnimatedPressable>
    )   
}

export default AnimatedPress