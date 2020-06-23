import Canvas from './canvas.js';

var canvas = new Canvas();

var mousedown = false;

$(document).ready(function(){
    canvas.initializeCanvas();
    canvas.drawGrid();
    canvas.draw();
});

$("#myCanvas")[0].onmousedown = function(e){
    mousedown = true;
    canvas.canvasClick(e);
}

$("#myCanvas")[0].onmouseup = function(e){
    mousedown = false;
}

$("#myCanvas")[0].onmousemove = function(e){
    if(mousedown){
        canvas.canvasClick(e);
    }
}

$("#clear")[0].onmousedown = function(e){
    if(confirm("Are you sure you want to clear the canvas?")){
        canvas.clearCanvas();
    }
}

$("#change")[0].onmousedown = function(e){
    var value = $("#grid-size")[0].value;
    if(value > 0 && value <= 100){
        if(confirm("Are you sure you want to change the canvas size?")){
            canvas.changeCanvasSize($("#grid-size")[0].value);
        }
    }
    else{
        alert("Grid size must be between 1 and 100");
    }
}
