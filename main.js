
let dragging = false;
let circle = document.querySelector('#circle')
let circleH = circle.offsetHeight;
let circleW = circle.offsetWidth;

circle.addEventListener('mousedown', function(e) {
    dragging = true;
    circle.style.cursor = 'grabbing'
})

document.addEventListener('mouseup', function(e) {
    dragging = false;
    circle.style.cursor = 'pointer'
})

document.addEventListener('mousemove', function(e) {
    if (dragging) {
        circle.style.top  = e.clientY - circleH/2 + 'px';
        circle.style.left  = e.clientX - circleW/2 + 'px';
    }
})

onload = function() {
    window.scrollTo(0, 0)
}

document.querySelector('#name').onclick = function() {
    window.scrollTo(0, 0)
}

document.querySelector('.landing span.button').onclick = function() {
    window.scrollTo(0, window.innerHeight)
}

let wH = window.innerHeight;

let border = document.querySelector('#border')
let border_angle = 0
let angle_threshold = 4;

let name = document.querySelector('#name')
let fsize = 15;
let fsize_threshold = wH / 12;

let left = document.querySelector('.left')
let loff = left.offsetTop;
let ltext = document.querySelector('.left h2')
let squares = document.querySelectorAll('.left .frame span')
let lsetting = 0

let weboff = document.querySelector('.web').offsetTop + document.querySelector('.web').offsetHeight / 2
let digoff = document.querySelector('.digital').offsetTop  + document.querySelector('.digital').offsetHeight / 2
let phtoff = document.querySelector('.photo').offsetTop  + document.querySelector('.photo').offsetHeight / 2 

window.addEventListener('scroll', function(e) {
    window.requestAnimationFrame(function() {
        let pYO = window.pageYOffset;
        if (pYO < wH) {
            border_angle = pYO / angle_threshold;
            border.style.transform = 'rotate(' + border_angle + 'deg)'
            fsize = 15 - pYO / fsize_threshold
            name.style.fontSize = fsize + 'vw'
        }

        if (pYO > wH * 2 && pYO < wH * 3) {
            border_angle = (pYO > wH * 2.9) ? 530 : pYO / angle_threshold;
            border.style.transform = 'rotate(' + border_angle + 'deg)'
        }

        if (lsetting == 0 && loff - pYO <= wH * 0.45) {
            lsetting = 1
        }

        if (lsetting > 0 && loff - pYO >= wH * 0.45) {
            lsetting = 0
        }

        if (lsetting == 1 && pYO - weboff >= wH * 0.45) {
            squares[0].setAttribute('class', 'pixel p1')
            squares[1].setAttribute('class', 'pixel p2')
            squares[2].setAttribute('class', 'pixel p3')
            ltext.innerHTML = 'digital'
            lsetting = 2
        }

        if (lsetting > 1 && pYO - weboff <= wH * 0.45) {
            squares[0].setAttribute('class', 'btn b1')
            squares[1].setAttribute('class', 'btn b2')
            squares[2].setAttribute('class', 'btn b3')
            ltext.innerHTML = 'web'
            lsetting == 1
        }

        if (lsetting == 2 && pYO - digoff >= wH * 0.45) {
            squares[0].setAttribute('class', 'edge e1')
            squares[1].setAttribute('class', 'edge e2')
            squares[2].setAttribute('class', 'edge e3')
            ltext.innerHTML = 'photo'
            lsetting = 3
        }

        if (lsetting > 2 && pYO - digoff <= wH * 0.45) {
            squares[0].setAttribute('class', 'pixel p1')
            squares[1].setAttribute('class', 'pixel p2')
            squares[2].setAttribute('class', 'pixel p3')
            ltext.innerHTML = 'digital'
            lsetting = 2
        }
    })
})
