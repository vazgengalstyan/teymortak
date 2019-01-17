import React from 'react'
import {View} from 'react-native'
import Styles from '../styles/Styles'

const TimerContainer = props => {

    const {positionAbsoluteContainer,contentCenter} = Styles


    return (

        <View style={[contentCenter,positionAbsoluteContainer]}>

            {props.children}

        </View>

    )

}

export {TimerContainer}