import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'


const Home = () => {
  const { colors } = useTheme();

  return (
    <View  >
      {/* <Text style={{ fontSize: 30, color: colors.text }}>Home</Text> */}
      <Text>Hello</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})