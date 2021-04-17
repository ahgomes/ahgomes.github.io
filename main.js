'use strict'

let dragging = false;
let circle = document.querySelector('#circle')
let circleH = circle.offsetHeight;
let circleW = circle.offsetWidth;

circle.onmousedown = () => {
    dragging = true;
    circle.style.cursor = 'grabbing';
};

document.onmouseup = () => {
    dragging = false;
    circle.style.cursor = 'pointer';
};

document.onmousemove = (e) => {
    if (dragging) {
        circle.style.top = e.clientY - (circleH / 2) + 'px';
        circle.style.left = e.clientX - (circleW / 2) + 'px';
    }
};

let openbtn = document.querySelector('.landing span.button')
openbtn.onclick = () => {
    document.querySelector('.error').style.display = 'block';
}
