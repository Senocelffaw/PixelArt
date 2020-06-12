export default class Canvas{

    gridSideLength = 100;
    pixelsPerSquare;
    width;
    height;
    ctx;


    initializeCanvas(){
        var canvas = $("#myCanvas")[0];
        var viewport = $(window);
        
        this.height = (viewport.height() - ((viewport.height() * 0.75) % this.gridSideLength)) * 0.75;
        this.width = (viewport.width() - ((viewport.width() / 2) % this.gridSideLength)) / 2;

        canvas.height = this.heightOrWidth();
        canvas.width = this.heightOrWidth();
        this.pixelsPerSquare = this.heightOrWidth()/this.gridSideLength;
        
        this.ctx = canvas.getContext("2d");
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawGrid(){ 
        for(var i = 0; i < this.gridSideLength; i++){
            for(var j = 0; j < this.gridSideLength; j++){

                if(i % 2 == 0){
                    if(j % 2 == 0){
                        this.ctx.fillStyle = "#FFFFFF";
                    }
                    else{
                        this.ctx.fillStyle = "#d3d3d3";
                    }
                }
                else{
                    if(j % 2 == 0){
                        this.ctx.fillStyle = "#d3d3d3";
                    }
                    else{
                        this.ctx.fillStyle = "#FFFFFF";
                    }
                }
                this.ctx.beginPath();
                this.ctx.fillRect(j * this.pixelsPerSquare, i * this.pixelsPerSquare, j * this.pixelsPerSquare + this.pixelsPerSquare, i * this.pixelsPerSquare + this.pixelsPerSquare);
            }
        }
    }

    heightOrWidth(){
        if(this.height > this.width){
            return this.width;
        }
        return this.height;
    }



}

