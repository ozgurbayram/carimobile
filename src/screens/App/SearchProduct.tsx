import { Modal, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AnimatedPress, CustomTextInput, ProductComponent } from '../../components'
import { Ionicons } from '@expo/vector-icons'
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner'
import { allowedBarCodes } from '../../constants/barcodeTypes'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useProducts } from '../../context/ProductContext'
import { AppStackType, Product } from '../../../types'
import { validateBarcode } from '../../utils/validations'
import { useError } from '../../context/ErrorContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const SearchProduct = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackType>>()

    const [product, setProduct] = useState<Product|null>()
    const [barcode, setBarcode] = useState<string|null>(null) 
    const [cameraOpen, setCameraOpen] = useState<boolean>(false)
    const {productState} = useProducts()
    const {products} = productState 
    const {createError} = useError()
    const searchProduct = ()=>{
        const res= products?.find((p)=>{return p.barcode==barcode})
        if(res!=undefined) {
            setProduct(res)
        }else{
            console.log(res);
            createError('Bu barkoda ait bir ürün bulunamadı')
        }
    }
    const checkBarcode = ()=>{
        if(barcode) {
            const isBarcodeValid = validateBarcode(barcode)
            if(isBarcodeValid) {
                searchProduct()
            }else {
                setProduct(null)
                createError('Lütfen EAN-13 Tipinde bir barkod giriniz')
            }
        }
    }
    const onBarCodeScanned = (e:BarCodeScannerResult)=>{
        if (!allowedBarCodes.includes(e.type)) {
            return
        }
        if(e.data) {
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
    useEffect(() => {
        checkBarcode()
    }, [barcode])
    
    const cancel = ()=>{navigation.navigate('Home')}
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
            <View style={styles.container}>
                <AnimatedPress onPress={cancel} style={{height:32,width:32}}>
                    <Ionicons name='close' size={32} color="#333"/>
                </AnimatedPress>
                <View style={styles.searchComponent}>
                    <CustomTextInput
                        autoFocus
                        value={barcode?barcode:''}
                        keyboardType='numeric'
                        onChangeText={(e)=>{setBarcode(e)}}
                        onEndEditing={checkBarcode}
                        placeholder='Barkod ile ürün ara'
                        style={{width:'80%'}}
                    />
                    <View style={styles.scanBarcode}>
                        <AnimatedPress onPress={scanBarcode}>
                            <Ionicons name='barcode-outline' size={28}/>
                        </AnimatedPress>
                    </View>
                </View>
                {product&&(
                    <ProductComponent {...product}/>
                )}
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
        </SafeAreaView>
    )
}

export default SearchProduct

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:'#fff',
    },
    searchComponent:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        height:100,
        justifyContent:'space-between'
    },
    scanBarcode:{
        height:50,
        width:50,
        backgroundColor:'#DDD',
        elevation:4,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100
    },
})