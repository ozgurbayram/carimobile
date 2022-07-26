import { View, Text, TextInput, TextInputProps } from 'react-native'
import React from 'react'

interface IProps extends TextInputProps {

}

const CustomTextInput = React.forwardRef<TextInput,IProps>((props,ref)=>{
    return(
        <TextInput
            ref={ref} 
            {...props}
            style={[props.style,{
                backgroundColor:'#eee',
                marginVertical:20,
                padding:10,
                borderRadius:10,
                height:65,
                fontWeight:'600'
            }]}
            focusable
            autoCapitalize="none"
            returnKeyType='next'
        />
    )
})

export default CustomTextInput