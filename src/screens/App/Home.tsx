import { Button, FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AddProductButton from '../../components/AddProductButton'
import { useAuth } from '../../context/AuthContext'
import { instance } from '../../services/api'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackType } from '../../../types'
import {AnimatedPress, ProductComponent,ProductListHeader} from '../../components/'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import CustomBackdrop from '../../components/SheetBackdrop'

const Home = () => {
    const isFocuesed = useIsFocused()
    const {token} = useAuth()
    const [products, setProducts] = useState()
    const getProducts = async()=>{
        const products = await instance.get('/product/list',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then((res)=>{return res.data})
        console.log(products);
        setProducts(products['products'])
        return products
    }
    useEffect(() => {
        getProducts()
    }, [isFocuesed])
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);


    return ( 
        <View style={{flex:1,backgroundColor:'#fff'}}>
            {products&&(
                <FlatList
                    data={products}
                    renderItem={(props)=>(<ProductComponent {...props}/>)}
                    ListHeaderComponent={()=>(<ProductListHeader onSelect={handlePresentModalPress}/>)}
                    stickyHeaderIndices={[0]}
                />
            )}
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={CustomBackdrop}
                onChange={handleSheetChanges}
            >
                <View style={styles.contentContainer}>
                
                    <AnimatedPress style={styles.selectButton}>
                        <Text>İsim</Text>
                    </AnimatedPress>
                    <AnimatedPress style={styles.selectButton}>
                        <Text>Barkod</Text>
                    </AnimatedPress>
                    <AnimatedPress style={styles.selectButton}>
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