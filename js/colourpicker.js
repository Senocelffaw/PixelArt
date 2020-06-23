export default class ColourPicker{

    curentColour = "#ffffff";

    getColour(){
        
    }

    getMousePos(event){
        var rect = this.canvas.getBoundingClientRect();
        return{
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

}