import Vec2 from "./utils/Vec2.js";

const BTN_ENAME = "button";
const SPAN_ENAME = "span";
const LABEL_CNAME = "label";
const GAME_BTN_CNAME = "game-button"



class GameButtonModel {
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
     * Converts the ButtonModel into a displayable HTML.
     * 
     * @param {GameButtonModel} button 
     * @returns {HTMLButtonElement} the button element
     */
    toHTML = () => {
        const buttonElement = document.createElement(BTN_ENAME);
        const labelSpan = document.createElement(SPAN_ENAME);
        labelSpan.className = LABEL_CNAME;
        labelSpan.textContent = this.label;
        let style = `width: ${this.widthEm}em; height: ${this.heightEm}em; `;

        if (this.color !== null) {
            style = style.concat(`background-color: ${this.color}; `);
        }
        if (this.position !== null) {
            style = style.concat(
                `position: absolute;
                 left: ${this.position.x}em;
                 top: ${this.position.y}em;`
            );
        }
        buttonElement.style = style;
        buttonElement.appendChild(labelSpan);
        buttonElement.className = GAME_BTN_CNAME;
        buttonElement.id = GAME_BTN_CNAME.concat();
        return buttonElement;
    }
}

export default GameButtonModel;