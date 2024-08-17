import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Image,
    StyleSheet
} from 'react-native';
import styles from './style';

const SignUp = ({ navigation }) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = () => {
        if (userName === '' || email === '' || password === '' || address === '') {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }
        try {
            const result = fetch('http://10.0.2.2:3002/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        userName,
                        email,
                        password,
                        address
                    }
                )
            })
                .then(response => response.json())
                .then(data => console.log('successfully submitted the data', data))
        } catch (err) {
            console.log('ERROR OCCURED: ', err)
        }
        navigation.navigate('SignIn');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('/home/ytp-ind-desk09/Documents/CRUD/frontEnd/src/images/anthony-reungere.png')}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <Image source={require('/home/ytp-ind-desk09/Documents/CRUD/frontEnd/src/images/green-building-city-logo-concept.png')} style={styles.logo}></Image>
                    <Text style={styles.title}>Signup</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="User Name"
                        value={userName}
                        onChangeText={(text) => setUserName(text)}
                        keyboardType="default"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default SignUp;

