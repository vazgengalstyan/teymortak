import React from 'react'
import {View, TouchableWithoutFeedback} from 'react-native'
import Styles from '../styles/Styles'
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

const PopUp = ({visibleModal,setModalVisible}) => {

    const {containerDialog,popUpCloseButton,contentCenter} = Styles

    return (

        <View>

            <Dialog
                visible={visibleModal}
                dialogAnimation={new SlideAnimation()}
                onTouchOutside={() => {setModalVisible(false)}}
                dialogStyle={{width: '60%',height: '30%'}}
            >

                <DialogContent style={containerDialog}>

                    <TouchableWithoutFeedback onPress={()=>{setModalVisible(false)}}>

                        <View style={[popUpCloseButton,contentCenter]}>

                            <Icon name={'close'} color={'rgb(70,23,4)'} size={20}/>

                        </View>

                    </TouchableWithoutFeedback>

                </DialogContent>

            </Dialog>

        </View>
    )

}

export {PopUp}