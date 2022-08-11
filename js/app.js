import Canvas from './canvas.js';
import ColourPicker from './colourpicker.js';
import DownloadCanvas from './downloadcanvas.js';

var canvas = new Canvas();
var colourPicker = new ColourPicker();
var downloadCanvas = new DownloadCanvas();

var mousedown = false;
var choosingColour = false;
var choosingDarken = false;

var tooltipOpen = false;

$(document).mouseup(function(){
    mousedown = false;
    choosingColour = false;
});

$(document).ready(function(){
    $('img').on('dragstart', function(event) { event.preventDefault(); });
    canvas.initializeCanvas();
    canvas.drawGrid();
    canvas.draw();
});



$('#tool-tip-1')[0].onmousedown = function(e){
    if(tooltipOpen){
        $('#tool-tip-1-content')[0].classList.add('hide');
        tooltipOpen = false;
    }
    else{
        $('#tool-tip-1-content')[0].classList.remove('hide');
        tooltipOpen = true;
    }
}

$('#tool-tip-2')[0].onmousedown = function(e){
    if(tooltipOpen){
        $('#tool-tip-2-content')[0].classList.add('hide');
        tooltipOpen = false;
    }
    else{
        $('#tool-tip-2-content')[0].classList.remove('hide');
        tooltipOpen = true;
    }
}

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


$("#colour-selector")[0].onmousedown = function(e){
    choosingColour = true;
    var pos = colourPicker.getMousePos(e);
    canvas.setColour(colourPicker.getColour(e));  
}

$("#colour-selector")[0].onmouseup = function(e){
    choosingColour = false;
}

$("#colour-selector")[0].onmousemove = function(e){
    if(choosingColour){
        var pos = colourPicker.getMousePos(e);
        canvas.setColour(colourPicker.getColour(e)); 
    }
}

$("#change-hex")[0].onmousedown = function(e){
    colourPicker.useHexValue($("#hex")[0].value);
    canvas.setColour($("#hex")[0].value);
}

$("#black-gradient")[0].onmousedown = function(e){
    choosingDarken = true;
    canvas.setColour(colourPicker.darken());
}

$("#black-gradient")[0].onmouseup = function(e){
    choosingDarken = false;
    canvas.setColour(colourPicker.darken());
}

$("#black-gradient")[0].onmousemove = function(e){
    if(choosingDarken){
        canvas.setColour(colourPicker.darken());
    }
}

$("#download")[0].onmousedown = function(e){
    if(confirm("Are you sure you want to download a PNG of your picture?")){
        downloadCanvas.downloadCanvas(canvas.getArray(), $("#image-size")[0].value);
    }
}

$("#open-sidebar-button")[0].onmousedown = function(e){
    $('#left-side-bar')[0].classList.remove("hide-sidebar");
}

$("#close-sidebar-button")[0].onmousedown = function(e){
    $('#left-side-bar')[0].classList.add("hide-sidebar");
}

window.addEventListener('resize', () => {
    canvas.adjustCanvasDimensions();
    canvas.draw();
});