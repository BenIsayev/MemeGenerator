'use strict'



function saveToStorage(key, value) {
    const str = JSON.stringify(value);
    localStorage.setItem(key, str);
}


function loadFromStorage(key) {
    const str = localStorage.getItem(key)
    const val = JSON.parse(str)
    return val;
}