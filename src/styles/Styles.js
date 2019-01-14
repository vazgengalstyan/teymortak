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
        width: w-80
    }
})

export default Styles