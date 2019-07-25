import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as CONSTANTS from '../../common/constants.js';
import * as SHARED from '../../common/shared.js';
import * as WEB from '../../common/web.js';

class CustomCardContainer extends Component {
    constructor(props) {
        super(props);
        WEB.dataGet(); // 1st thing page load = get data
        this.state = {
            isLoading: true,
            randomImage: '',
            message: '',
            imageLink: '',
            data: [],
          };

    }

    imgError(image) {
        image.style = 'maxWidth: 350, maxHeight: 350, width: 200, height: 200';
        image.src = 'https://storage.googleapis.com/gcs.hostbin.co/public/images/error_image.png';
        return true;
    }

    componentDidMount() {        
        document.title = CONSTANTS.UI_TITLE
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
    const { isLoaded, imageLink, message } = this.state
        if(!this.state.imageLink) { 
            return (
                <div> 
                    <button 
                    className='buttonStyle textStyle'
                    onClick={() => { SHARED.appCheck('web') }}> 
                        <div className='textStyle'>{CONSTANTS.UI_BUTTON}</div>
                    </button>
                    <div className='stylesCenter'>{this.state.message}</div>
                </div>
                );
        } else { 
            return (
                <div>
                    <button 
                    className='buttonStyle textStyle'
                    onClick={() => { SHARED.appCheck('web') }}>
                        <div className='textStyle'>{CONSTANTS.UI_BUTTON}</div>
                    </button>
                    <div className='stylesCenter'>{this.state.message}</div>
                    {/* <div className='stylesCenter'>{this.state.imageLink}</div> */}
                    <img src={this.state.imageLink} alt='' className='imgCenter' onError={(e)=>e.target.setAttribute('src','https://storage.googleapis.com/gcs.hostbin.co/public/images/not_available.svg')} />

                    <div className='stylesCenter textFooter'><a href='https://contactstoolkit.com/legal/fair-use.html' target='_blank' rel='noopener noreferrer'>{CONSTANTS.UI_FAIR_USE}</a></div>

                </div>
            );
        }
  }
}

export default CustomCardContainer