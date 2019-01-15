import React from 'react'
import {Animated, Image} from 'react-native'
import Styles from '../styles/Styles'

const Name = ({fadeAnim}) => {

    const img = require('../res/images/Logo.png')
    const {name} = Styles

    return (

        <Animated.View style={{opacity: fadeAnim}}>

            <Image source={img} style={name} resizeMode={'contain'}/>

        </Animated.View>
    )

}

export {Name}