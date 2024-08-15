import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native'
import MainScreen from './src/MainScreen';
import ProductDetails from './src/ProductDetails';
import SplashScreen from './src/SplashScreen';
// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Router = () => {
  const scheme = useColorScheme();
  console.log(scheme);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // primary: 'green',
      background: 'rgb(255, 255, 255)',
      // text: 'white'
    }
  }
  return (

    <NavigationContainer theme={MyTheme}
    // theme={scheme === 'dark' ? DarkTheme : MyTheme}
    >
      {/* <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'grey'
      }}>
        <Tab.Screen name='Home' component={Home} options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="home" size={size} color={color} />
          )
        }} />
        <Tab.Screen name='Profile' component={Profile} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          )
        }} />

        <Tab.Screen name='Reel' component={Reel} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="ondemand-video" size={size} color={color} />
          )
        }} />
        <Tab.Screen name='Account' component={Account} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />
          )
        }} />
        <Tab.Screen name='Dashboard' component={Dashboard} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />
          )
        }} />
      </Tab.Navigator> */}
      <Stack.Navigator initialRouteName='MainScreen'>
        <Stack.Screen name='MainScreen' component={MainScreen} options={{
          title: 'Product List',
          headerTitle: null,
          headerTransparent: false,
          headerLeft: false,
          headerBackVisible: false,
        }} />
        <Stack.Screen name='ProductDetails' component={ProductDetails} options={{ title: 'Product Details', headerBackVisible: true, }} />
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />

      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default Router

const styles = StyleSheet.create({})