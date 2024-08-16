import { Modal, StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconButton, Card, Divider, } from 'react-native-paper';

const CompanyModal = (props) => {

    // console.log("first",props.data)

    return (
        <View>
            <Modal animationType='fades' transparent={true} visible={props.visibility}>
                <View style={styles.centeredView}>
                    <View style={{
                        width: '95%', flexDirection: 'row', alignItems: 'center', justifyContent: "center",
                        marginHorizontal: 10, backgroundColor: '#303da1', borderTopLeftRadius: 20, padding: 5,
                        borderTopRightRadius: 20,
                    }}>

                        <Text style={{ width: "75%", color: 'white', fontSize: 24, textAlign: 'center', }}>{props.data.Company_Name} </Text>
                        <IconButton
                            icon="close"
                            iconColor="white"
                            size={24}
                            style={{ position: 'absolute', right: 5 }}
                            onPress={() => {
                                props.onSelect()
                            }}
                        />
                    </View>
                    <View style={{ backgroundColor: 'yellow', marginHorizontal: 10, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginHorizontal: 20 }}>Type : {props.data.Type}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginHorizontal: 20 }}>Country : {props.data.Country}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginHorizontal: 20 }}>Primary Chapter : {props.data.Chapters}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginHorizontal: 20, marginBottom: 20 }}>Stall No : {props.data.Booth_NO}</Text>
                    </View>
                </View>
            </Modal >

        </View >
    )
}

export default CompanyModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',

    },
    innerCard: {
        width: '90%',
        // alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 15,
        height: 350,
    },
    button: {
        backgroundColor: "blue",
        width: '100%',
        alignSelf: 'center',
        margin: 5,
    },
    titleStyle: {
        color: 'black',
        fontSize: 18,
        alignSelf: 'center',
        flex: 1
    },
})