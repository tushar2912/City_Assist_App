import React, { useState } from "react";
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const PostApp = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const postAPI = async () => {
        if (!title || !description) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");  // Clear previous errors

        try {
            const apiUrl = 'http://10.0.2.2:3002/data'; // Adjust with your backend API endpoint
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    status: 'open', // Default value can be set here if needed
                    createdAt: new Date().toISOString(), // Use current timestamp for createdAt
                    updatedAt: new Date().toISOString(), // Use current timestamp for updatedAt
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Case created successfully:', data);
                // Handle success (e.g., show success message, update UI)
                setError("Case created successfully!");
                setTitle("");
                setDescription("");
            } else {
                console.error('Failed to create case:', response.statusText);
                // Handle error (e.g., show error message)
                setError("Failed to create case. Please try again.");
            }

        } catch (err) {
            console.error('Error creating case:', err);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>POST FORM</Text>
                <Text style={styles.sideHeadings}>Title</Text>
                <TextInput
                    placeholder="Enter Title"
                    placeholderTextColor="#4E5C64"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.inputDabba}
                />
                <Text style={styles.sideHeadings}>Description</Text>
                <TextInput
                    placeholder="Enter Description"
                    placeholderTextColor="#4E5C64"
                    value={description}
                    onChangeText={setDescription}
                    style={styles.inputDabba}
                    multiline
                    numberOfLines={4}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Submit"
                        color="#4E5C64"
                        onPress={postAPI}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    sideHeadings: {
        fontSize: 18,
        color: "#4E5C64",
        marginLeft: 10,
    },
    inputDabba: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#DFE1E3',
        margin: 10,
        padding: 10,
        minHeight: 100,
    },
    buttonContainer: {
        marginVertical: 20,
        marginHorizontal: 50,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default PostApp;
