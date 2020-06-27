export default class DownloadCanvas{
    canvasToDownload;
    offscreenCanvas;
    ctx;
    pixelSizeInput;

    constructor(theCanvasToDownload){
        this.canvasToDownload = theCanvasToDownload;
        this.offscreenCanvas = document.createElement("canvas");
        this.ctx = this.offscreenCanvas.getContext("2d");
        this.pixelSizeInput = $("#image-size")[0].value;
    }

    drawPixelsOnOffscreenCanvas(array2d){
        var arrayLength = array2d.length;
        this.offscreenCanvas.width = arrayLength;
        this.offscreenCanvas.height = arrayLength;

        for(var i = 0; i < arrayLength; i++){
            for(var j = 0; j < arrayLength; j++){
                this.ctx.beginPath();
                this.ctx.fillStyle = array2d[j][i];
                this.ctx.fillRect(j, i, 1, 1);
            }
        }
    }

    downloadCanvas(){
        this.drawPixelsOnOffscreenCanvas(this.canvasToDownload.getArray());
        
        if(this.validatePixelImageSize()){
            var url = this.offscreenCanvas.toDataURL();
            var img = new Image;
            img.src = url;

            this.offscreenCanvas.width = this.pixelSizeInput;
            this.offscreenCanvas.height = this.pixelSizeInput;

            this.ctx.imageSmoothingEnabled = false;
            this.ctx.drawImage(img, 0, 0, this.pixelSizeInput, this.pixelSizeInput);

            url = this.offscreenCanvas.toDataURL();

            var tempElement = document.createElement("a");
            this.ctx.imageSmoothingEnabled = false;
            this.ctx.drawImage(img, 0, 0, this.pixelSizeInput, this.pixelSizeInput);

            document.body.appendChild(tempElement);
            tempElement.href = url;
            tempElement.download = "canvas-image.png";
            tempElement.click();
            document.body.removeChild(tempElement);
        }
        else{
            var url = this.offscreenCanvas.toDataURL();
            var tempElement = document.createElement("a");
    
            document.body.appendChild(tempElement);
            tempElement.href = url;
            tempElement.download = "canvas-image.png";
            tempElement.click();
            document.body.removeChild(tempElement);
        }

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