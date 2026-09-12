import Vec2 from "./utils/Vec2.js";

class ButtonModel {
    /**
     * Construct a basic model for a button 
     * @constructor
     * @param {string} label - textContent of the button
     * @param {string | null} color - colour of the button
     * @param {Vec2   | null} position - position of the button
     * @param {number} widthEm - width of the button in em
     * @param {number} heightEm - height of the button in em
     */
    constructor(label, color, position, widthEm, heightEm) {
       this.label = label; 
       this.color = color; 
       this.position = position;
       this.widthEm = widthEm;
       this.heightEm = heightEm;
    }

    /**
     * Set the button's position.
     * @param {Vec2 | null} position 
     */
    setPosition = (position) => {
        this.position = position
    }

    /**
     * Set the button's position.
     * @param {string | null} color
     */
    setColor = (color) => {
        this.color = color
    }
}

export default ButtonModel;