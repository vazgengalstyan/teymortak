import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    StatusBar,
    YellowBox,
    ActivityIndicator
} from 'react-native'
import {GameBoard, Layout, Time, TimerContainer} from '../uikit'
import Styles from '../styles/Styles'

YellowBox.ignoreWarnings(['Require cycle:']);

class Game extends Component {

    state = {
        loaderVisible: true,
        time: 0
    }

    didFocusSubscription = this.props.navigation.addListener('didFocus', async () => {

        this.setState({loaderVisible: false})

    })

    render(): React.ReactNode {

        const {
            container
        } = Styles

        const {
            loaderVisible,
            time
        } = this.state

        return (
            <View style={container}>

                <StatusBar hidden={true}/>

                {!loaderVisible ?
                    <Layout>

                        <TimerContainer>

                            <Time time={time}/>

                        </TimerContainer>

                        <GameBoard>



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