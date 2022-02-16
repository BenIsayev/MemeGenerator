'use strict'

window.addEventListener("load", init)
var gElCanvas = document.querySelector('canvas')
var gCtx = gElCanvas.getContext('2d')

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}

function init() {
    renderGallery();
}

function renderGallery() {
    const IMGS = getImgs();
    var imgsHTMLs = IMGS.map(img => {
        return `<img src="${img.url}" onclick="onImgClick(${img.id})" class="img-${img.id}">`
    })
    document.querySelector('.main-gallery-container').innerHTML = imgsHTMLs.join('');
}

function renderEditor(id) {
    var img = getImgById(id);
    gMeme.selectedImgId = id;
    renderImgCanvas(id)
}

function renderImgCanvas(id) {
    const imgSrc = document.querySelector(`.img-${id}`)
        // gElCanvas.width = imgSrc.width
        // gElCanvas.height = imgSrc.height
    gCtx.drawImage(imgSrc, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onImgClick(id) {
    renderEditor(id);
    document.querySelector('.main-gallery').classList.add('hide');
}