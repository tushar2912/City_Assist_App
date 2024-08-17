import React from "react";
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    title: {
        fontSize: 32,
        marginBottom: 24,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#29B5F5',
        padding: 12,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    logo: {
        height: 70,
        width: 90,
        marginHorizontal: 120,
        borderRadius: 20
    },
    newuser: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    create: {
        color: 'white',
        fontSize: 22,
        backgroundColor: 'lightblue',
        borderRadius: 10,
        padding: 10

    }
});

export default styles;