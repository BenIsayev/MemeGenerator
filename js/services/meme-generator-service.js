'use strict'


var meme;
var isSecondLine = true;
// const gImgs = [
//     { id: 1, url: 'img/memes/1.jpg', keywords: ['politics', 'funny'] },
//     { id: 2, url: 'img/memes/2.jpg', keywords: ['sweet', 'pet'] },
//     { id: 3, url: 'img/memes/3.jpg', keywords: ['sweet', 'baby'] },
//     { id: 4, url: 'img/memes/4.jpg', keywords: ['pet', 'cat'] },
//     { id: 5, url: 'img/memes/5.jpg', keywords: ['baby', 'funny'] },
//     { id: 6, url: 'img/memes/6.jpg', keywords: ['funny'] },
//     { id: 7, url: 'img/memes/7.jpg', keywords: ['funny', 'baby'] },
//     { id: 8, url: 'img/memes/8.jpg', keywords: ['funny'] },
//     { id: 9, url: 'img/memes/9.jpg', keywords: ['funny', 'baby'] },
//     { id: 10, url: 'img/memes/10.jpg', keywords: ['funny', 'politics'] },
//     { id: 11, url: 'img/memes/11.jpg', keywords: ['funny'] },
//     { id: 12, url: 'img/memes/12.jpg', keywords: ['funny'] },
//     { id: 13, url: 'img/memes/13.jpg', keywords: ['funny', 'famous'] },
//     { id: 14, url: 'img/memes/14.jpg', keywords: ['funny', 'famous'] },
//     { id: 15, url: 'img/memes/15.jpg', keywords: ['funny', 'famous'] },
//     { id: 16, url: 'img/memes/16.jpg', keywords: ['funny', 'famous'] },
//     { id: 17, url: 'img/memes/17.jpg', keywords: ['politics', 'famous'] },
//     { id: 18, url: 'img/memes/18.jpg', keywords: ['funny', 'famous'] },
// ];
const gImgs = [
    { id: 1, url: 'img/memes/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/memes/2.jpg', keywords: ['funny', 'politics'] },
    { id: 3, url: 'img/memes/3.jpg', keywords: ['sweet', 'pet'] },
    { id: 4, url: 'img/memes/4.jpg', keywords: ['funny', 'baby'] },
    { id: 5, url: 'img/memes/5.jpg', keywords: ['baby', 'pet', 'sweet'] },
    { id: 6, url: 'img/memes/6.jpg', keywords: ['sweet', 'pet', 'cat'] },
    { id: 7, url: 'img/memes/7.jpg', keywords: ['funny', 'famous'] },
    { id: 8, url: 'img/memes/8.jpg', keywords: ['funny', 'baby'] },
    { id: 9, url: 'img/memes/9.jpg', keywords: ['funny', 'famous'] },
    { id: 10, url: 'img/memes/10.jpg', keywords: ['funny'] },
    { id: 11, url: 'img/memes/11.jpg', keywords: ['funny', 'famous'] },
    { id: 12, url: 'img/memes/12.jpg', keywords: ['funny', 'famous'] },
    { id: 13, url: 'img/memes/13.jpg', keywords: ['funny', 'sweet'] },
    { id: 14, url: 'img/memes/14.jpg', keywords: ['funny', 'famous', 'politics'] },
    { id: 15, url: 'img/memes/15.jpg', keywords: ['funny', 'baby', 'sweet'] },
    { id: 16, url: 'img/memes/16.jpg', keywords: ['funny', 'sweeet', 'pet'] },
    { id: 17, url: 'img/memes/17.jpg', keywords: ['politics', 'famous'] },
    { id: 18, url: 'img/memes/18.jpg', keywords: ['funny', 'famous'] },
    { id: 19, url: 'img/memes/19.jpg', keywords: ['funny', 'famous'] },
    { id: 20, url: 'img/memes/20.jpg', keywords: ['famous'] },
    { id: 21, url: 'img/memes/21.jpg', keywords: ['funny', 'famous'] },
    { id: 22, url: 'img/memes/22.jpg', keywords: ['funny', 'famous'] },
    { id: 23, url: 'img/memes/23.jpg', keywords: ['funny', 'famous'] },
    { id: 24, url: 'img/memes/24.jpg', keywords: ['politics', 'famous'] },
    { id: 25, url: 'img/memes/25.jpg', keywords: ['funny', 'famous'] },
    { id: 26, url: 'img/memes/26.jpeg', keywords: ['funny', 'famous'] },
];

var gKeywordSearchCountMap = { 'funny': 1, 'cat': 1, 'baby': 1, 'politics': 1, 'sweet': 1, 'pet': 1, 'famous': 1 }

function getKeyWords() {
    return gKeywordSearchCountMap;
}

function filterBy(word) {
    if (!gKeywordSearchCountMap[word]) return;
    gKeywordSearchCountMap[word]++;
}

function getImgsByFilter(word) {
    return gImgs.filter(img => img.keywords.includes(word))
}

function getMeme() {
    meme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Texty Text',
            size: 30,
            align: 'center',
            strokeColor: 'black',
            fillColor: 'white',
            font: 'Impact',
            location: { x: gElCanvas.width / 2, y: gElCanvas.height * 0.3 }
        }]
    }
    return meme;
}


function addLine() {
    const posY = isSecondLine ? (gElCanvas.height * 0.9) : (gElCanvas.height / 2);
    if (meme.lines.length === 0) {
        meme.selectedLineIdx = 0;
    } else meme.selectedLineIdx++;
    meme.lines.push({
        txt: 'New text',
        size: 30,
        align: 'center',
        strokeColor: 'white',
        fillColor: 'black',
        font: 'Impact',
        location: { x: gElCanvas.width / 2, y: posY }
    })
    meme.selectedLineIdx = meme.lines.length - 1;
    isSecondLine = false;
}

function getClickedText(clickedPos) {
    return meme.lines.findIndex(line => {
        const pos = line.location
        var txtLength = gCtx.measureText(line.txt).width
        switch (line.align) {
            case 'left':
                return (clickedPos.x >= pos.x && clickedPos.x <= pos.x + txtLength && clickedPos.y <= pos.y && clickedPos.y >= pos.y - line.size);
            case 'right':
                return (clickedPos.x <= pos.x && clickedPos.x >= pos.x - txtLength && clickedPos.y <= pos.y && clickedPos.y >= pos.y - line.size);
            case 'center':
                return (clickedPos.x <= pos.x + (txtLength / 2) && clickedPos.x >= pos.x - (txtLength / 2) && clickedPos.y <= pos.y && clickedPos.y >= pos.y - line.size);
        }
    })
}


function addSticker(sticker) {
    if (meme.lines.length === 0) {
        meme.selectedLineIdx = 0;
    } else meme.selectedLineIdx++
        meme.lines.push({
            txt: sticker,
            size: 30,
            align: 'center',
            strokeColor: 'black',
            fillColor: 'white',
            font: 'Impact',
            location: { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        })
    meme.selectedLineIdx = meme.lines.length - 1;
}

function deleteLine() {
    meme.lines.splice(meme.selectedLineIdx, 1);
    meme.selectedLineIdx = 0;
}


function getImgById(id) {
    return gImgs.find(img => img.id === id);
}

function getImgs() {
    return gImgs;
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme';
}