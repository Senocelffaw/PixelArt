import Canvas from './canvas.js';

var canvas = new Canvas();

$(document).ready(function(){
    canvas.initializeCanvas();
    canvas.drawGrid();
});

$("#myCanvas")[0].onmousemove = function(e){
    
    var mousePos = canvas.getMousePos(e);

}