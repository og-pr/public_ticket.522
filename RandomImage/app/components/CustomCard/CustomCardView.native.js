import React, { Component } from 'react'
import { 
    Text, 
    View, 
    Image, 
    Linking, 
    Platform,
    StyleSheet, 
    Dimensions, 
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../../common/style';
import Title from '../Title';
import CustomButton from '../CustomButton';
import * as MOBILE from '../../common/mobile.js';
import * as SHARED from '../../common/shared.js';
import * as CONSTANTS from '../../common/constants.js';

class CustomCardContainer extends Component {
    constructor(props) {
        super(props);
        var noVar
        MOBILE.dataGet(); // 1st thing page load = get data
        this.state = {
            imageLoading: true,
            randomImage: '',
            message: '',
            imageLink: '',
            data: [],
          };
    }

    onImageError(error) {
        this.setState({ 
        	imageLoading: false,
        	imageLink: 'https://storage.googleapis.com/gcs.hostbin.co/public/images/errorImage.png'
        })
    }

    componentDidMount() {
        // inspiration = https://stackoverflow.com/questions/31856712/update-component-state-from-outside-react-on-server-response
        SHARED.rnGlobal.cbmessage = (data) => {
            this.setState({ message: data});
        };
        SHARED.rnGlobal.cbimage = (data) => {
            this.setState({ imageLink: data});
        };

        if (this.state.imageLink==='') {
            this.setState({ message: CONSTANTS.UI_GETTING});
            setTimeout(function () { SHARED.uiClear() }, 150); 
        }
    }
    
    render() {
    const { imageLoading, imageLink, message } = this.state
        if(!this.state.imageLink) { 
            return (
			    <View style={Styles.container}>
			        <Title />

                    <CustomButton 
                      buttonTitle={CONSTANTS.UI_BUTTON}
                      onPress={ () => { SHARED.appCheck('mobile') }}
                    />

            	    <View style={Styles.container}>
            			<Text style={[Styles.textUi]}>{this.state.message}</Text>
                    </View>
		        </View>
                );
        } else { 
            return (
			    <View style={Styles.container}>
			        <Title />

                    <CustomButton 
                      onPress={ () => { SHARED.appCheck('mobile') }}
                      buttonTitle={CONSTANTS.UI_BUTTON}
                    />

    			    <View style={Styles.container}>
                    <Text style={[Styles.textUi]}>{this.state.message}</Text>
                    </View>

			         <View style={Styles.imageContainer}>
	                {/* 2nd imageLink + Styles.imageError used by onImageError ; using same style for error image. if imageError used = cannot be reset */}
                    <Image 
					source = { this.state.imageLoading ? { uri: this.state.imageLink } : { uri: this.state.imageLink } } 
					style = { this.state.imageLoading ? Styles.imageCenter : Styles.imageCenter }
                    onError = {this.onImageError.bind(this)} 
                    alt='' />
                    </View>

                    <Text style={Styles.textFooter} onPress={ ()=> Linking.openURL( CONSTANTS.URL_FAIR_USE ) } >{CONSTANTS.UI_FAIR_USE}</Text>

                </View>
            );
        }
  }
}

export default CustomCardContainer