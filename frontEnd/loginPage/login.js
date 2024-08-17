import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Image
} from 'react-native';
import styles from './style';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === '' || password === '') {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        fetch('http://10.0.2.2:3002/signin', {  // Correct endpoint should be /signin for login
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.msg)
                if (data.msg == 'Success') {
                    AsyncStorage.setItem('token', data.data)
                    console.log(data.data)
                    const userCredentials = {
                        username: data.username,
                        email: data.email,
                        address: data.address,
                    };
                    AsyncStorage.setItem('userCredentials', JSON.stringify(userCredentials))
                    Alert.alert("LOGGEDIN SUCCESSFUL")
                    navigation.replace('home', { email: email });
                } else {
                    Alert.alert('Error', data.msg);
                }
            })
            .catch(err => {
                console.warn(`ERROR OCCURRED: ${err}`);
                Alert.alert('Error', 'An error occurred. Please try again.');
            });
    };

    useEffect(() => {
        // navigation.navigate('home')
        setTimeout(() => {
            SplashScreen.hide()
        }, 1000)
    })

    function navigateTo() {
        navigation.navigate('SignUp')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('/home/ytp-ind-desk09/Documents/CRUD/frontEnd/src/images/max-bend.png')}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <Image source={require('/home/ytp-ind-desk09/Documents/CRUD/frontEnd/src/images/green-building-city-logo-concept.png')} style={styles.logo}></Image>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.newuser}>
                        <Text style={{ color: 'white', fontSize: 24 }}>NEW USER?  </Text>
                        <TouchableOpacity onPress={navigateTo}>
                            <Text style={styles.create}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView >
    );
};


export default LoginScreen;

