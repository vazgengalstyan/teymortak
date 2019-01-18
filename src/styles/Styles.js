import {StyleSheet} from 'react-native';
import {w, h} from "../constants";

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        width: w - 80,
        height: 150
    },
    buttonMain: {
        borderWidth: 5,
        borderRadius: 10,
        marginHorizontal: 20,
        borderColor: 'rgb(70,23,4)',
        backgroundColor: 'rgb(224,183,127)',
        width: 60,
        height: 60
    },
    buttonSound: {
        borderWidth: 3,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 20,
        borderColor: 'rgb(70,23,4)',
        backgroundColor: 'rgb(224,183,127)',
        width: 40,
        height: 40
    },
    buttonSoundContainer: {
        position: 'absolute',
        zIndex: 10,
        top: 0,
        right: 0
    },
    row: {
        flexDirection: 'row'
    },
    containerDialog: {
        backgroundColor: 'rgb(224,183,127)',
        borderWidth: 5,
        borderRadius: 8,
        borderColor: 'rgb(70,23,4)',
        height: '100%',
        position: 'relative'
    },
    popUpCloseButton: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: -6,
        right: -6,
        zIndex: 10,
        backgroundColor: 'rgb(224,183,127)',
        borderWidth: 3,
        borderRadius: 90,
        borderColor: 'rgb(70,23,4)',
        elevation: 8
    },
    popUpItem: {
        height: '33%',
        width: '100%',
        marginTop: '3.3%',
        alignItems: 'center'
    },
    popUpItemText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgb(70,23,4)'
    },
    marginRight10: {
        marginRight: 20
    },
    fontSize24: {
        fontSize: 24
    },
    BoardGame: {
        width: w-30,
        height: w-30,
        backgroundColor: 'rgb(224,183,127)',
        borderWidth: 5,
        borderColor: 'rgb(70,23,4)'
    },
    positionAbsoluteContainer: {
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 5
    },
    timeStyle: {
        color: 'rgb(70,23,4)',
        fontSize: 50,
        fontWeight: 'bold'
    },
    containerCube: {
        width: (w-56)/4,
        height: (w-56)/4,
        margin: 2,
        backgroundColor: 'rgb(70,23,4)'
    },
    textCube: {
        color: 'rgb(224,183,127)',
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default Styles