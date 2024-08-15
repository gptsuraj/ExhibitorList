import { StyleSheet, Text, View, SafeAreaView, FlatList, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import axios from 'react-native-axios'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'
import ActivityLoader from './components/ActivityLoader'
import { useNavigation } from '@react-navigation/native'


const MainScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleProductList = async () => {
    setIsLoading(true)
    let url = 'https://dummyjson.com/products'
    try {
      const response = await axios.get(url)
      if (response.data) return response.data; else return null
    }
    catch (error) {
      return error
    }
  }
  useEffect(() => {

    handleProductList().then((data) => {
      console.log("response::", data.products);
      setUserData(data.products)
      setIsLoading(false)
    })
      .catch((error) => {
        throw new Error(error)
      }
      )
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 5 }}>
      <FlatList
        data={userData}
        keyExtractor={(item) => { item.id }}
        renderItem={({ item }) => {
          return (
            <>
              <Card style={styles.card}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2, color: 'black', width: '100%' }}>{item.description}. </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProductDetails', { userID: item.id })}
                  activeOpacity={0.9}
                  style={{ flexDirection: 'row', padding: 5, marginVertical: 2 }}>
                  <Image
                    resizeMode='contain'
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 60,
                      borderColor: 'grey',
                      borderWidth: 0.5,
                    }}
                    source={{ uri: item.images[0] }} />

                  <View style={{ flexDirection: 'column', marginHorizontal: 10, }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 2, color: 'black' }}>{item.brand} </Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2, color: 'black' }}>{item.title}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2, color: 'black' }}><Text>Price : <Text>Rs.</Text></Text>{item.price}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2, color: 'black' }}>Rating : {item.rating} *</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2, color: 'black' }}>Available Stock : {item.stock} units</Text>
                  </View>
                </TouchableOpacity>
              </Card >
            </>
          )
        }}


      />
      <ActivityLoader visibleLoader={isLoading} />

    </SafeAreaView >
  )
}

export default MainScreen

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 3,
    borderRadius: 0,
    marginHorizontal:10,
    padding: 10,
    backgroundColor: "#f2f3fa",
    marginVertical: 5,
    flexDirection: 'row',
  },
})