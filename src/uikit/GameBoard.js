import React from 'react'
import {Animated} from 'react-native'
import Styles from '../styles/Styles'

const GameBoard = props => {

    const {BoardGame} = Styles
    const fadeAnim = props.fadeAnim

    return (

        <Animated.View style={[{opacity: fadeAnim},BoardGame]}>

            {props.children}

        </Animated.View>

    )

}

export {GameBoard}