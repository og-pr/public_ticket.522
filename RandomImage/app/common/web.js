// Avoid circular dependency = only load what is needed
import * as CONSTANTS from '../common/constants.js';

export const dataGet = () => {
    const url = CONSTANTS.URL_DATA;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
           this.dataSave(result);
        },
        (error) => {
        }
      )
    return
}

export const dataSave = (someData) => {
    var now = Date.now();
    var today = new Date();
    localStorage.setItem("o.old.now", now);
    localStorage.setItem("o.utc", today);
    localStorage.setItem("o.list", JSON.stringify(someData));
}

export const clearLs = () => {
    localStorage.removeItem('o.list'); 
    localStorage.removeItem('o.old.now'); 
    localStorage.removeItem('o.utc'); 
}