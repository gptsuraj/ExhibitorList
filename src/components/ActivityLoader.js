import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu'
});

const ActivityLoader = ({ visibleLoader }) => {

    return (
        <View style={styles.container}>
            <Spinner
                visible={visibleLoader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        </View>
    );

}
export default ActivityLoader
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});