import React from 'react'
import {Animated, Text} from 'react-native'
import Styles from '../styles/Styles'


const Time = ({time})=> {

    const {timeStyle} = Styles
    let fadeAnim = new Animated.Value(0)
    Animated.timing(fadeAnim, {toValue: 1, duration: 500}).start();

    return (

        <Animated.View style={[{opacity: fadeAnim}]}>

            <Text style={timeStyle}>{time}</Text>

        </Animated.View>
    );

}


export {Time}