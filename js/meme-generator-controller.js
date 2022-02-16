'use strict'

window.addEventListener("load", init)
var gElCanvas = document.querySelector('canvas')
var gCtx = gElCanvas.getContext('2d')
var meme;
var gImg;
var gCurrId;
var isFirstGen = true;
var isMoving = false;

function init() {
    renderGallery();
    meme = getMeme();
    addEventListeners();
    renderKeyWords()
}


function renderKeyWords() {
    var keyWords = getKeyWords()
    var keyWordsHTMLs = []
    for (const word in keyWords) {
        keyWordsHTMLs.push(`<a onclick="onFilterBy('${word}')" style="font-size: ${keyWords[word]+16}px" href=#>${word}</a>`)
    }
    document.querySelector('.key-words').innerHTML = keyWordsHTMLs.join('');
}

function renderGallery() {
    document.querySelector('.main-gallery').classList.remove('hide');
    document.querySelector('#about').classList.remove('hide');
    document.querySelector('.main-editor').classList.add('hide');
    const IMGS = getImgs();
    var imgsHTMLs = IMGS.map(img => {
        return `<img src="${img.url}" onclick="onImgClick(${img.id})" class="img-${img.id}">`
    })
    document.querySelector('.main-gallery-container').innerHTML = imgsHTMLs.join('');
}

function renderEditor(id) {
    reRenderCanvas(id)
}

function renderImgCanvas() {
    var img = new Image()
    var imgUrl = getImgById(gCurrId).url
    console.log(meme)
    img.src = imgUrl;
    if (isFirstGen) meme.lines[0].location.x = img.width / 2
    isFirstGen = false;
    gElCanvas.width = img.width
    gElCanvas.height = img.height
        // img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        // meme.lines.forEach(line => {
        //         writeText(line);
        //     })
        // }
    gCtx = gElCanvas.getContext('2d')
}

function reRenderCanvas(id) {
    renderImgCanvas(id);
    // meme = getMeme()
    meme.lines.forEach(line => {
        writeText(line);
    })
    document.querySelector('[name="meme-text"]').value = meme.lines[meme.selectedLineIdx].txt;
}

function renderGalleryByFilter(word) {
    const IMGS = getImgsByFilter(word);
    console.log(IMGS)
    var imgsHTMLs = IMGS.map(img => {
        return `<img src="${img.url}" onclick="onImgClick(${img.id})" class="img-${img.id}">`
    })
    document.querySelector('.main-gallery-container').innerHTML = imgsHTMLs.join('');
    if (!imgsHTMLs.length) renderGallery();
}

function onFilterBy(word) {
    filterBy(word);
    renderKeyWords();
    renderGalleryByFilter(word);
}

function onDownloadMeme(elDownload) {
    downloadCanvas(elDownload);
}

function onImgClick(id) {
    isFirstGen = true;
    gCurrId = id
    renderEditor(id);
    document.querySelector('.main-gallery').classList.add('hide');
    document.querySelector('#about').classList.add('hide');
    document.querySelector('.main-editor').classList.remove('hide');
    // meme = getMeme()
    meme.selectedImgId = id;
}

function writeText(line) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fillColor;
    gCtx.textAlign = line.align;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.strokeText(line.txt, line.location.x, line.location.y);
    gCtx.fillText(line.txt, line.location.x, line.location.y);
}

function onAddLine() {
    addLine();
}

function onDeleteLine() {
    deleteLine();
    reRenderCanvas();
}

function onAddSticker(sticker) {
    addSticker(sticker);
    reRenderCanvas();
}

function onChangeTextSelected() {
    if (meme.selectedLineIdx === meme.lines.length - 1) meme.selectedLineIdx = 0;
    else meme.selectedLineIdx++;
    reRenderCanvas();
}

function onTextWrite(txt) {
    meme.lines[meme.selectedLineIdx].txt = txt;

}

function onChangeFont(font) {
    meme.lines[meme.selectedLineIdx].font = font;
}

function onChangeStroke(strokeColor) {
    meme.lines[meme.selectedLineIdx].strokeColor = strokeColor;
}

function onChangeFill(fillColor) {
    meme.lines[meme.selectedLineIdx].fillColor = fillColor;
}

function increaseFont() {
    meme.lines[meme.selectedLineIdx].size++
}

function decreaseFont() {
    meme.lines[meme.selectedLineIdx].size--
}

function setTextLocation(pos) {
    meme.lines[meme.selectedLineIdx].align = pos;

}

function addEventListeners() {
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}

function onMove(ev) {
    if (!isMoving) return
    var pos = getEvPos(ev)
    meme.lines[meme.selectedLineIdx].location = pos;
    reRenderCanvas();
}

function onDown(ev) {
    var pos = getEvPos(ev);
    var clickedTextIdx = getClickedText(pos)
    if (clickedTextIdx === -1) return;
    meme.selectedLineIdx = clickedTextIdx;
    isMoving = true;
    document.body.style.cursor = 'grabbing'
    reRenderCanvas();
}

function onUp(ev) {
    isMoving = false;
    document.body.style.cursor = 'default'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos
}

function openGallery() {
    document.querySelector('.main-gallery').classList.remove('hide');
    document.querySelector('.main-editor').classList.add('hide');
    document.querySelector('#about').classList.remove('hide');


}