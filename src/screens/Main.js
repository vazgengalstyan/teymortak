import React, {Component} from 'react';
import {View, StatusBar, Animated} from 'react-native'
import {Layout, Name, Button, ContainerRow} from '../uikit'
import Styles from '../styles/Styles'
import SplashScreen from 'react-native-splash-screen'

class Main extends Component {

    state = {
        fadeAnim: new Animated.Value(0)
    }

    didFocusSubscription = this.props.navigation.addListener('didFocus', () => {

            SplashScreen.hide();
            Animated.timing(this.state.fadeAnim, {toValue: 1, duration: 2500}).start();

        }
    );

    render(): React.ReactNode {

        const {container} = Styles
        const {fadeAnim} = this.state

        return (
            <View style={container}>

                <StatusBar hidden={true}/>

                <Layout>

                    <Name fadeAnim={fadeAnim}/>

                    <ContainerRow>

                        <Button animatedValue={new Animated.Value(1)} iconName={'play'} onPress={()=>{alert(1)}}/>

                        <Button animatedValue={new Animated.Value(1)} iconName={'crown'} onPress={()=>{alert(2)}}/>

                    </ContainerRow>

                </Layout>

            </View>
        )

    }

}

export default Main