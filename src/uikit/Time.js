import React from 'react'
import {Animated, Text} from 'react-native'
import Styles from '../styles/Styles'

const Time = ({minutes,seconds,fadeAnim})=> {

    const {timeStyle} = Styles

    return (

        <Animated.View style={[{opacity: fadeAnim}]}>

            <Text style={timeStyle}>{minutes} : {seconds}</Text>

        </Animated.View>
    );

}

export {Time}