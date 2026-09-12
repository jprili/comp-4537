import Vec2 from "./utils/Vec2";

class ButtonModel {
    /**
     * 
     * @param {string} label 
     * @param {string | null} color 
     * @param {Vec2   | null} position 
     */
    constructor(label, color, position) {
       this.label = label; 
       this.color = color; 
       this.position = position;
    }

    setPosition = (position) => {
        this.position = position
    }
}

export default ButtonModel;