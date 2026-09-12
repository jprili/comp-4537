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

    /**
     * Converts the ButtonModel into a displayable HTML
     * @param {ButtonModel} button 
     * @returns {HTMLButtonElement} the button element
     */
    buttonToHTML = (button) => {
        const buttonElement = document.createElement("button");
        let style = 
            `width: ${button.widthEm}em; height: ${button.heightEm}em;`;

        if (button.color !== null) {
            style = style.concat(`background-color: ${button.color}; `);
        }
        if (button.position !== null) {
            style = style.concat(
                "position: absolute; ",
                `left: ${button.position.x}em;`,
                `top: ${button.position.y}em; `
            );
        }
        buttonElement.style = style;
        buttonElement.textContent = button.label;
        buttonElement.className = "game-button";
        buttonElement.id = `game-button-${button.label}`;
        return buttonElement;
    }
}

export default ButtonModel;