export default class Canvas{

    currentColour = "#000000";

    gridSideLength = 16;
    grid = new Array();
    pixelsPerSquare;
    width;
    height;
    ctx;
    canvas;


    initializeCanvas(){

        this.adjustCanvasDimensions();
        this.initializeGrid();
    }


    adjustCanvasDimensions(){
        this.canvas = $("#myCanvas")[0];
        var viewport = $(window);
        
        this.height = (viewport.height() - ((viewport.height() * 0.85) % this.gridSideLength)) * 0.85;
        this.width = (viewport.width() - ((viewport.width() / 2) % this.gridSideLength)) / 2;

        if(this.width < 500){
            console.log(this.width);
            this.height = (viewport.height() - ((viewport.height() ) % this.gridSideLength));
            this.width = (viewport.width() - ((viewport.width() ) % this.gridSideLength));
        }

        this.canvas.height = this.heightOrWidth();
        this.canvas.width = this.heightOrWidth();
        this.pixelsPerSquare = this.heightOrWidth()/this.gridSideLength;
        
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    

    initializeGrid(){
        for(var i  = 0; i < this.gridSideLength; i++){
            this.grid[i] = new Array(this.gridSideLength);
        }
    }

    changeCanvasSize(num){
        this.gridSideLength = num;
        this.grid = new Array(num);
        this.initializeCanvas();
        this.drawGrid();
        this.draw();
    }

    drawGrid(){ 
        for(var i = 0; i < this.gridSideLength; i++){
            for(var j = 0; j < this.gridSideLength; j++){

                if(i % 2 == 0){
                    if(j % 2 == 0){
                        this.ctx.fillStyle = "#FFFFFF";
                        this.grid[j][i] = "#FFFFFF";
                    }
                    else{
                        this.ctx.fillStyle = "#94948c";
                        this.grid[j][i] = "#94948c";
                    }
                }
                else{
                    if(j % 2 == 0){
                        this.ctx.fillStyle = "#94948c";
                        this.grid[j][i] = "#94948c";
                    }
                    else{
                        this.ctx.fillStyle = "#FFFFFF";
                        this.grid[j][i] = "#FFFFFF";
                    }
                }
            }
        }
    }

    heightOrWidth(){
        if(this.height > this.width){
            return this.width;
        }
        return this.height;
    }

    getMousePos(event){
        var rect = this.canvas.getBoundingClientRect();
        return{
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    positionToGrid(mousePosition){
        return{
            x: Math.floor(mousePosition.x / this.pixelsPerSquare),
            y: Math.floor(mousePosition.y / this.pixelsPerSquare)
        };
    }

    canvasClick(event){
        var pos = this.getMousePos(event);
        var gridPos = this.positionToGrid(pos);
        this.grid[this.positionToGrid(pos).x][this.positionToGrid(pos).y] = this.currentColour;
        this.draw();
    }

    draw(){
        for(var i = 0; i < this.gridSideLength; i++){
            for(var j = 0; j < this.gridSideLength; j++){
                this.ctx.fillStyle = this.grid[i][j];
                this.ctx.beginPath();
                this.ctx.fillRect(i * this.pixelsPerSquare, j * this.pixelsPerSquare, this.pixelsPerSquare+1, this.pixelsPerSquare+1);
            }
        }
    }

    clearCanvas(){
        this.drawGrid();
        this.draw();
    }

    setColour(colour){
        this.currentColour = colour;
    }

    getArray(){
        return this.grid;
    }
}

