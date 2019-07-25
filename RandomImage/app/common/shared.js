import * as WEB from '../common/web.js';
import * as MOBILE from '../common/mobile.js';
import * as CONSTANTS from '../common/constants.js';

export const rnGlobal = {} // for RN this.state

export const appCheck = (theApp) => {
    MOBILE.jsGlobal.device = theApp
    if (MOBILE.jsGlobal.device === 'mobile') {
        MOBILE.step2();
        setTimeout( () => iWaitFor(MOBILE.jsGlobal.ls1, iCheckFive(MOBILE.jsGlobal.ls1,theApp) ), 150);
        return
    }
    if (MOBILE.jsGlobal.device === 'web') {
        var temp = localStorage.getItem('o.list');
        var oldNow = localStorage.getItem('o.old.now');
        iCheckFive(oldNow,theApp)
    }
}

export const iCheckFive = (aoldNow, aDevice) => {
    var now = Date.now();
    var today = new Date();
    var ONE_MIN = 1*60*1000;
    var FIVE_MIN = 1*60*1000;
    var oldDate = new Date(+aoldNow);
    var timeMath = now - oldDate;
    if (timeMath > FIVE_MIN) {
        MOBILE.jsGlobal.dataStatus = CONSTANTS.DATA_YES
        if(MOBILE.jsGlobal.device === 'mobile') {
            uiMessage(CONSTANTS.UI_FRESH_DATA)
            MOBILE.dataGet();
            iGetRandom()
            uiClear(); 
        } else if(MOBILE.jsGlobal.device === 'web') {
            uiMessage(CONSTANTS.UI_FRESH_DATA)
            WEB.dataGet();                
            iGetRandom()
            uiClear(); 
       }
    } else {
        iDataCache();
    }
    return
}

export const iDataCache = () => { 
    const uiMsg = CONSTANTS.UI_CACHE
    uiMessage(uiMsg)
    var temp = [];
    if(MOBILE.jsGlobal.device === 'mobile') {
        iGetRandom()
    } else {
        iGetRandom()
   }
}

export const iGetRandom = () => {
    var aTemp, lsTemp = [];
    var randomFile, theData, aFile, imageFile, imgLink;
    var temp, temp2, temp3, temp4;
    let oldData = [CONSTANTS.VAR_LS3];
    if(MOBILE.jsGlobal.device === 'mobile') {
        temp = MOBILE.jsGlobal.ls3 
        temp2 = JSON.parse(temp);
        aTemp = iShuffle(temp2);
        aFile = aTemp.splice(0, 1); 
        theData = iShuffle(aTemp);
        temp3 = JSON.stringify(theData)
        MOBILE.lsStore(CONSTANTS.VAR_LS3, temp3);
    } else {
        lsTemp = JSON.parse(localStorage.getItem('o.list'));
        aTemp = iShuffle(lsTemp);
        aFile = aTemp.splice(0, 1);
        theData = iShuffle(aTemp);
        localStorage.setItem("o.list", JSON.stringify(theData)); 
   }
    imageFile = aFile[0].replace(/ /g,'%20');
    temp4 = CONSTANTS.URL_PREFIX
    imgLink = temp4.concat(imageFile, CONSTANTS.URL_SUFFIX);
    rnGlobal.cbimage(imgLink);
}

// Shuffle > Random aka Shuffle is better
export const iShuffle = (array) => {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

// Technical debt ?
export const iWaitFor = (aKey, callback) => {
    if (aKey === undefined) {
        console.log('var not defined')
    } else {
        console.log('@ iWaitFor reminder = above executed via callback')
    }
}

export const uiClear = () => {
    setTimeout(function () { uiMessage(''); }, 400);
}

export const uiMessage = (aMsg) => {
    setTimeout(function () { rnGlobal.cbmessage(aMsg); }, 700);
}
