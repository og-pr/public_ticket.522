import AsyncStorage from '@react-native-community/async-storage';

// Avoid circular dependency = only load what is needed
import * as CONSTANTS from '../common/constants.js';

export const jsGlobal = {}

export const dataGet = () => {
  const url = CONSTANTS.URL_DATA;
  fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
         dataSave(result);
      },
      (error) => {
      }
    )
}

export const dataSave = (someData) => {
  var now = Date.now();
  var today = new Date();
  lsStore("o.old.now", now);
  lsStore("o.utc", today);
  lsStore("o.list", JSON.stringify(someData));
  step1();
}

export const lsAll = async => { 
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        return true;
      });
    });
  });
}

export const lsCheck = async (aKey) => {
  try {
    const value = await AsyncStorage.getItem(aKey) || 'none';
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.log('LS check error - can not read ' +error)
  }
}

export const lsClear = async (keys) => {
  AsyncStorage.multiRemove(keys, (err) => {
  })
}

export const lsGet = async (aKey) => {
  try {
    const value = await AsyncStorage.getItem(aKey) || 'none';
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (error) {
      console.log('LS error - can not read \n' +error)
      return null
  }
}

export const lsGetAny = async (aKey) => {
  let lsAny = await lsGet(aKey)
  return lsAny               
}

export const lsStore = async (aKey, aValue) => {
  try {
    await AsyncStorage.setItem(aKey, JSON.stringify(aValue));
  } catch (error) {
    console.log('LS error - can not save \n' +error)
  }
}

// setup
export const step1 = async () => {
    let temp1 = await lsGetAny(CONSTANTS.VAR_LS1);
    let temp2 = await lsGetAny(CONSTANTS.VAR_LS2);
    let temp3 = await lsGetAny(CONSTANTS.VAR_LS3);
    jsGlobal.ls1 = temp1
    jsGlobal.ls2 = temp2    
    jsGlobal.ls3 = temp3
    console.log('end step 1')
}

// stub - in case extra data processing needed
export const step2 = async () => {
  await step1();
  console.log('end step 2')
}
