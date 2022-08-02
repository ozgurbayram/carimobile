import { FlatList, ListRenderItemInfo, View} from 'react-native'
import React, { useCallback, useEffect, useRef, useState} from 'react'
import {ProductComponent,ProductListHeader} from '../../components/'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useProducts } from '../../context/ProductContext'
import { getProducts } from '../../services/product'
import { AxiosResponse } from 'axios'
import { Product } from '../../../types'
import SortSheet from '../../components/SortSheet'

const Home = () => {
    const {productState,productDispatch} = useProducts()
    const {products} = productState
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const fetchProducts =  useCallback(async()=>{
        setIsFetching(true)
        const response:AxiosResponse = await getProducts()
        if(response.status==200) {
            productDispatch({type:'SET_PRODUCTS',products:response.data['products']})
        }
        setIsFetching(false)
    },[])
    useEffect(() => {
        fetchProducts()
    }, [])
    
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
                    ItemSeparatorComponent={()=>{
                        return(
                            <View style={{height:1,width:'100%',backgroundColor:'#eee'}}></View>
                        )
                    }}
                    refreshing={isFetching}
                />
            )}
            <SortSheet ref={bottomSheetModalRef}/> 
        </View>
    )
}

export default Home