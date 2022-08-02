import { View, Text, StyleSheet, Modal, TextInput, StatusBar } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AnimatedPress, CustomTextInput } from '../../components'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackType } from '../../../types'
import { useError } from '../../context'
import { BarCodeScanner,BarCodeScannerResult } from 'expo-barcode-scanner'
import { create_product } from '../../services/product'
import { allowedBarCodes } from '../../constants/barcodeTypes'
import { validateBarcode } from '../../utils/validations'
import { AxiosResponse } from 'axios'
import { useProducts } from '../../context/ProductContext'
import LoadingComponent from '../../components/LoadingComponent'

const CreateProduct = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackType>>()
    // states
    const [barcode, setBarcode] = useState<string|null>(null)
    const [productName, setProductName] = useState<string|null>(null)
    const [productPrice, setProductPrice] = useState<string|null>(null)  
    const [loading, setLoading] = useState<boolean>(false)
    // references
    const productNameRef = useRef<TextInput>()
    const productPriceRef = useRef<TextInput>()
    const barcodeRef = useRef<TextInput>()

    const cancel = ()=>{navigation.goBack()}
    const {createError} = useError()
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
    const {productDispatch} = useProducts()
    const createProduct = async()=>{
        setLoading(true)
        if(barcode && productName && productPrice) {
            if(productPrice!='number') {
                createError('Ürün fiyatı numerik olmalıdır')
                productPriceRef.current?.clear()
                productPriceRef.current?.focus()
            }
            if(validateBarcode(barcode.toString())) {
                const response:AxiosResponse = await create_product(productName,parseInt(productPrice),barcode)
                if(response.status==200) {
                    productDispatch({type:'ADD_PRODUCT',product:response.data['product']})
                    navigation.navigate('Home')
                }
                if(response.status==400) {
                    createError(response.data['message'])
                }
            }else{
                createError('Lütfen EAN-13 tipinde bir barkod giriniz')
            }
        }
        setLoading(false)
    }

    const onProductNameChange = (text:string)=>{setProductName(text)}
    const onProductPriceChange = (text:string)=>{setProductPrice(text)}
    const onBarcodeChange = (text:string)=>{setBarcode(text)}
    
    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
            <View style={styles.container}>
                <View>
                    <AnimatedPress onPress={cancel} style={{height:32,width:32}}>
                        <Ionicons name='close' size={32} color="#333"/>
                    </AnimatedPress>
                </View>
                <CustomTextInput
                    value={productName}
                    placeholder='Ürün ismi'
                    onChangeText={onProductNameChange}
                    autoFocus
                    ref={productNameRef}
                    onSubmitEditing={()=>{productPriceRef.current?.focus()}}
                />
                <CustomTextInput
                    value={productPrice?productPrice:''}
                    placeholder='Ürün Fiyatı'
                    keyboardType='numeric'
                    onChangeText={onProductPriceChange}
                    ref={productPriceRef}
                    onSubmitEditing={()=>{barcodeRef.current?.focus()}}

                />
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <CustomTextInput
                        value={barcode?.toString()}
                        placeholder='Barkod'
                        style={{width:'75%'}}
                        keyboardType='numeric'
                        ref={barcodeRef}
                        onChangeText={onBarcodeChange}
                    />
                    <AnimatedPress style={styles.barcodeButton} onPress={scanBarcode}>
                        <Ionicons name='barcode-outline' size={32} color="#333"/>
                    </AnimatedPress>
                  
                </View>
                <AnimatedPress style={styles.submitButton} onPress={createProduct}>
                    <Text style={{color:'#fff',fontSize:21}}>Ürün Oluştur</Text>
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
            {loading&&(
                <LoadingComponent/>
            )}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:'#fff',
    },
    barcodeButton:{
        height:65,
        width:'15%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        backgroundColor:'#eee',
        elevation:2
    },
    submitButton:{
        height:55,
        backgroundColor:'rgba(0,0,0,0.5)',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    }
})
export default CreateProduct