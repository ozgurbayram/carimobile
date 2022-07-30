import { View, Text, ActivityIndicator, Modal } from 'react-native'
import React from 'react'

const LoadingComponent = () => {
    return (
        <Modal style={{flex:1}} statusBarTranslucent transparent>
            <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.4)'}}>
                <View style={{backgroundColor:'#333',borderRadius:10,alignItems:'center',width:200,alignSelf:'center',justifyContent:'center',height:200}}>
                    <ActivityIndicator color="#fff" size="large"/>
                </View>
            </View>
        </Modal>
    )
}

export default LoadingComponent