import React from 'react'
import {View, TouchableWithoutFeedback, Text} from 'react-native'
import Styles from '../styles/Styles'
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

const PopUp = ({visibleModal,setModalVisible,records}) => {

    const {
        containerDialog,
        popUpCloseButton,
        contentCenter,
        popUpItem,
        row,
        popUpItemText,
        marginRight10,
        fontSize24
    } = Styles

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

                    <View style={[popUpItem,row]}>

                        <View style={[contentCenter,{width: '30%'}]}>

                            <Text style={[popUpItemText,marginRight10]}>1.</Text>

                        </View>

                        <View style={[contentCenter,{width: '60%'}]}>

                            <Text style={[popUpItemText,fontSize24]}>{records[0]}</Text>

                        </View>

                    </View>

                    <View style={[popUpItem,row]}>

                        <View style={[contentCenter,{width: '30%'}]}>

                            <Text style={[popUpItemText,marginRight10]}>2.</Text>

                        </View>

                        <View style={[contentCenter,{width: '60%'}]}>

                            <Text style={[popUpItemText,fontSize24]}>{records[1]}</Text>

                        </View>

                    </View>

                    <View style={[popUpItem,row]}>

                        <View style={[contentCenter,{width: '30%'}]}>

                            <Text style={[popUpItemText,marginRight10]}>3.</Text>

                        </View>

                        <View style={[contentCenter,{width: '60%'}]}>

                            <Text style={[popUpItemText,fontSize24]}>{records[2]}</Text>

                        </View>

                    </View>

                </DialogContent>

            </Dialog>

        </View>
    )

}

export {PopUp}