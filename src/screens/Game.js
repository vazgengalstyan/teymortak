import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    StatusBar,
    YellowBox,
    ActivityIndicator,
    Animated,
    AppState,
    Alert
} from 'react-native'
import {CubeList, GameBoard, Layout, Time, TimerContainer} from '../uikit'
import Styles from '../styles/Styles'
import GestureRecognizer from 'react-native-swipe-gestures'

YellowBox.ignoreWarnings(['Require cycle:']);

class Game extends Component {

    state = {
        loaderVisible: true,
        minutes: 0,
        seconds: 0,
        fadeAnim: new Animated.Value(0),
        data: [],
        gameFinished: false
    }

    didFocusSubscription = this.props.navigation.addListener('didFocus', async () => {

        await this.startGame()
        await this.setState({loaderVisible: false})
        Animated.timing(this.state.fadeAnim, {toValue: 1, duration: 500}).start();
        AppState.addEventListener('change', this._AppStateChange);

    })

    willBlurSubscription = this.props.navigation.addListener('willBlur', async () => {

        await clearInterval(this.timer)
        AppState.removeEventListener('change', this._AppStateChange);

    })

    _AppStateChange = () => {

        if (AppState.currentState === 'background') {

            clearInterval(this.timer)

        } else {

            if(!this.state.gameFinished){

                this.startTimer()

            }

        }

    }

    startGame = async ()=>{

        let data = [], a = [];
        for (let i=0;i<16;++i) a[i]=i;

        function shuffle(array) {
            let tmp, current, top = array.length;
            if(top) while(--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
            return array;
        }

        a = shuffle(a);

        for(let k = 0; k < a.length; k++){

            if(a[k]===0){

                a[k] = '';

            }

            data.push({number: a[k]})

        }

        this.setState({data: data, minutes: 0, seconds: 0})
        this.startTimer()

    }

    startTimer = () => {

        this.timer = setInterval(() => {

            if (this.state.seconds === 59) {

                this.setState({minutes: this.state.minutes + 1, seconds: 0})

            }

            this.setState({seconds: this.state.seconds + 1})

        }, 1000)

    }

    clickItem = async (item,index)=>{

        if(item.number===''){
            return
        }

        let oldData = this.state.data;
        let matrix = [[],[],[],[]];
        let emptyIndex;
        let coordinateClick = [Math.trunc(index/4),index-4*Math.trunc(index/4)];
        let emptyCoordinate = [];
        let newData = [];

        for(let i = 0; i < matrix.length; i++){

            let k =  i*4+4;
            for(let j = i*4; j < k; j++){

                matrix[i].push(oldData[j])

            }

        }

        for(let i = 0; i < oldData.length; i++){

            if(oldData[i].number===''){

                emptyIndex = i;

            }

        }

        emptyCoordinate = [Math.trunc(emptyIndex/4),emptyIndex-4*Math.trunc(emptyIndex/4)];

        if(coordinateClick[0]===emptyCoordinate[0]){

            if(coordinateClick[1] === emptyCoordinate[1]-1 || coordinateClick[1]===emptyCoordinate[1]+1){

                matrix[emptyCoordinate[0]][emptyCoordinate[1]].number = matrix[coordinateClick[0]][coordinateClick[1]].number
                matrix[coordinateClick[0]][coordinateClick[1]].number = ''

                for(let i = 0; i < matrix.length; i++){

                    for(let j = 0; j < matrix[i].length; j++){

                        newData.push(matrix[i][j])

                    }

                }

                await this.setState({data: newData})
                await this.checkWin()

            }

        }

        if(coordinateClick[1] === emptyCoordinate[1]){

            if(coordinateClick[0] === emptyCoordinate[0]-1 || coordinateClick[0]===emptyCoordinate[0]+1){

                matrix[emptyCoordinate[0]][emptyCoordinate[1]].number = matrix[coordinateClick[0]][coordinateClick[1]].number
                matrix[coordinateClick[0]][coordinateClick[1]].number = ''

                for(let i = 0; i < matrix.length; i++){

                    for(let j = 0; j < matrix[i].length; j++){

                        newData.push(matrix[i][j])

                    }

                }

                await this.setState({data: newData})
                await this.checkWin()

            }

        }

    }

    checkWin = async ()=>{

        for(let i = 0; i < this.state.data.length - 1; i++){

            if(this.state.data[i].number !== i+1){

                return

            }

        }

        this.setState({gameFinished: true})
        clearInterval(this.timer)
        let newRecordSec = this.state.minutes*60+this.state.seconds
        let newRecord = this.state.minutes+':'+this.state.seconds

        await AsyncStorage.getItem('recordsSec').then(async (recordsSec)=>{

            await AsyncStorage.getItem('records').then((records)=>{

                let recordsSecArr = JSON.parse(recordsSec)
                let recordsArr = JSON.parse(records)

                if(recordsSecArr === null){

                    AsyncStorage.setItem('recordsSec',JSON.stringify([ newRecordSec]))
                    AsyncStorage.setItem('records',JSON.stringify( [ newRecord ,'_ _:_ _', '_ _:_ _']))

                }else {

                    for(let i = 0; i < recordsSecArr.length; i++){

                        if(newRecordSec==recordsSecArr[i]){

                            return

                        }

                    }

                    recordsSecArr.push(newRecordSec);
                    recordsSecArr.sort((a, b) => a - b);
                    recordsSecArr.length = recordsSecArr.length>3?3:recordsSecArr.length
                    for(let i =0; i < recordsSecArr.length; i++){

                        let min = Math.trunc(recordsSecArr[i]/60)
                        let sec = recordsSecArr[i] - min*60

                        recordsArr[i] = min+':'+sec

                    }

                    AsyncStorage.setItem('recordsSec',JSON.stringify(recordsSecArr))
                    AsyncStorage.setItem('records',JSON.stringify(recordsArr))

                }

            })

        })

        Alert.alert(
            'ՀԱՂԹԱՆԱԿ',
            'Խաղա՞լ նորից',
            [
                {text: 'Cancel', onPress: () => {this.props.navigation.navigate('Main')}, style: 'cancel'},
                {text: 'OK', onPress: () => this.startGame()},
            ],
            { cancelable: false }
        )

    }

    swipe = async (val)=>{

        let matrix = [[],[],[],[]];
        let oldData = this.state.data;
        let emptyIndex;
        let emptyCoordinate = [];
        let cordinate;

        for(let i = 0; i < matrix.length; i++){

            let k =  i*4+4;
            for(let j = i*4; j < k; j++){

                matrix[i].push(oldData[j])

            }

        }

        for(let i = 0; i < oldData.length; i++){

            if(oldData[i].number===''){

                emptyIndex = i;

            }

        }

        emptyCoordinate = [Math.trunc(emptyIndex/4),emptyIndex-4*Math.trunc(emptyIndex/4)];

        if(val === 'Up'){

            cordinate = [emptyCoordinate[0]+1,emptyCoordinate[1]]

            if(matrix[cordinate[0]]){

                let item = matrix[cordinate[0]][cordinate[1]]
                let index = cordinate[0]*4+cordinate[1]
                await this.clickItem(item,index)
            }

        }

        if(val === 'Down'){

            cordinate = [emptyCoordinate[0]-1,emptyCoordinate[1]]

            if(matrix[cordinate[0]]){

                let item = matrix[cordinate[0]][cordinate[1]]
                let index = cordinate[0]*4+cordinate[1]
                await this.clickItem(item,index)
            }

        }

        if(val === 'Left'){

            cordinate = [emptyCoordinate[0],emptyCoordinate[1]+1]

            if(matrix[cordinate[1]]){

                let item = matrix[cordinate[0]][cordinate[1]]
                let index = cordinate[0]*4+cordinate[1]
                await this.clickItem(item,index)
            }

        }

        if(val === 'Right'){

            cordinate = [emptyCoordinate[0],emptyCoordinate[1]-1]

            if(matrix[cordinate[1]]){

                let item = matrix[cordinate[0]][cordinate[1]]
                let index = cordinate[0]*4+cordinate[1]
                await this.clickItem(item,index)
            }

        }

    }

    render(): React.ReactNode {

        const {
            container
        } = Styles

        const {
            loaderVisible,
            seconds,
            minutes,
            fadeAnim,
            data
        } = this.state

        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 50
        };

        return (
            <GestureRecognizer
                style={container}
                config={config}
                onSwipeUp={() => this.swipe('Up')}
                onSwipeDown={() => this.swipe('Down')}
                onSwipeLeft={() => this.swipe('Left')}
                onSwipeRight={() => this.swipe('Right')}
            >

                <StatusBar hidden={true}/>

                {!loaderVisible ?
                    <Layout>

                        <TimerContainer>

                            <Time seconds={seconds} minutes={minutes} fadeAnim={fadeAnim}/>

                        </TimerContainer>

                        <GameBoard fadeAnim={fadeAnim}>

                            <CubeList data={data} clickItem={this.clickItem}/>

                        </GameBoard>

                    </Layout> :
                    <Layout>

                        <ActivityIndicator size={70} color={'rgb(70,23,4)'}/>

                    </Layout>}

            </GestureRecognizer>
        )

    }

}

export default Game