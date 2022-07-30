import { Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import AnimatedPress from './AnimatedPress'
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner'
import { allowedBarCodes } from '../constants/barcodeTypes'

const ProductListHeader = ({onSelect}:{onSelect:()=>void}) => {
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [barcode, setBarcode] = useState<string|null>(null) 
    const [cameraOpen, setCameraOpen] = useState<boolean>(false)
    const onBarCodeScanned = (e:BarCodeScannerResult)=>{
        if (!allowedBarCodes.includes(e.type)) {
            return
        }
        if(e.data) {
            console.log(e.type);
            setBarcode(e.data)
            setCameraOpen(false)
        }
    }

    const scanBarcode = async() =>{
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if(status == 'granted') {
            setCameraOpen(true)
        }
    }
    return (
        <View style={styles.container}>
            {isSearching?(
                <View style={styles.searchContainer}>
                    <TextInput
                        autoFocus
                        value={barcode?barcode:''}
                        keyboardType='numeric'

                        placeholder='Barkod ile ürün ara'
                    />
                    <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        {barcode&&(
                            <AnimatedPress style={{marginRight:10}} onPress={()=>setBarcode(null)}>
                                <Ionicons name='close' size={24} color="#333"/>
                            </AnimatedPress>
                        )}
                        <AnimatedPress onPress={scanBarcode}>
                            <Ionicons name='barcode-outline' size={28}/>
                        </AnimatedPress>
                    </View>
                    {cameraOpen&&(
                        <Modal statusBarTranslucent animationType='fade' onRequestClose={()=>{setCameraOpen(false)}}>
                            <BarCodeScanner
                                onBarCodeScanned={onBarCodeScanned}
                                style={{flex:1}}
                                barCodeTypes={allowedBarCodes}
                            />
                        </Modal>
                    )}
                    
                </View> 
            ):(
                <>
                    <AnimatedPress style={styles.filterButton} onPress={onSelect}>
                        <Text>Sıralama Ölçütü</Text>
                        <Ionicons name='arrow-down-circle-sharp' size={20}/>
                    </AnimatedPress>
                    <AnimatedPress style={[styles.item,styles.search]} onPress={()=>setIsSearching(true)}>
                        <Ionicons name='search' size={28} color="#333"/>
                    </AnimatedPress>
                </>
            )}
        </View>
    )
}

export default ProductListHeader

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        height:70,
        paddingHorizontal:20,
        borderBottomColor:'#ddd',
        borderBottomWidth:2
    },
    item:{
        height:'100%',
        width:'20%',
        alignItems:'center',
        justifyContent:'center'
    },
    search:{
        width:'10%'
    },
    filterButton:{
        backgroundColor:'#ddd',
        padding:8,
        borderRadius:25,
        display:'flex',
        flexDirection:'row',
        width:130,
        alignItems:'center',
        justifyContent:'space-between'
    },
    searchContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%'
    }
})