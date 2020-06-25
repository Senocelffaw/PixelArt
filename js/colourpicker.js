export default class ColourPicker{

    picker;
    blackHue;
    curentColour;
    colourChoice;

    constructor(){
        this.curentColour = "#000000";
        this.picker = $("#colour-selector")[0];
        this.blackHue = $("#black-gradient")[0];
        this.colourChoice = $("#colour-choice")[0];

        this.colourChoice.style.backgroundColor = this.curentColour;
        this.blackHue.value = 100;
    }

    getColour(mouseEvent){
        
        this.curentColour = "#" + this.getRGB(mouseEvent);
        this.colourChoice.style.backgroundColor = this.curentColour;
        $("#hex")[0].value = this.curentColour;

        return this.curentColour;
    }

    getWhiteValue(mouseYPos){
        var height = this.picker.getBoundingClientRect().height;
        return Math.floor(mouseYPos/height * 255);
    }

    getRGB(mouseEvent){
        var pos = this.getMousePos(mouseEvent);
        var width = this.picker.getBoundingClientRect().width;
        var red;
        var green;
        var blue;
        //Determine Red value
        if(pos.x <= width * 1 / 6 || pos.x >= width * 5 / 6){
            red = 255;
        }
        else if(pos.x > width * 1 / 6 && pos.x < width * 2 / 6){
           // red =  ((pos.x ( 1/6)) / width * 2/ 12);
            red = 255 - Math.floor((pos.x - ((width * 1/6))) / ( width * 1/ 6) * 255);
        }
        else if(pos.x > width * 4 / 6 && pos.x < width * 5 / 6){
            red = Math.floor((pos.x - (width * 4/6)) / (width * 1/ 6) * 255);
        }
        else{
            red = 0;
        }
        
        //determine Green value
        if(pos.x <= width * 3/6 && pos.x >= width * 1/6){
            green = 255;
        }
        else if(pos.x < width * 1/6){
            green = Math.floor(pos.x / (width * 1/6) * 255);
        }
        else if(pos.x >= width * 3 / 6 && pos.x <= width * 4/6){
            green = 255 - Math.floor((pos.x - ((width * 3/6))) / ( width * 1/ 6) * 255);
        }
        else{
            green = 0;
        }

        //Determine Blue value
        if(pos.x >= width * 3/6 && pos.x <= width * 5/6){
            blue = 255;
        }
        else if(pos.x > width * 2/6 && pos.x < width * 3/6){
            blue = Math.floor((pos.x - (width * 2/6)) / (width * 1/ 6) * 255);
        }
        else if(pos.x > width * 5/6){
            blue = 255 - Math.floor((pos.x - ((width * 5/6))) / ( width * 1/ 6) * 255);
        }
        else{
            blue = 0;
        }

        var white = this.getWhiteValue(pos.y);

        red = red + white;
        green = green + white;
        blue = blue + white;

        if(red >= 255){
            red = 255;
        }
        if(green >= 255){
            green = 255;
        }
        if(blue >= 255){
            blue = 255;
        }

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        if(red.length <= 1){
            red = "0" + red;
        }
        if(green.length <= 1){
            green = "0" + green;
        }
        if(blue.length <= 1){
            blue = "0" + blue;
        }

        return red + green + blue;
    }

    getMousePos(event){
        var rect = this.picker.getBoundingClientRect();
        return{
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    //TODO:: make sure it's a hex RGB number 
    useHexValue(col){
        if(col[0] == '#'){
            this.curentColour = col;
            this.colourChoice.style.backgroundColor = col;
        }
    
    }

}