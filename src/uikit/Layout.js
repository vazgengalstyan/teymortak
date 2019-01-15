import React from 'react'
import {View,ImageBackground} from 'react-native'
import Styles from '../styles/Styles'

const Layout = props => {

    const {container,contentCenter} = Styles
    const img = require('../res/images/Background.jpg')

    return (

        <View style={container}>

            <ImageBackground source={img} style={[container,contentCenter]}>

                {props.children}

            </ImageBackground>

        </View>

    )

}

export {Layout}