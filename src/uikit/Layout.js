import React from 'react'
import {View,ImageBackground} from 'react-native'
import Styles from '../styles/Styles'

const Layout = props => {

    const {container,fullWidthHeight,contentCenter} = Styles
    const img = require('../images/Background.jpg')

    return (

        <View style={container}>

            <ImageBackground source={img} style={[fullWidthHeight,contentCenter]}>

                {props.children}

            </ImageBackground>

        </View>

    )

}

export {Layout}