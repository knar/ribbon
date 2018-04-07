const canvas = document.getElementById("ribbonCanvas");
const ctx = canvas.getContext("2d");

var width = ctx.canvas.clientWidth;
var height = ctx.canvas.clientHeight;

var colors, points;

init();

function init() {
    window.addEventListener('resize', resizeCanvas, false);
    canvas.addEventListener('click', drawMore, false);
    resizeCanvas();
}

function resizeCanvas() {
    width = ctx.canvas.clientWidth;
    height = ctx.canvas.clientHeight;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    draw();
}

function drawMore() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < 5; i++) draw();
}

function draw() {
    //ctx.clearRect(0, 0, width, height);
    let num = 50;
    generateColors(num);
    generatePoints(num * 3 + 2);
    ctx.globalAlpha = 0.5;
    let p = 0;
    for (let i = 0; i < num; i++) {
        drawTriangle(points[p], points[p + 1], points[p + 2], colors[i]);
        p++;
    }
}

function generatePoints(num) {
    points = [];
    let a = 0;
    let b = height / 2;
    let slight = 0 - Math.PI / 2;
    for (let i = 0; i < num; i++) {
        points.push( {x: a, y: b} );

        let l = randInt(width / 100, width / 25);
        let theta = Math.random() * Math.PI;
        //slight += 0.1;
        theta += slight;
        a += Math.cos(theta) * l;
        b += Math.sin(theta) * l;


        if (a < 0) a = -a;
        if (a > width) a = width - (a - width);
        if (b < 0) b = -b;
        if (b > height) b = height - (b - height);
    }
}

function generateColors(num) {
    colors = [];
    let step = 32;
    let r = Math.floor(Math.random() * (256 / step)) * step + step;
    let g = 384 - r;
    let b = 0;
    for (let i = 0; i < num; i++) {
        colors.push('rgb(' + r + ', ' + g + ', ' + b + ')');
        if (b === 0) {
            r -= step;
            if (r) g += step;
            else b += step;
        }
        else if (g === 0) {
            b -= step;
            if (b) r += step;
            else g += step;
        }
        else if (r === 0) {
            g -= step;
            if (g) b += step;
            else r += step;
        }
    }
}

function drawTriangle(v1, v2, v3, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.lineTo(v3.x, v3.y);
    ctx.fill();
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function vec2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}