'use strict'


var gCurrLang = 'en';

const gTrans = {
    flexible: {
        en: `I'm Flexible!`,
        he: 'אני גמיש!'
    },
    gallery: {
        en: `Gallery`,
        he: 'גלריה'
    },
    memes: {
        en: `Memes`,
        he: 'ממים'
    },
    about: {
        en: `About`,
        he: 'אודות'
    },
    search: {
        en: `search by topic`,
        he: 'חפש לפי קטגוריה'
    },
    'download-meme': {
        en: `Download Meme`,
        he: 'הורד מם'
    },
    'upload-meme': {
        en: `Upload meme`,
        he: 'העלה מם'
    },
    'save-meme': {
        en: `Save Meme`,
        he: 'שמור מם'
    },
    'own-img': {
        en: `Use your own image!`,
        he: 'השתמש בתמונה משלך!'
    },
    'my-name': {
        en: `Ben Isayev`,
        he: 'בן איסייב'
    },
    'my-about': {
        en: `Hi. I am Ben, born and raised in Israel, born on 15th of April 1997, I created this meme generator as a project of a programming course I am at called Coding Academy, I hope you like it!`,
        he: 'היי, אני בן, נודלתי וגדלתי בישראל, נולדתי ב15 לאפריל 1997, אני יצרתי את יוצר הממים הזה בתור פרויקט בקורס תכנות שאני נמצא בו שנקרא קודינג אקדמי, מקווה שאהבתם!'
    },
    'rights': {
        en: `All rights reserved 2022`,
        he: 'כל הזכויות שמורות 2022'
    },
}



function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = txt
        } else el.innerText = txt
    })
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans.en;

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}