import React from 'react'
import {Animated} from 'react-native'
import Styles from '../styles/Styles'

const GameBoard = props => {

    const {BoardGame} = Styles

    let fadeAnim = new Animated.Value(0)
    Animated.timing(fadeAnim, {toValue: 1, duration: 500}).start();

    return (

        <Animated.View style={[{opacity: fadeAnim},BoardGame]}>

            {props.children}

        </Animated.View>

    )

}

export {GameBoard}