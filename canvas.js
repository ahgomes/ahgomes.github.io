var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener('resize',  function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

function rand(min, max) {
	return Math.random() * (max - min) + min;
}

function randInt(min, max) {
	return Math.floor(rand(min, max));
}

function randColor() {
    var colors = ['rgba(255,255,255,' + rand(0.3, 0.8) + ')','rgba(0,0,0,' + rand(0.3, 0.6) + ')'];
	return colors[Math.floor(Math.random() * colors.length)];
}

function Circle(x, y, r, color) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = color;

	this.update = function() {
        if(this.y < -this.r ) {
            this.x = randInt(this.r, canvas.width - this.r);
            this.y = canvas.height + this.r;
        }
        this.x += randInt(-2,2);
        this.y += randInt(-50,2);
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		c.lineWidth = 10;
		c.strokeStyle = this.color;
		c.stroke();
		c.closePath();
	};
}

var circles;
function init() {
    circles = [];
    for(var i = 0; i < randInt(50, 80); i++) {
        var r  = randInt(5, 25);
        var x  = randInt(r, canvas.width - r);
        var y  = randInt(0, canvas.height - r);
        circles.push(new Circle(x, y, r, randColor()));
    }
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++) circles[i].update();
}

init();
animate();
