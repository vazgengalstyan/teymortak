import React from 'react'
import { TouchableWithoutFeedback, Animated } from 'react-native'
import Styles from '../styles/Styles'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'

const ButtonSound = ({animatedValue,soundOn,onPress,fadeAnim})=> {

    const {buttonSound,contentCenter,buttonSoundContainer} = Styles

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
        <Animated.View style={[{opacity: fadeAnim},buttonSoundContainer]}>

            <TouchableWithoutFeedback onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>

                <Animated.View style={[buttonSound, contentCenter, animatedStyle]}>

                    {+soundOn?<Icon name={'volume-down'} color={'rgb(70,23,4)'} size={20}/>:
                        <Icon name={'volume-mute'} color={'rgb(70,23,4)'} size={20}/>}

                </Animated.View>

            </TouchableWithoutFeedback>

        </Animated.View>
    );

}

export {ButtonSound}