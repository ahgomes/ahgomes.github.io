'use strict'

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
    if (location.hash) {
        let target = location.hash
        window.scrollTop = document.querySelector(target).offsetTop
        fsize = 3
        border_angle = 169
        name.style.fontSize = fsize + 'vw'
        border.style.transform = 'rotate(' + border_angle + 'deg)'
        opened = true
        name.style.transition = 'none'
        border.style.transition = 'none'
    } else window.scrollTo(0, 0)
    
}

let wH = window.innerHeight;

let openbtn = document.querySelector('.landing span.button')

let border = document.querySelector('#border')
let border_angle = 0
let angle_threshold = 4;

let name = document.querySelector('#name')
let fsize = 15;
let fsize_threshold = wH / 12;

name.onclick = function() {
    window.scrollTo(0, 0)
}

let opened = false
openbtn.onclick = function() {
    window.scrollTo(0, window.innerHeight)
    fsize = 3
    border_angle = 169
    name.style.fontSize = fsize + 'vw'
    border.style.transform = 'rotate(' + border_angle + 'deg)'
    opened = true
}

let wink = document.querySelector('#wink')
let winktxt = [';)', ';p', ':D', ':0']
let pages = document.querySelectorAll('section')

let wtxt = document.querySelector('.work h1')
let woff = wtxt.offsetTop

let left = document.querySelector('.left')
let ltext = document.querySelector('.left h2')
let squares = document.querySelectorAll('.left .frame span')
let lsetting = 0


let web = document.querySelector('.web')
let digital = document.querySelector('.digital')
let photo = document.querySelector('.photo')

let weboff = web.offsetTop
let digoff = digital.offsetTop
let phtoff = photo.offsetTop

let scroll_threshold = ( web.offsetHeight / wH ) *
    ( parseInt(getComputedStyle(left).top.replace('px', '')) / wH )

window.addEventListener('scroll', function(e) {
    window.requestAnimationFrame(function() {
        let pYO = window.pageYOffset

        name.style.removeProperty('transition')
        border.style.removeProperty('transition')

        if (opened) {
            if (pYO < 20) {
                openbtn.innerHTML = '~open~'
                openbtn.style.animation = 'font-shake 100ms alternate infinite'
                openbtn.style.removeProperty('font-size')
                name.style.removeProperty('font-size')
                opened = false
            } else {
                openbtn.innerHTML = '~opening~'
                openbtn.style.animation = 'none'
                openbtn.style.fontSize = '2vw'
                name.style.fontSize = '3vw'
            }
         }

        if (pYO < wH) {
            border_angle = (pYO > wH * 0.9) ? 169 : pYO / angle_threshold;
            border.style.transform = 'rotate(' + border_angle + 'deg)'
            fsize = 15 - pYO / fsize_threshold
            name.style.fontSize = fsize + 'vw'
            opened = true
        }

        if (pYO > wH * 2 && pYO < wH * 3) {
            border_angle = (pYO > wH * 2.9) ? 530 : pYO / angle_threshold;
            border.style.transform = 'rotate(' + border_angle + 'deg)'
        }

        if (lsetting == 0 && woff - pYO <= wH * scroll_threshold) {
            lsetting = 1
        }

        if (lsetting > 0) {
            //border.style.background = 'rgba(255, 255, 255, 1)'
        }

        if (lsetting > 0 && woff - pYO >= wH * scroll_threshold) {
            squares[0].setAttribute('class', 'btn b1')
            squares[1].setAttribute('class', 'btn b2')
            squares[2].setAttribute('class', 'btn b3')
            ltext.innerHTML = 'web'
            //border.style.background = 'rgba(0, 0, 0, 0)'
            lsetting = 0
        }

        if (lsetting > 0 && pYO - weboff >= wH * scroll_threshold) {
            squares[0].setAttribute('class', 'pixel p1')
            squares[1].setAttribute('class', 'pixel p2')
            squares[2].setAttribute('class', 'pixel p3')
            ltext.innerHTML = 'digital'
            lsetting = 2
        }

        if (lsetting > 1 && pYO - weboff <= wH * scroll_threshold) {
            squares[0].setAttribute('class', 'btn b1')
            squares[1].setAttribute('class', 'btn b2')
            squares[2].setAttribute('class', 'btn b3')
            ltext.innerHTML = 'web'
            lsetting == 1
        }

        if (lsetting > 1 && pYO - digoff >= wH * scroll_threshold) {
            squares[0].setAttribute('class', 'edge e1')
            squares[1].setAttribute('class', 'edge e2')
            squares[2].setAttribute('class', 'edge e3')
            ltext.innerHTML = 'photo'
            lsetting = 3
        }

        if (lsetting > 2 && pYO - digoff <= wH * scroll_threshold) {
            squares[0].setAttribute('class', 'pixel p1')
            squares[1].setAttribute('class', 'pixel p2')
            squares[2].setAttribute('class', 'pixel p3')
            ltext.innerHTML = 'digital'
            lsetting = 2
        }

        if (lsetting > 2 && pYO - phtoff >= wH * scroll_threshold) {
            //border.style.background = 'rgba(0, 0, 0, 0)'
            lsetting = 4
        }

        if (lsetting > 3 && pYO - phtoff <= wH * scroll_threshold) {
            lsetting = 3
        }
    })
})

window.addEventListener('resize', function() {
    //WINDOW HEIGHT DEPENDENT
    wH = window.innerHeight;
    fsize_threshold = wH / 12
    fsize = 15 - window.pageYOffset / fsize_threshold
    name.style.fontSize = fsize + 'vw'
    scroll_threshold = ( web.offsetHeight / wH ) *
        ( parseInt(getComputedStyle(left).top.replace('px', '')) / wH )

    //OFFSETS
    woff = wtxt.offsetTop
    weboff = web.offsetTop
    digoff = digital.offsetTop
    phtoff = photo.offsetTop
})
