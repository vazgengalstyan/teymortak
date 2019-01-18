import React from 'react'
import Styles from '../styles/Styles'
import {FlatList, TouchableWithoutFeedback, View, Text} from "react-native";

const CubeList = ({data, clickItem}) => {

    const {containerCube, contentCenter , textCube} = Styles

    const _renderItem = ({item,index}) => (

        <TouchableWithoutFeedback onPress={()=>{clickItem(item,index)}}>

            <View style={[containerCube,contentCenter,item.number === ''?{backgroundColor: 'transparent'}:null]}>

                <Text style={textCube}>{item.number}</Text>

            </View>

        </TouchableWithoutFeedback>

    );

    return (

        <FlatList
            data={data}
            numColumns={4}
            renderItem={_renderItem}
            keyExtractor={(item, index) => item.number}
        />

    )

}

export {CubeList}