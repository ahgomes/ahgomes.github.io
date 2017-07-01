var pages;
var page;
var links;
var sliding;
var title;

window.onload = function() {
    pages = ['.adrian', '.hugo', '.gomes'];
    links = ['.goToA', '.goToH', '.goToG'];
    page = 0;
    sliding = false;
    script(checkCookie());
};

class FixedLengthQueue {
    constructor(maxLength) {
        this.maxLength = maxLength;
        this._elements = new Array(this.maxLength);
    }

    enqueue(el) {
        this._elements.push(el);
        return this._elements.shift();
    }

    dequeue() {
        this._elements.push(null);
        return this._elements.shift();
    }

    toList() {
        return this._elements;
    }

    static fromList(list) {
        var flqueue = new FixedLengthQueue(list.length);
        for (let i = 0; i < list.length; i++) {
            flqueue.enqueue(list[i]);
        }
        return flqueue;
    }
}

function linkChange(i) {
    if (!sliding) {
        sliding = true;
        changeSlide(i, (page < i), Math.abs(page - i));
        page = i;
    }
}

window.onwheel = function(e) {
    if (e.deltaY < -40 && page > 0 && !sliding) {
        page--;
        sliding = true;
        changeSlide(page, false, 1);
    }
    if (e.deltaY > 40 && page < 2 && !sliding) {
        page++;
        sliding = true;
        changeSlide(page, true, 1);
    }
};

function changeSlide(p, down, dist) {
    if(dist != 0) {
        if(dist > 1) {
            p += (down) ? -1 : 1;
            page = p;
        }

        var nextPage = document.querySelector(pages[p]);
        nextPage.classList.add('active_slide');
        nextPage.classList.remove((down) ? 'inactive_slide_bottom' : 'inactive_slide_top');

        var currentPage = document.querySelector(pages[(down) ? p - 1 : p + 1]);
        currentPage.classList.remove('active_slide');
        currentPage.classList.add((down) ? 'inactive_slide_top' : 'inactive_slide_bottom');

        var nextLink = document.querySelector(links[p]);
        nextLink.classList.add('active_link');
        nextLink.classList.remove('inactive_link');

        var currentLink = document.querySelector(links[(down) ? p - 1 : p + 1]);
        currentLink.classList.remove('active_link');
        currentLink.classList.add('inactive_link');

        if(dist > 1) {
            page += (down) ? 1 : -1;
            changeSlide(page, down, 1);
        }
    }

    setTimeout(function() {
        sliding = false;
    }, 500);
}

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
    xShift: 0,
    yShift: 0,
    xMult: 10,
    yMult: 10
};

window.onmousemove = function(e) {

    var css = document.querySelector('.titleShadow');

    mouse.x = e.clientX;
    mouse.y = e.clientY;

    mouse.xShift = ((innerWidth / 2) - mouse.x) / 100;
    mouse.yShift = ((innerHeight / 2) - mouse.y) / 100;

    mouse.xMult = (mouse.xShift < 0) ? 10 : -10;
    mouse.yMult = (mouse.yShift < 0) ? 10 : -10;

    if(Math.abs(mouse.xShift) <= 5 && Math.abs(mouse.yShift) <= 5) {
        css.innerHTML =
            '.slider h1 {' +
                'text-shadow: ' +
                    mouse.xShift + 'px ' + mouse.yShift + 'px rgba(0,0,0,.2),' +
                    (mouse.xShift - mouse.xMult) + 'px ' + (mouse.yShift - mouse.yMult) + 'px rgba(0,0,0,.2),' +
                    (mouse.xShift - mouse.xMult) + 'px ' + mouse.yShift + 'px rgba(0,0,0,.2);' +
                '}';
    } else {
        mouse.xShift = (mouse.xShift <= -5) ? -5 : (mouse.xShift >= 5) ? 5 : mouse.xShift;
        mouse.yShift = (mouse.yShift <= -5) ? -5 : (mouse.yShift >= 5) ? 5 : mouse.yShift;
        css.innerHTML =
            '.slider h1 {' +
                'text-shadow: ' +
                    mouse.xShift + 'px ' + mouse.yShift + 'px rgba(0,0,0,.2),' +
                    (mouse.xShift - mouse.xMult) + 'px ' + (mouse.yShift - mouse.yMult) + 'px rgba(0,0,0,.2),' +
                    (mouse.xShift - mouse.xMult) + 'px ' + mouse.yShift + 'px rgba(0,0,0,.2);' +
                '}';
    }
};

function key(e) {
    return e.which || e.keyCode;
}

var flip = 0;
var body = document.querySelector('.fullPage');
var password = 'cvhdrtfy';
var passwordQueue = new FixedLengthQueue(password.length);

window.onkeydown = function(e) {
    switch (key(e)) {
        case 33:
        case 34:
        case 38:
        case 40:
            e.preventDefault();
            if(key(e) == 38 && page > 0 && !sliding) {
                page--;
                sliding = true;
                changeSlide(page, false, 1);
            } else if(key(e) == 40 && page < 2 && !sliding) {
                page++;
                sliding = true;
                changeSlide(page, true, 1);
            }
            break;
    }
}

window.onkeypress = function(e) {
    switch (key(e)) {
        case 97:
            linkChange(0);
            break;
        case 103:
            linkChange(2);
            break;
        case 104:
            linkChange(1);
            break;
        case 102:
            flipScreen();
            break;
        case 100:

            break;
    }
    passwordQueue.enqueue(String.fromCharCode(key(e)));
    if(passwordQueue.toList().join('') == password) {
        script(0);
    }
}

function script(state) {
    var start = [ //0
        ['Hello?', 'text'],
        ['Did you need something?', 'yesorno'],
    ];

    var noLines = [ //1
        ['No?', 'text']
    ];

    var yesLines = [ //2
        ['You do!', 'text'],
        ['Oh gosh!', 'text'],
        ['Yay', 'text'],
        ['OK', 'text'],
        ['OK', 'text'],
        ['How can I help you?', 'typeable'],

    ];

    var yesLinesConfirmed = [  //3
        ['Oh great', 'text'],
        ['I\'m on it', 'text'],
        ['Oh wait', 'text'],
        ['What did you want again?', 'text'],
        ['I think I got too exited', 'text'],
        ['Sorry, I\'m bad at this', 'text'],
        ['Maybe I should go', 'text']
    ];

    var yesLinesDenied = [  //4
        ['No?', 'text'],
        ['Oh', 'text'],
        ['OK', 'text'],
        ['How can I help you?', 'typeable']
    ];

    var end = [  //5
        ['OK', 'text'],
        ['Well I\'ll be here if you need me', 'text'],
        ['You know how to call', 'text'],
        ['Bye!', 'text'],
        ['GOOD LUCK!!', 'text']
    ];

    var onreturnNow = [  //6
        ['Welcome back!!', 'text'],
        ['Great to see you again', 'text']
    ];

    var onreturnLater = [ //7

    ];

    var start_rude = [  //8

    ];

    var turnoffDenied_rude = [ //9

    ];

    var end_rude = [  //10

    ];

    var onreturnNow_rude = [  //11

    ];

    var onreturnLater_rude = [ //12

    ];

    switch (state) {
        case 0:
            notify({
                message: start[0][0],
                type: start[0][1],
                end: 3000
            });
            setTimeout(function() {
                notify({
                    message: start[1][0],
                    type: start[1][1],
                    yesAct: 'yes(this.parentNode, 2)',
                    noAct: 'no(this.parentNode, 1)'
                });
            }, 500);
            break;
        case 1:
            notify({
                message: noLines[0][0],
                type: noLines[0][1],
                end: 3000
            });
            setTimeout(function() {
                script(5);
            }, 500);
            break;
        case 2:
            let _j = 0;
            for (let i = 0; i < 6; i++) {
                setTimeout(function() {
                    notify({
                        message: yesLines[i][0],
                        type: yesLines[i][1],
                        submitAct: 'submit(this.parentNode)',
                        end: (i == 5) ? undefined : 3000
                    });
                }, (i == 5) ? _j + 3000 : _j);
                _j += 500;
            }
            break;
        case 3:
            let _l = 0;
            for (let i = 0; i < yesLinesConfirmed.length; i++) {
                setTimeout(function() {
                    notify({
                        message: yesLinesConfirmed[i][0],
                        type: yesLinesConfirmed[i][1],
                        end: 4000
                    });
                }, _l);
                _l += 700;
            }
            setTimeout(function() {
                script(5);
            }, _l + 4000);
            break;
        case 4:
            let _y = 0;
            for (let i = 0; i < 4; i++) {
                setTimeout(function() {
                    notify({
                        message: yesLinesDenied[i][0],
                        type: yesLinesDenied[i][1],
                        submitAct: 'submit(this.parentNode)',
                        end: (i == 3) ? undefined : 3000
                    });
                }, (i == 3) ? _y + 3000 : _y);
                _y += 500;
            }
            break;
        case 5:
            let _m = 0;
            for (let i = 0; i < end.length; i++) {
                setTimeout(function() {
                    notify({
                        message: end[i][0],
                        type: end[i][1],
                        end: 5000
                    });
                }, _m);
                _m += 1000;
            }
            setCookie('noteStyle', 'nice', 15);
            break;
        case 6:
            notify({
                message: onreturnNow[0][0],
                type: onreturnNow[0][1],
                end: 3000
            });
            setTimeout(function() {
                notify({
                    message: onreturnNow[1][0],
                    type: onreturnNow[1][1],
                    end: 3000
                });
            }, 500);
            break;
    }

}

function flipScreen() {
    if(flip == 0) {
        body.style.filter = 'hue-rotate(90deg) invert(1)';
        body.style.transform = 'scale(-1, 1)';
        flip++;
    } else if(flip == 1) {
        body.style.filter = 'hue-rotate(180deg) invert(0)';
        body.style.transform = 'scale(-1, -1)';
        flip++;
    } else if(flip == 2) {
        body.style.filter = 'hue-rotate(270deg) invert(1)';
        body.style.transform = 'scale(1, -1)';
        flip++;
    } else {
        body.style.filter = 'unset';
        body.style.transform = 'scale(1, 1)';
        flip = 0;
    }
}

/*-------------------------------------------------------*/

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toGMTString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
}

function getCookie(cname) {
    var name = cname + '=';
    var c = document.cookie.split(';');
    for(var i = 0; i < c.length; i++) {
        while (c[i].charAt(0) == ' ') {
            c[i] = c[i].substring(1);
        }

        if (c[i].indexOf(name) == 0) {
            return c[i].substring(name.length, c[i].length);
        }
    }
    return '';
}

function checkCookie() {
    var note = getCookie('noteStyle');
    if (note == 'nice') {
        return 6;
    } /*else if (note == 'niceLater') {
        return 7;
    } else if (note == 'rudeNow') {
        return 11;
    } */else if (note == 'rude') {
        return 11;
    } else {
        return -1;
    }
}

function eraseCookie(cname) {
    setCookie(cname, '', -1);
}
