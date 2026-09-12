import ButtonModel from "./ButtonModel.js";

class AppView {
    /**
     * Constructs the User Interface.
     * @param {HTMLDocument} root 
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * Get the window dimensions in em.
     * @returns {[number, number]} width and height of window in em
     */
    getWindowDimensionsEm = () => {
        // px -> em requires font size
        const toEm = (px) => 
            px / 
            parseFloat(
                getComputedStyle(document.querySelector("html")
            )["font-size"]
        );
        
        return [toEm(window.innerWidth), toEm(window.innerHeight)];
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

    /**
     * Display the buttons in the model 
     * @param {ButtonModel[]} buttons 
     */
    displayButtons = (buttons) => {
        const gameArea = this.root.getElementById("game-area");
        gameArea.replaceChildren(); // clear children
        buttons.forEach((button) => {
            gameArea.appendChild(this.buttonToHTML(button));
        });
    }
}

export default AppView;