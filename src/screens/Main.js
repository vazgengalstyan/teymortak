import React, {Component} from 'react';
import {View, AppState, AsyncStorage, StatusBar, Animated, YellowBox} from 'react-native'
import {Layout, Name, Button, ContainerRow, ButtonSound, PopUp} from '../uikit'
import Styles from '../styles/Styles'
import SplashScreen from 'react-native-splash-screen'
import Sound from 'react-native-sound'
YellowBox.ignoreWarnings(['Require cycle:']);

class Main extends Component {

    state = {

        fadeAnim: new Animated.Value(0),
        sound_play: '',
        visibleModal: false

    }

    didFocusSubscription = this.props.navigation.addListener('didFocus', async () => {

        this.sound = new Sound(require('../res/sound/sound.mp3'), Sound.MAIN_BUNDLE)

        await AsyncStorage.getItem('sound').then((sound)=>{

            this.setState({sound_play: sound})
            this.playStopSound()

        })

        SplashScreen.hide();
        AppState.addEventListener('change', this._handleAppStateChange);
        Animated.timing(this.state.fadeAnim, {toValue: 1, duration: 2500}).start();

    })

    _handleAppStateChange = () => {

        if (AppState.currentState === 'background') {

            this.sound.pause()

        } else {

            this.playStopSound()

        }

    }

    playStopSound = ()=> {

        if(this.state.sound_play==='1' || this.state.sound_play===null){

            if(this.state.sound_play===null){

                this.setState({sound_play: '1'})

            }

            setTimeout(()=>{

                this.sound.play(()=>{this.playStopSound()})

            },500)

        }else {

            this.sound.stop()

        }

    }

    setModalVisible = (visible)=>{

        this.setState({visibleModal: visible})

    }

    render(): React.ReactNode {

        const {container} = Styles
        const {fadeAnim, sound_play,visibleModal} = this.state

        return (
            <View style={container}>

                <StatusBar hidden={true}/>

                <Layout>

                    <ButtonSound animatedValue={new Animated.Value(1)}
                                 soundOn={sound_play}
                                 onPress={() => {this.setState({sound_play: this.state.sound_play==='0'?'1':'0'});this.playStopSound()}}
                                 fadeAnim={fadeAnim}/>

                    <Name fadeAnim={fadeAnim}/>

                    <PopUp visibleModal={visibleModal}
                           setModalVisible={this.setModalVisible}
                    />

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
                                    this.setModalVisible(true)
                                }}
                                fadeAnim={fadeAnim}/>

                    </ContainerRow>

                </Layout>

            </View>
        )

    }

}

export default Main