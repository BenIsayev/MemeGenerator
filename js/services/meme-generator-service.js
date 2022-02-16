'use strict'

const gImgs = [
    { id: 1, url: 'img/memes/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/memes/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/memes/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/memes/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/memes/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/memes/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/memes/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/memes/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/memes/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img//memes/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img//memes/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img//memes/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img//memes/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img//memes/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img//memes/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img//memes/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'img//memes/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'img//memes/18.jpg', keywords: ['funny', 'cat'] },
];


var meme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Texty Text',
        size: 20,
        align: 'center',
        strokeColor: 'black',
        fillColor: 'black',
        font: 'Impact',
        location: { x: 250, y: 100 }
    }]
}

// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
function addLine() {
    if (meme.lines.length === 0) {
        meme.selectedLineIdx = 0;
    } else meme.selectedLineIdx++
        meme.lines.push({
            txt: 'New text',
            size: 20,
            align: 'center',
            strokeColor: 'black',
            fillColor: 'black',
            font: 'Impact',
            location: { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        })
}

function deleteLine() {
    meme.lines.splice(meme.selectedLineIdx, 1);
    if (meme.lines.length === 0) return;
    meme.selectedLineIdx--;
}

function getMeme() {
    return meme;
}

function getImgById(id) {
    return gImgs.find(img => img.id === id);
}

function getImgs() {
    return gImgs;
}