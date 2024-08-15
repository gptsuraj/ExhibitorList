import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'


const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainScreen')
    }, 3000)
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 20 ,color:'black'}}>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})