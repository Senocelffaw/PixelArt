export default class DownloadCanvas{
    offscreenCanvas;
    ctx;
    pixelSizeInput;
    imgData;


    constructor(){
        this.offscreenCanvas = document.createElement("canvas");
        this.ctx = this.offscreenCanvas.getContext("2d");
    }

    to1DArray(array2D){
        let width = array2D.length;
        let tempArray = new Array();
        for(var i = 0; i < width; i++){
            for(var j = 0; j < width; j++){
                tempArray.push(array2D[j][i]);
            }
        }
        return tempArray;
    }

    downloadCanvas(array, resize){
        var pixels = this.to1DArray(array);
        console.log(pixels);
        let width = array.length,      
        height = Math.ceil(pixels.length / width),
    
        // Create canvas
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        imgData = context.createImageData(width, height);
    
        canvas.height = height;
        canvas.width = width;
    
    // fill imgData with colors from array
    context.imageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;

    for(var i = 0; i < imgData.data.length; i += 4) {
        let r = parseInt(pixels[i/4].substring(1,3), 16);
        let g = parseInt(pixels[i/4].substring(3,5), 16);
        let b = parseInt(pixels[i/4].substring(5), 16);
    
        imgData.data[i + 0] = r; 
        imgData.data[i + 1] = g;  
        imgData.data[i + 2] = b;  
        imgData.data[i + 3] = 255; 
    }

    console.log(imgData);
    
    // put data to context at (0, 0)
    context.putImageData(imgData, 0, 0);
    
    // download image
    var img = canvas.toDataURL('image/png');
    if(resize != undefined && resize != null && resize != "" && resize != 0){
        console.log(resize);
        var scaledCanvas = $("<canvas>")
            .attr("width", img.width)
            .attr("height", img.height)[0];
        var newScaledCanvas = $("<canvas>")
            .attr("width", resize)
            .attr("height", resize)[0];
        var newScaledCanvasctx = newScaledCanvas.getContext('2d');
        let scaledctx = scaledCanvas.getContext('2d');
        scaledCanvas.height = resize;
        scaledCanvas.width = resize;
        scaledctx.putImageData(imgData, 0,0);
        newScaledCanvasctx.imageSmoothingEnabled = false;
        newScaledCanvasctx.webkitImageSmoothingEnabled = false;
        newScaledCanvasctx.msImageSmoothingEnabled = false;
        newScaledCanvasctx.scale(resize / imgData.height, resize / imgData.height);
        newScaledCanvasctx.drawImage(scaledCanvas, 0, 0);
        img = newScaledCanvas.toDataURL('image/png');
    }


    var tempElement = document.createElement("a");
    document.body.appendChild(tempElement);
    tempElement.href = img;
    tempElement.download = "canvas-image.png";
    tempElement.click();
    document.body.removeChild(tempElement);


    }

    validatePixelImageSize(){
        this.pixelSizeInput = $("#image-size")[0].value;
        if(this.pixelSizeInput > this.canvasToDownload.getArray().length){
            if(this.pixelSizeInput <= 1000){
                return true;
            }
        }
        return false;
    }
}