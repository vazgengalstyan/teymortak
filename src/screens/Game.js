import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    StatusBar,
    YellowBox,
    ActivityIndicator,
    Animated
} from 'react-native'
import {GameBoard, Layout, Time, TimerContainer} from '../uikit'
import Styles from '../styles/Styles'

YellowBox.ignoreWarnings(['Require cycle:']);

class Game extends Component {

    state = {
        loaderVisible: true,
        minutes: 0,
        seconds: 0,
        fadeAnim: new Animated.Value(0)
    }

    didFocusSubscription = this.props.navigation.addListener('didFocus', async () => {

        await this.setState({loaderVisible: false})
        Animated.timing(this.state.fadeAnim, {toValue: 1, duration: 500}).start();
        this.startTimer()

    })

    willBlurSubscription = this.props.navigation.addListener('willBlur', async ()=>{

        await clearInterval(this.timer)

    })

    startTimer = ()=>{

        this.timer = setInterval(()=>{

            if(this.state.seconds===59){

                this.setState({minutes: this.state.minutes+1, seconds: 0})

            }

            this.setState({seconds: this.state.seconds+1})

        },1000)

    }

    render(): React.ReactNode {

        const {
            container
        } = Styles

        const {
            loaderVisible,
            seconds,
            minutes,
            fadeAnim
        } = this.state

        return (
            <View style={container}>

                <StatusBar hidden={true}/>

                {!loaderVisible ?
                    <Layout>

                        <TimerContainer>

                            <Time seconds={seconds} minutes={minutes} fadeAnim={fadeAnim}/>

                        </TimerContainer>

                        <GameBoard fadeAnim={fadeAnim}>



                        </GameBoard>

                    </Layout> :
                    <Layout>

                        <ActivityIndicator size={70} color={'rgb(70,23,4)'}/>

                    </Layout>}

            </View>
        )

    }

}

export default Game