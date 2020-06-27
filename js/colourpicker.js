export default class ColourPicker{

    picker;
    blackHue;
    curentColour;
    colourChoice;
    beforeBlackColour;

    constructor(){
        this.curentColour = "#000000";
        this.beforeBlackColour = this.curentColour;
        this.picker = $("#colour-selector")[0];
        this.blackHue = $("#black-gradient")[0];
        this.colourChoice = $("#colour-choice")[0];

        this.colourChoice.style.backgroundColor = this.curentColour;
        this.blackHue.value = 1;
        this.blackHue.style.backgroundImage = "linear-gradient(" + "to right," + this.curentColour +" , "+ "#000000" +")";
    }

    getColour(mouseEvent){
        
        this.curentColour = "#" + this.getRGB(mouseEvent);
        this.colourChoice.style.backgroundColor = this.curentColour;
        $("#hex")[0].value = this.curentColour;
        this.blackHue.style.backgroundImage = "linear-gradient(" + "to right," + this.curentColour +" , "+ "#000000" +")";

        return this.curentColour;
    }

    getWhiteValue(mouseYPos){
        var height = this.picker.getBoundingClientRect().height;
        return Math.floor(mouseYPos/height * 255);
    }

    addBlackValue(hex){
        if(hex.length > 7 || hex.length < 0){
            return hex;
        }

        var darken = Math.floor(this.blackHue.value * 255 / 100);

        var red = "0x" + hex[1] + hex[2];
        var green = "0x" + hex[3] + hex[4];
        var blue = "0x" + hex[5] + hex[6];

        red = this.isNegative(parseInt(red) - darken);
        green = this.isNegative(parseInt(green) - darken);
        blue = this.isNegative(parseInt(blue) - darken);

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

        return "#" + red + green + blue;
    }

    darken(){
        var colour = this.addBlackValue(this.beforeBlackColour);
        this.curentColour = colour;
        this.colourChoice.style.backgroundColor = this.curentColour;
        $("#hex")[0].value = colour;
        return colour;
    }

    getRGB(mouseEvent){
        var pos = this.getMousePos(mouseEvent);
        var width = this.picker.getBoundingClientRect().width;
        var red = this.determineRed(pos.x, width);
        var green = this.determineGreen(pos.x, width);
        var blue =this.determineBlue(pos.x, width);
        //Determine Red value


        var white = this.getWhiteValue(pos.y);
        red = red + white;
        green = green + white;
        blue = blue + white;

        red = this.isOver255(red);
        green = this.isOver255(green);
        blue = this.isOver255(blue);

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

        this.beforeBlackColour = "#" + red + green + blue;

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

    determineRed(posx, width){
        var red;
        if(posx <= width * 1 / 6 || posx >= width * 5 / 6){
            red = 255;
        }
        else if(posx > width * 1 / 6 && posx < width * 2 / 6){
           // red =  ((posx ( 1/6)) / width * 2/ 12);
            red = 255 - Math.floor((posx - ((width * 1/6))) / ( width * 1/ 6) * 255);
        }
        else if(posx > width * 4 / 6 && posx < width * 5 / 6){
            red = Math.floor((posx - (width * 4/6)) / (width * 1/ 6) * 255);
        }
        else{
            red = 0;
        }
        return red;
    }

    determineGreen(posx, width){
        var green;
        //determine Green value
        if(posx <= width * 3/6 && posx >= width * 1/6){
            green = 255;
        }
        else if(posx < width * 1/6){
            green = Math.floor(posx / (width * 1/6) * 255);
        }
        else if(posx >= width * 3 / 6 && posx <= width * 4/6){
            green = 255 - Math.floor((posx - ((width * 3/6))) / ( width * 1/ 6) * 255);
        }
        else{
            green = 0;
        }
        return green
    }

    determineBlue(posx, width){
        var blue;
        //Determine Blue value
        if(posx >= width * 3/6 && posx <= width * 5/6){
            blue = 255;
        }
        else if(posx > width * 2/6 && posx < width * 3/6){
            blue = Math.floor((posx - (width * 2/6)) / (width * 1/ 6) * 255);
        }
        else if(posx > width * 5/6){
            blue = 255 - Math.floor((posx - ((width * 5/6))) / ( width * 1/ 6) * 255);
        }
        else{
            blue = 0;
        }

        return blue;

    }

    isOver255(num){
        if(num > 255){
            return 255;
        }
        return num;
    }

    isNegative(num){
        if(num < 0){
            return 0;
        }
        return num;
    }


}