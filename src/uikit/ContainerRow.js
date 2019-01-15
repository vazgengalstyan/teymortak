import React from 'react'
import {View} from 'react-native'
import Styles from '../styles/Styles'

const ContainerRow = props => {

    const {row} = Styles

    return (

        <View style={row}>

            {props.children}

        </View>

    )

}

export {ContainerRow}