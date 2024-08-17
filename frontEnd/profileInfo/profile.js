import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from "react-native";

const Profile = ({ navigation }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const userCredentials = await AsyncStorage.getItem('userCredentials');
                if (userCredentials) {
                    setUserProfile(JSON.parse(userCredentials));
                } else {
                    Alert.alert('Error', 'Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                Alert.alert('Error', 'Failed to fetch user profile');
            } finally {
                setLoading(false);
            }
        };

        getInfo();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    function logoutpermanently() {
        navigation.navigate('SignIn')
    }

    return (
        <View style={styles.container}>
            {userProfile ? (
                <View>
                    <Text style={styles.label}>Username:</Text>
                    <Text style={styles.text}>{userProfile.username}</Text>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.text}>{userProfile.email}</Text>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.text}>{userProfile.address}</Text>
                </View>
            ) : (
                <Text>No user profile found</Text>
            )}
            <TouchableOpacity style={styles.logoutButton} onPress={logoutpermanently}>
                <Text style={{ color: 'white' }}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10
    },
    text: {
        fontSize: 16,
        marginBottom: 10
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 3,

    }
});

export default Profile;

