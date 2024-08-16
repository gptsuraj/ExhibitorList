import { View, Text, TextInput, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'
import axios from 'react-native-axios';
import { Card } from 'react-native-paper';
import CompanyModal from './Modal';

import { Dropdown } from 'react-native-element-dropdown';


const ExhibitorList = (props) => {
    const [searchkeyword, setSearchKeyword] = useState("");
    const [criteriaValue, setCriteriaValue] = useState("");
    const [countryValue, setCountryValue] = useState("");
    const [chapterValue, setChapterValue] = useState("");

    const [userData, setUserData] = useState('')
    const [onClickValue, setOnClickValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [filteredData, setFilteredData] = useState(userData);

    const [dropdownItems, setDropdownItems] = useState([]);

    // State for selected dropdown value
    const [selectedValue, setSelectedValue] = useState(null);

    // State for text input
    const [searchText, setSearchText] = useState('');


    const [data1, setData1] = useState([]);



    const data = [
        { label: 'Search by Chapter', value: 'Search by Chapter' },
        { label: 'Search by Country', value: 'Search by Country' },

    ];

    useEffect(() => {
        axios.get('https://events.tecogis.com/reactnative-test/ExhibitorList.json')
            .then(response => {

                let formattedData;
                if (criteriaValue === "Search by Chapter") {
                    formattedData = response.data.map(item => ({
                        label: item.Chapters,
                        value: item.Chapters
                    }));
                }
                else {
                    formattedData = response.data.map(item => ({
                        label: item.Country,
                        value: item.Country
                    }));
                }
                setDropdownItems(formattedData);
            })
            .catch(error => {
                console.error('Error fetching dropdown data:', error);
            });
    }, [criteriaValue,]);


    useEffect(() => {
        if (selectedValue) {
            axios.get(`https://events.tecogis.com/reactnative-test/ExhibitorList.json`)
                .then(response => {
                    const filteredData = response.data.filter(item => criteriaValue === "Select by Chapter" ? item.Chapters === selectedValue : item.Country === selectedValue);
                    setData1(filteredData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [selectedValue, filteredData]);

    // Filter data based on text input
    useEffect(() => {
        if (criteriaValue === "Search by Chapter") {
            setFilteredData(
                data1.filter(item =>
                    item.Country.toLowerCase().includes(searchText.toLowerCase())
                )
            );
        } else {
            setFilteredData(
                data1.filter(item =>
                    item.Chapters.toLowerCase().includes(searchText.toLowerCase())
                )
            );
        }
    }, [searchText, data1]);

    // Function to filter data based on search text
    const filterData = (text) => {
        setSearchKeyword(text);

        // If the search text is empty, show all data
        if (text === '') {
            setFilteredData(userData);
        } else {
            // Filter the data based on the search text
            const newData = userData.filter((item) =>
                item.Company_Name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(newData);
        }
    };

    const modalClose = () => {
        setModalVisible(false)
    }
    const sendData = (item) => {
        setOnClickValue(item)
        console.log("check", onClickValue)
        setModalVisible(true)
    }

    const handleCompanyList = async () => {
        let url = 'https://events.tecogis.com/reactnative-test/ExhibitorList.json'
        try {
            const response = await axios.get(url)
            if (response.data) return response.data; else return null
        }
        catch (error) {
            return error
        }
    }
    useEffect(() => {
        handleCompanyList().then((data) => {
            // console.log("response::", data);
            setUserData(data)
            setFilteredData(data)

        })
            .catch((error) => {
                throw new Error(error)
            }
            )
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.title}>EXHIBITOR LIST</Text>
            <View style={styles.searchContainer1}>
                <View style={{ marginVertical: 10, }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>Search by Keywords</Text>
                    <TextInput
                        placeholder="Enter Keyword"
                        value={searchkeyword}
                        onChangeText={filterData}
                        underlineColorAndroid='black'
                        maxLength={20}
                    />
                </View>

                <View style={{ marginVertical: 10, }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>Search by Criteria</Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Criteria"
                        value={criteriaValue}
                        onChange={item => {
                            setCriteriaValue(item.value);
                        }}

                    />
                </View>
            </View>
            {criteriaValue !== "" ?
                <View style={styles.searchContainer2}>
                    <View style={{ marginVertical: 10, }}>
                        <Text style={{ fontSize: 18, color: 'black', marginHorizontal: 35 }}>{criteriaValue}</Text>
                        <Dropdown
                            style={styles.dropdown1}
                            data={dropdownItems}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={criteriaValue === "Search by Chapter" ? "Select Chapter" : "Select Country"}
                            value={selectedValue}
                            onChange={item => {
                                criteriaValue === "Search by Chapter" ?
                                    setSelectedValue(item.value) : setSelectedValue(item.value)
                            }}

                        />
                    </View>
                </View> : null
            }

            <Text style={{ fontSize: 20, marginTop: 20, color: 'red', marginHorizontal: 10 }}>Click on company name to view details.</Text>
            <Text style={styles.CompanyTitle}>Company Name</Text>
            <FlatList
                style={{ marginBottom: 10 }}
                data={filteredData}
                keyExtractor={(item) => { item.Booth_NO }}
                renderItem={({ item }) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => sendData(item)}
                                activeOpacity={0.7}
                                style={{ flexDirection: 'row', }}>
                                <Card style={styles.card}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 2, color: 'black', textAlign: 'center', }}>{item.Company_Name}. </Text>
                                </Card>
                            </TouchableOpacity >
                        </>
                    )
                }}
            />
            < CompanyModal
                visibility={modalVisible}
                onSelect={modalClose}
                data={onClickValue} />

        </SafeAreaView >
    )
}

export default ExhibitorList

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: 'white' },
    searchContainer1: { width: "100%", backgroundColor: 'white', flexDirection: 'row', justifyContent: "space-around", alignSelf: "center", },
    searchContainer2: { width: "100%", backgroundColor: 'white', flexDirection: 'row', alignSelf: "center", justifyContent: "flex-start", marginHorizontal: 50 },
    title: { fontSize: 24, fontWeight: 'bold', color: 'purple', margin: 20 },
    CompanyTitle: { fontSize: 28, marginTop: 10, backgroundColor: '#303da1', color: 'white', paddingHorizontal: 10, paddingVertical: 5, },
    centerView: { flex: 1, backgroundColor: 'grey', justifyContent: 'center' },
    labelText: {
        fontSize: 14,
        color: '#000',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    dropdown: {
        height: 45,
        width: 150,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    dropdown1: {
        height: 45,
        width: 150,
        marginHorizontal: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
    },

    card: {
        width: "95%",
        height: 30,
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 3,
        borderRadius: 0,
        marginHorizontal: 10,
        padding: 2,
        backgroundColor: "#f2f3fa",
        marginVertical: 5,
        flexDirection: 'row',
    },
    picker: {
        height: 45,
        width: 200,
        backgroundColor: 'pink',
        textDecorationLine: ''
    },
})