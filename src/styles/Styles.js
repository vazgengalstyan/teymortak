import {StyleSheet} from 'react-native';
import {w,h} from "../constants";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fullWidthHeight: {
        width: '100%',
        height: '100%'
    },
    contentCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        width: w-80,
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
    row: {
        flexDirection: 'row'
    }
})

export default Styles