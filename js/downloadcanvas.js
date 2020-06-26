export default class DownloadCanvas{
    canvasToDownload;
    offscreenCanvas;
    ctx;

    constructor(theCanvasToDownload){
        this.canvasToDownload = theCanvasToDownload;
        this.offscreenCanvas = document.createElement("canvas");
        this.ctx = this.offscreenCanvas.getContext("2d");
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

        var url = this.offscreenCanvas.toDataURL();
        var tempElement = document.createElement("a");

        document.body.appendChild(tempElement);
        tempElement.href = url;
        tempElement.download = "canvas-image.png";
        tempElement.click();
        document.body.removeChild(tempElement);
    }
}