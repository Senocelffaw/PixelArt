import Canvas from './canvas.js';

var canvas = new Canvas();

$(document).ready(function(){
    canvas.initializeCanvas();
    canvas.drawGrid();
});