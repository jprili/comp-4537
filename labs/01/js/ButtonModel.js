import Vec2 from "./utils/Vec2.js";

class ButtonModel {
    static WIDTH = 10; // em
    static HEIGHT = 5; // em

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

    /**
     * Set the button's position.
     * @param {Vec2 | null} position 
     */
    setPosition = (position) => {
        this.position = position
    }
}

export default ButtonModel;