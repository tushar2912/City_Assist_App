import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet, TextInput, Button, ScrollView, Alert } from "react-native";

const PutApp = ({ route, navigation }) => {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (route.params) {
            const { id, title, description, status, createdAt, updatedAt } = route.params;
            setId(id);
            console.log(id)
            setTitle(title);
            setDescription(description);
            setStatus(status);
            setCreatedAt(createdAt);
            setUpdatedAt(updatedAt);
        } else {
            setError("Route params are undefined");
        }
    }, [route.params]);

    const updateData = async () => {
        try {
            const apiUrl = `http://10.0.2.2:3002/data/${id}`; // Adjust with your backend API endpoint
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    status,
                    createdAt,
                    updatedAt,
                }),
            });

            if (response.ok) {
                const updatedData = await response.json();
                console.log('Data updated successfully:', updatedData);
                // Handle success (e.g., show success message, navigate back)
                Alert.alert("Success", "Data updated successfully", [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]);
            } else {
                console.error('Failed to update data:', response.statusText);
                // Handle error (e.g., show error message)
                setError("Failed to update data. Please try again.");
            }

        } catch (err) {
            console.error('Error updating data:', err);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* {error ? <Text style={styles.errorText}>{error}</Text> : null} */}
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'grey', textAlign: 'center', paddingBottom: 15 }}>PUT FORM</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setId}
                    value={id}
                    placeholder="id"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                    placeholder="Title"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Description"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setStatus}
                    value={status}
                    placeholder="Status"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setCreatedAt}
                    value={createdAt}
                    placeholder="Created At"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setUpdatedAt}
                    value={updatedAt}
                    placeholder="Updated At"
                />
                <View style={styles.buttonContainer}>
                    <Button title="Submit" onPress={updateData} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollView: {
        flexGrow: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        paddingLeft: 10
    },
    buttonContainer: {
        marginVertical: 20,
        marginHorizontal: 50,
    },
    errorText: {
        color: "red",
        marginBottom: 12,
    },
});

export default PutApp;
