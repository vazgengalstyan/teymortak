import React from 'react'
import { View, TouchableWithoutFeedback, Animated } from 'react-native'
import Styles from '../styles/Styles'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'

const Button = ({animatedValue,iconName,onPress})=> {

    const {buttonMain,contentCenter} = Styles

    this.handlePressIn = ()=> {

        Animated.spring(animatedValue, {toValue: .5}).start()

    }

    this.handlePressOut = ()=> {

        Animated.spring(animatedValue, {toValue: 1, friction: 3, tension: 40}).start()
        setTimeout(()=>{
            onPress()
        },500)

    }

    const animatedStyle = {

        transform: [{ scale: animatedValue}]

    }

        return (
            <View>

                <TouchableWithoutFeedback onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>

                    <Animated.View style={[buttonMain, contentCenter, animatedStyle]}>

                        <Icon name={iconName} color={'rgb(70,23,4)'} size={25} style={iconName==='play'?{marginLeft: 3}:null}/>

                    </Animated.View>

                </TouchableWithoutFeedback>

            </View>
        );

}


export {Button}