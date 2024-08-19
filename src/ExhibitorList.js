import { View, Text, TextInput, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import axios from 'react-native-axios';

import { Card } from 'react-native-paper';
import CompanyModal from './Modal';
import { Dropdown } from 'react-native-element-dropdown';

const ExhibitorList = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [criteriaValue, setCriteriaValue] = useState("");
    const [userData, setUserData] = useState([]);
    const [onClickValue, setOnClickValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [searchText, setSearchText] = useState('');

    const criteriaOptions = [
        { label: 'Search by Chapter', value: 'Search by Chapter' },
        { label: 'Search by Country', value: 'Search by Country' },
    ];

    const fetchData = async () => {
        try {
            const response = await axios.get('https://events.tecogis.com/reactnative-test/ExhibitorList.json');
            setUserData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (criteriaValue) {
            const formattedData = userData.map(item => ({
                label: criteriaValue === "Search by Chapter" ? item.Chapters : item.Country,
                value: criteriaValue === "Search by Chapter" ? item.Chapters : item.Country,
            }));

            const uniqueData = Array.from(new Set(formattedData.map(item => item.value)))
                .map(value => {
                    return formattedData.find(item => item.value === value);
                });

            setDropdownItems(uniqueData);
        }
    }, [criteriaValue, userData]);

    useEffect(() => {
        if (selectedValue) {
            const filtered = userData.filter(item =>
                criteriaValue === "Search by Chapter" ? item.Chapters === selectedValue : item.Country === selectedValue
            );
            setFilteredData(filtered);
        }
    }, [selectedValue, criteriaValue, userData]);

    const handleKeywordSearch = text => {
        setSearchKeyword(text);
        const filtered = userData.filter(item =>
            item.Company_Name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const modalClose = () => setModalVisible(false);

    const sendData = item => {
        setOnClickValue(item);
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.title}>EXHIBITOR LIST</Text>
            <View style={styles.searchContainer1}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>Search by Keywords</Text>
                    <TextInput
                        placeholder="Enter Keyword"
                        value={searchKeyword}
                        onChangeText={handleKeywordSearch}
                        underlineColorAndroid="black"
                        maxLength={20}
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>Search by Criteria</Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={criteriaOptions}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Criteria"
                        value={criteriaValue}
                        onChange={item => setCriteriaValue(item.value)}
                    />
                </View>
            </View>
            {criteriaValue !== "" && (
                <View style={styles.searchContainer2}>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, color: 'black', marginHorizontal: 35 }}>{criteriaValue}</Text>
                        <Dropdown
                            style={styles.dropdown1}
                            data={dropdownItems}
                            maxHeight={300}
                            search
                            searchPlaceholder="Search..."
                            labelField="label"
                            valueField="value"
                            placeholder={`Select ${criteriaValue === "Search by Chapter" ? "Chapter" : "Country"}`}
                            value={selectedValue}
                            onChange={item => setSelectedValue(item.value)}
                        />
                    </View>
                </View>
            )}

            <Text style={{ fontSize: 20, marginTop: 20, color: 'red', marginHorizontal: 10 }}>Click on company name to view details.</Text>
            <Text style={styles.CompanyTitle}>Company Name</Text>
            <FlatList
                style={{ marginBottom: 10 }}
                data={filteredData}
                keyExtractor={item => item.Company_Name}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => sendData(item)} activeOpacity={0.7} style={{ flexDirection: 'row' }}>
                        <Card style={styles.card}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 2, color: 'black', textAlign: 'center' }}>{item.Company_Name}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
            <CompanyModal visibility={modalVisible} onSelect={modalClose} data={onClickValue} />
        </SafeAreaView>
    );
};

export default ExhibitorList;

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: 'white' },
    searchContainer1: { width: "100%", backgroundColor: 'white', flexDirection: 'row', justifyContent: "space-around", alignSelf: "center" },
    searchContainer2: { width: "100%", backgroundColor: 'white', flexDirection: 'row', alignSelf: "center", justifyContent: "flex-start", marginHorizontal: 50 },
    title: { fontSize: 24, fontWeight: 'bold', color: 'purple', margin: 20 },
    CompanyTitle: { fontSize: 28, marginTop: 10, backgroundColor: '#303da1', color: 'white', paddingHorizontal: 10, paddingVertical: 5 },
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
});
