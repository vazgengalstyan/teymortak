import React, {Component} from 'react';
import {
    View,
    AppState,
    AsyncStorage,
    StatusBar,
    Animated,
    YellowBox,
    ActivityIndicator
} from 'react-native'
import {Layout, Name, Button, ContainerRow, ButtonSound, PopUp} from '../uikit'
import Styles from '../styles/Styles'
import SplashScreen from 'react-native-splash-screen'
import Sound from 'react-native-sound'

YellowBox.ignoreWarnings(['Require cycle:']);

class Main extends Component {

    state = {
        fadeAnim: new Animated.Value(0),
        sound_play: '',
        visibleModal: false,
        records: ['_ _:_ _', '_ _:_ _', '_ _:_ _'],
        gameStarted: false,
        loaderVisible: false
    }

    sound = new Sound(require('../res/sound/sound.mp3'), Sound.MAIN_BUNDLE)

    didFocusSubscription = this.props.navigation.addListener('didFocus', async () => {

        this.getRecords()

        await AsyncStorage.getItem('sound').then(async (sound) => {

            await this.setState({sound_play: sound})
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

    playStopSound = () => {

        if (this.state.sound_play === '1' || this.state.sound_play === null) {

            if (this.state.sound_play === null) {

                this.setState({sound_play: '1'})

            }

            AsyncStorage.setItem('sound', '1')

            setTimeout(() => {

                this.sound.play(() => {
                    this.playStopSound()
                })

            }, 500)

        } else {

            this.sound.stop()
            AsyncStorage.setItem('sound', '0')

        }

    }

    setModalVisible = (visible) => {

        this.setState({visibleModal: visible})

    }

    getRecords = async () => {

        await AsyncStorage.getItem('records').then((records) => {

            let res = JSON.parse(records)

            if (res !== null) {

                let records = ['_ _:_ _', '_ _:_ _', '_ _:_ _']

                for (let i = 0; i < res.length; i++) {

                    records[i] = res[i]

                }

                this.setState({records: records})

            }

        })

    }

    startGame = ()=>{

        this.props.navigation.navigate('Game')
        this.setState({loaderVisible: false})

    }

    soundButtonClick = ()=>{

        this.setState({sound_play: this.state.sound_play === '0' ? '1' : '0'})
        this.playStopSound()

    }

    render(): React.ReactNode {

        const {container} = Styles
        const {
            fadeAnim,
            sound_play,
            visibleModal,
            records,
            gameStarted,
            loaderVisible
        } = this.state

        return (
            <View style={container}>

                <StatusBar hidden={true}/>

                {!loaderVisible ? <Layout>

                        <ButtonSound animatedValue={new Animated.Value(1)}
                                     soundOn={sound_play}
                                     onPress={this.soundButtonClick}
                                     fadeAnim={fadeAnim}/>

                        <Name fadeAnim={fadeAnim}/>

                        <PopUp visibleModal={visibleModal}
                               setModalVisible={this.setModalVisible}
                               records={records}
                        />

                        <ContainerRow>

                            <Button animatedValue={new Animated.Value(1)}
                                    iconName={'play'}
                                    onPress={() => {
                                        if (!gameStarted) {
                                            this.setState({loaderVisible: true})
                                        }
                                        this.setState({gameStarted: true})
                                        this.startGame()
                                    }}
                                    fadeAnim={fadeAnim}/>

                            <Button animatedValue={new Animated.Value(1)}
                                    iconName={'crown'}
                                    onPress={() => {
                                        this.setModalVisible(true)
                                    }}
                                    fadeAnim={fadeAnim}/>

                        </ContainerRow>

                    </Layout> :
                    <Layout>

                        <ActivityIndicator size={70} color={'rgb(70,23,4)'}/>

                    </Layout>}

            </View>
        )

    }

}

export default Main