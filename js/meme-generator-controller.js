'use strict'

window.addEventListener("load", init)
var gElCanvas = document.querySelector('canvas')
var gCtx = gElCanvas.getContext('2d')
var meme = getMeme()
var isMoving = false;

function init() {
    renderGallery();
    addEventListeners();
}

function renderGallery() {
    const IMGS = getImgs();
    var imgsHTMLs = IMGS.map(img => {
        return `<img src="${img.url}" onclick="onImgClick(${img.id})" class="img-${img.id}">`
    })
    document.querySelector('.main-gallery-container').innerHTML = imgsHTMLs.join('');
}

function renderEditor(id) {
    meme.selectedImgId = id;
    // renderImgCanvas(id)
    reRenderCanvas()
}

function renderImgCanvas(id) {
    const IMG = document.querySelector(`.img-${id}`)
    gElCanvas.width = 500
    gElCanvas.height = 500
    gCtx.drawImage(IMG, 0, 0, gElCanvas.width, gElCanvas.height);
}

function reRenderCanvas() {
    renderImgCanvas(meme.selectedImgId);
    document.querySelector('[name="meme-text"]').value = meme.lines[meme.selectedLineIdx].txt;
    meme.lines.forEach(line => {
        writeText(line);
    })
}

function onDownloadMeme(elDownload) {
    downloadCanvas(elDownload);
}

function onImgClick(id) {
    renderEditor(id);
    meme.selectedImgId = id;
    document.querySelector('.main-gallery').classList.add('hide');
    document.querySelector('.main-editor').classList.remove('hide');

}

function writeText(line) {
    // debugger
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fillColor;
    gCtx.textAlign = line.align;
    gCtx.font = `${line.size}px ${line.font}`;
    // debugger
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

}