import { Dimensions, SafeAreaView, StyleSheet, Text, Image, View, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import ActivityLoader from './components/ActivityLoader'
import { useNavigation } from '@react-navigation/native';
import axios from 'react-native-axios';
import { ScrollView } from 'react-native-gesture-handler';
import { jsiConfigureProps } from 'react-native-reanimated/lib/typescript/reanimated2/core';
import { JumpingTransition } from 'react-native-reanimated';
// import { SliderBox } from 'react-native-image-slider-box'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ProductDetails = ({ route }) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false)
    const [productData, setProductData] = useState('')

    useEffect(() => {
        const backAction = () => {
         navigation.goBack()
          return true;
        };
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, []);
    const handleProductDetail = async () => {
        setIsLoading(true)
        let url = `https://dummyjson.com/products/${route.params.userID}`
        console.log("urlll::", url)
        try {
            const response = await axios.get(url)
            if (response.data) return response.data; else return null
            console.log("response1::", response.data.products);
            // setUserData(response.data.products)
            setIsLoading(false)
        }
        catch (error) {
            return error
            // console.log("error", error);
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleProductDetail().then((data) => {
            console.log('helloo', data.thumbnail)
            setProductData(data)
            setIsLoading(false)

        }).catch((error) => {
            setIsLoading(false)
            throw new Error(error)
        })
    }, [])

    console.log("check::", productData)
    // useEffect(() => {
    //     console.log("sfcu", productData)
    // }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
            <Text style={styles.desc}>{productData.description}</Text>
            <Image
                style={styles.img}
                source={{ uri: productData.thumbnail }} />
            <Text style={styles.textTitle}>{productData.brand} {productData.title}</Text>
            <Text style={styles.text2}><Text>Price : <Text>Rs.</Text></Text>{productData.price}</Text>
            <Text style={styles.text2}>Rating : {productData.rating} *</Text>
            <Text style={styles.text2}>Available Stock : {productData.stock} units</Text>
            <ActivityLoader visibleLoader={isLoading} />


        </SafeAreaView >
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'black',
        margin: 5,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        color: 'black',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    desc: {
        fontSize: 18,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        marginBottom: 2,
        color: 'black',
        padding: 10
    },
    img: {
        height: 180,
        width: 180,
        borderRadius: 85,
        borderColor: 'grey',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignSelf: 'center',
        // margin: 20,
        marginVertical: 40,
    }
})