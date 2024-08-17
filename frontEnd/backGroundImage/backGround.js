import React from 'react'
import { View, ImageBackground } from 'react-native'

const BackGround = ({ children }) => {
    <ImageBackground source={require('/home/ytp-ind-desk09/Documents/CRUD/frontEnd/src/images/parrish-freeman-K2W8TIxcuko-unsplash.jpg')} style={{ height: '100%' }}>
        <View>
            {children}
        </View>
    </ImageBackground>

}

export default BackGround;