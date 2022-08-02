import { FlatList, ListRenderItemInfo, StyleSheet, Text, View} from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {AnimatedPress, ProductComponent,ProductListHeader} from '../../components/'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import CustomBackdrop from '../../components/SheetBackdrop'
import { useProducts } from '../../context/ProductContext'
import { getProducts } from '../../services/product'
import { AxiosResponse } from 'axios'
import { Product } from '../../../types'

const Home = () => {
    const {productState,productDispatch} = useProducts()
    const {products} = productState
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const fetchProducts = async()=>{
        setIsFetching(true)
        const response:AxiosResponse = await getProducts()
        if(response.status==200) {
            productDispatch({type:'SET_PRODUCTS',products:response.data['products']})
        }
        setIsFetching(false)
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    const sortByName = () =>{
        const sortedList = products?.sort((a,b)=>a.name.localeCompare(b.name))
        if(sortedList!=undefined) {
            productDispatch({type:'SET_PRODUCTS',products:sortedList})
            
        }
        bottomSheetModalRef.current?.close()
    }
    const sortByBarcode= ()=>{
        const sortedList = products?.sort((a,b)=>a.barcode.localeCompare(b.barcode))
        if(sortedList!=undefined) {
            productDispatch({type:'SET_PRODUCTS',products:sortedList}) 
        }
        bottomSheetModalRef.current?.close()
    }
    const sortByPrice=()=>{
        const sortedList = products?.sort((a,b)=>a.price-b.price)
        if(sortedList!=undefined) {
            productDispatch({type:'SET_PRODUCTS',products:sortedList})
        }
        bottomSheetModalRef.current?.close()
    }
    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const _renderItem = ({item}:ListRenderItemInfo<Product>)=>{
        return (
            <View>
                <ProductComponent {...item}/>
            </View>
        )
    }
    return ( 
        <View style={{flex:1,backgroundColor:'#fff'}}>
           
            {products&&(
                <FlatList
                    data={products}
                    renderItem={_renderItem}
                    ListHeaderComponent={()=>(<ProductListHeader onSelect={handlePresentModalPress}/>)}
                    stickyHeaderIndices={[0]}
                    onRefresh={fetchProducts}
                    refreshing={isFetching}
                />
            )}
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={CustomBackdrop}
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
            </BottomSheetModal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
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


export default Home