import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView, TextInput, StyleSheet, Button, TouchableOpacity, BackHandler, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";

const GetApp = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [usertext, setText] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');
    const [cartItems, setCartItems] = useState([]);

    const getApi = async () => {
        console.log('function called');
        try {
            let result = await fetch('http://10.0.2.2:3002/data');
            result = await result.json();
            setData(result);
            setFilteredData(result); // Initialize filtered data with all data
        } catch (err) {
            console.log("Error: ", err);
        }
    };

    const handleBackHandler = () => {
        Alert.alert('Exit App', 'Are You Sure You want to exit?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel'
            },
            {
                text: 'Exit',
                onPress: () => BackHandler.exitApp()
            }
        ]);
        return true;
    };

    const storeCartData = async (item) => {
        try {
            const storedCartItems = await AsyncStorage.getItem('cartItems');
            const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

            const itemExists = cartItems.some(cartItem => cartItem.id === item.id);

            if (!itemExists) {
                const updatedCart = [...cartItems, item];
                await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
                setCartItems(updatedCart);
                setPopUpMessage('Item added to cart!');
            } else {
                setPopUpMessage('Item already in cart!');
            }
            console.log(cartItems)
            setShowPopUp(true);
            setTimeout(() => {
                setShowPopUp(false);
            }, 1000);
        } catch (error) {
            console.log("Error storing cart data:", error);
        }
    };

    useEffect(() => {
        getApi();
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackHandler);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
        };
    }, []);

    const filterData = (text) => {
        setText(text);
        if (text === "") {
            setFilteredData(data); // Reset to original data if search is empty
        } else {
            const newData = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
            setFilteredData(newData);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View >
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search Here"
                        value={usertext}
                        onChangeText={filterData}
                        style={styles.searchInput}
                    />
                    <Icon name="search" size={20} color={'grey'} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ paddingHorizontal: 100, paddingBottom: 5 }}>
                        <Button
                            title="Search"
                            style={styles.buttoning}
                            onPress={() => filterData(usertext)}
                        />
                    </View>

                </View>
            </View>
            <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <View style={styles.smallContainer}>
                        <Text style={styles.sideHeadingText}>Case No:</Text>
                        <Text style={styles.subSmallIdContainer}>{item._id}</Text>
                        <Text style={styles.sideHeadingText}>Title:</Text>
                        <Text style={styles.subSmallContainer}>{item.title}</Text>
                        <Text style={styles.sideHeadingText}>Description: </Text>
                        <Text style={styles.subSmallContainer}>{item.description}</Text>
                        <Text style={styles.sideHeadingText}>Status: </Text>
                        <Text style={styles.subSmallContainer}>{item.status}</Text>
                        <Text style={styles.sideHeadingText}>Created Date: </Text>
                        <Text style={styles.subSmallContainer}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                        <Text style={styles.sideHeadingText}>Updated Date: </Text>
                        <Text style={styles.subSmallContainer}>{new Date(item.updatedAt).toLocaleDateString()}</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate('PUT', {
                                id: item._id,
                                title: item.title,
                                description: item.description,
                                status: item.status,
                                createdAt: item.createdAt,
                                updatedAt: item.updatedAt
                            })}>
                                <Text style={styles.updateText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => navigation.navigate('DELETE', { id: item._id })}>
                                <Text style={styles.deleteText}>Delete</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                )}
                keyExtractor={item => item._id.toString()}
            />
            {showPopUp && (
                <View style={styles.popUp}>
                    <Text style={styles.popUpText}>{popUpMessage}</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 37,
        fontSize: 5,
        padding: 5,
        paddingLeft: 15,
        margin: 10,
        shadowOpacity: 1,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        padding: 5,
    },
    smallContainer: {
        backgroundColor: "#8C9EA6",
        padding: 10,
        margin: 10,
        borderWidth: 4,
        borderColor: 'white',
        borderRadius: 15,
    },
    subSmallContainer: {
        backgroundColor: '#768C97',
        padding: 5,
        margin: 10,
        fontSize: 20,
        color: "white",
        borderRadius: 10,
    },
    subSmallIdContainer: {
        backgroundColor: 'red',
        padding: 5,
        margin: 10,
        fontSize: 20,
        color: "white",
        textAlign: "center"
    },
    buttoning: {
        borderRadius: 10,
        padding: 2,
        margin: 2,
        color: "gold"
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    updateButton: {
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black'
    },
    updateText: {
        color: 'white'
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black'
    },
    deleteText: {
        color: 'white'
    },
    cartButton: {
        backgroundColor: 'orange',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black'
    },
    cartText: {
        color: 'white'
    },
    popUp: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -100 }],
        width: 200,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 10,
        alignItems: 'center',
    },
    popUpText: {
        color: 'white',
    },
    sideHeadingText: {
        fontWeight: 'bold'
    }
});

export default GetApp;
