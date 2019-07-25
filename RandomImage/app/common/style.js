import React, { 
    Platform, 
    Dimensions, 
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback, 
} from 'react-native'

const win = Dimensions.get('window');

let imageHeight = Math.round( (win.height * 0.65) );
let imageWidth = Math.round( (win.width * 0.65) );

const Styles = StyleSheet.create({
    container: {
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        height: Platform.OS === 'ios' ? 70 : 10,
        marginTop: Platform.OS === 'ios' ? 10 : 10,
            ...Platform.select({
              ios: { backgroundColor: '#fff', paddingTop: 24},
              android: { backgroundColor: '#fff'}
            }),
            alignItems: 'center',
            justifyContent: 'center'
    },
    text: {
        fontWeight: Platform.OS === 'ios' ? '400' : '400',
        color: '#000',
        fontSize: 32,
    },
    imageCenter: {
        aspectRatio: 1.5,
        resizeMode: 'contain',
        minWidth: 200,
        minHeight: 200,
        maxWidth: 350,
        maxHeight: 350,
        width: imageWidth, 
        height: imageHeight,
    },
    imageContainer: {
        bottom: Platform.OS === 'ios' ? 15 : -10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageError: { 
        maxWidth: 200,
        maxHeight: 200,
        width: 200,
        height: 200,
    },
    textUi: {
        top: Platform.OS === 'ios' ? -8 : 10,
        fontSize: Platform.OS === 'ios' ? 12 : 14,
    },
    textRegular: {
        alignItems: 'center',
        alignSelf: 'center',
        color: '#000',
        fontSize: 18,
    },
    textFooter: {
        color: '#000',
        fontSize: 14,
        bottom: Platform.OS === 'ios' ? -45 : -40,
        alignSelf: 'center',
        textAlign: 'center',
    },
    textBlock: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    }
})

export default Styles;