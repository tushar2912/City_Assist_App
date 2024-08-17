import React, { useState, useEffect } from "react";
import { Button, SafeAreaView, Text, TextInput, View, StyleSheet } from "react-native";

const DeleteApp = ({ route }) => {
    const [id, setId] = useState("");

    useEffect(() => {
        if (route.params) {
            const { id } = route.params;
            setId(id);
            console.log(id)
        }
    }, [route.params]);

    const deleteAPI = async () => {
        let response;
        try {
            response = await fetch(`http://10.0.2.2:3002/data/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.warn("YOUR OBJECT HAS BEEN DELETED");
            } else {
                console.warn("YOUR OBJECT HAS NOT BEEN DELETED");
            }
        } catch (err) {
            console.warn("ERROR: ", err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>
                Please provide us the id which you want to delete
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter the id here"
                placeholderTextColor={"gray"}
                value={id}
                onChangeText={setId}
            />
            <View style={styles.buttonContainer}>
                <Button title="Delete" color={'purple'} onPress={deleteAPI} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    buttonContainer: {
        marginTop: 16,
    },
});

export default DeleteApp;

