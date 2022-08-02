import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomBottomSheet from './CustomBottomSheet'
import { useProducts } from '../context/ProductContext'
import AnimatedPress from './AnimatedPress'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

const SortSheet = React.forwardRef<BottomSheetModal>((props,ref)=>{
    const {productState,productDispatch} = useProducts()
    const {products} = productState
    const sortByName = () =>{
        const sortedList = products?.sort((a,b)=>a.name.localeCompare(b.name))
        if(sortedList!=undefined) {
            productDispatch({type:'SET_PRODUCTS',products:sortedList})
            
        }
        ref.current?.close()
    }
    const sortByBarcode= ()=>{
        const sortedList = products?.sort((a,b)=>a.barcode.localeCompare(b.barcode))
        if(sortedList!=undefined) {
            productDispatch({type:'SET_PRODUCTS',products:sortedList}) 
        }
        ref.current?.close()
    }
    const sortByPrice=()=>{
        const sortedList = products?.sort((a,b)=>a.price-b.price)
        if(sortedList!=undefined) {
            productDispatch({type:'SET_PRODUCTS',products:sortedList})
        }
        ref.current?.close()
    }
    return (
        <CustomBottomSheet
            ref={ref}
        >
            <View style={styles.contentContainer}>
                <AnimatedPress style={styles.selectButton} onPress={sortByName}>
                    <Text>İsim</Text>
                </AnimatedPress>
                <AnimatedPress style={styles.selectButton} onPress={sortByBarcode}>
                    <Text>Barkod</Text>
                </AnimatedPress>
                <AnimatedPress style={styles.selectButton} onPress={sortByPrice}>
                    <Text>Fiyat</Text>
                </AnimatedPress>
            </View>
        </CustomBottomSheet>
    )
})
const styles = StyleSheet.create({
   
    contentContainer: {
        flex: 1,
        padding:20,
        alignItems: 'center',
    },
    selectButton:{
        backgroundColor:'#eee',
        width:'100%',
        height:50,
        alignItems:'flex-start',
        paddingLeft:20,
        justifyContent:'center',
        borderRadius:10,
        marginTop:20
    }
});

export default SortSheet