import React, {Component} from 'react';
import {View, AppState, AsyncStorage, StatusBar, Animated} from 'react-native'
import {Layout, Name, Button, ContainerRow, ButtonSound} from '../uikit'
import Styles from '../styles/Styles'
import SplashScreen from 'react-native-splash-screen'
import Sound from 'react-native-sound'

class Main extends Component {

    state = {

        fadeAnim: new Animated.Value(0),
        sound_play: ''

    }

    didFocusSubscription = this.props.navigation.addListener('didFocus', async () => {

        await AsyncStorage.getItem('sound').then(async (sound) => {

            if(sound === null){
                await AsyncStorage.setItem('sound', '1')
                this.setState({sound_play: '1'})
                return
            }

            this.setState({sound_play: sound})
        })

        SplashScreen.hide();

        AppState.addEventListener('change', this._handleAppStateChange);

        Animated.timing(this.state.fadeAnim, {toValue: 1, duration: 2500}).start();

        setTimeout(() => {
            if (+this.state.sound_play) {
                this.playSound()
            }
        }, 400)

    })

    _handleAppStateChange = () => {

        if (AppState.currentState === 'background') {

            this.sound.stop()

        } else {

            this.playSound()
        }

    }

    playSound = () => {

        if (+this.state.sound_play) {
            this.sound.play(() => {
                this.playSound()
            })
        }

    }

    stopSound = async () => {

        if (+this.state.sound_play) {
            this.sound.stop()
            await AsyncStorage.setItem('sound', '0')
            await this.setState({sound_play: '0'})
        } else {
            await AsyncStorage.setItem('sound', '1')
            await this.setState({sound_play: '1'})
            this.playSound()
        }

    }

    sound = new Sound(require('../res/sound/sound.mp3'), null, (error) => {});

    render(): React.ReactNode {

        const {container} = Styles
        const {fadeAnim, sound_play} = this.state

        return (
            <View style={container}>

                <StatusBar hidden={true}/>

                <Layout>

                    <ButtonSound animatedValue={new Animated.Value(1)}
                                 soundOn={sound_play}
                                 onPress={() => {
                                     this.stopSound()
                                 }}
                                 fadeAnim={fadeAnim}/>

                    <Name fadeAnim={fadeAnim}/>

                    <ContainerRow>

                        <Button animatedValue={new Animated.Value(1)}
                                iconName={'play'}
                                onPress={() => {
                                    alert(1)
                                }}
                                fadeAnim={fadeAnim}/>

                        <Button animatedValue={new Animated.Value(1)}
                                iconName={'crown'}
                                onPress={() => {
                                    alert(2)
                                }}
                                fadeAnim={fadeAnim}/>

                    </ContainerRow>

                </Layout>

            </View>
        )

    }

}

export default Main