import ButtonModel from "./ButtonModel";

class AppView {
    /**
     * Constructs the User Interface.
     * @param {HTMLDocument} root 
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * Converts the ButtonModel into a displayable HTML
     * @param {ButtonModel} button 
     * @returns {HTMLButtonElement} the button element
     */
    buttonToHTML = (button) => {
        const buttonElement = document.createElement("button");
        if (button.color !== null) {
            buttonElement.style = `background-color: ${button.color}; `
        }
        if (button.position !== null) {
            buttonElement.style.concat(
                "position: absolute; ",
                `top: ${button.position.x}; `,
                `left: ${button.position.y};`
            )
        }
        return buttonElement;
    }

    /**
     * Display the buttons in the model 
     * @param {ButtonModel[]} buttons 
     */
    displayButtons = (buttons) => {
        const gameArea = this.root.getElementById("game-area");
        buttons.forEach((button) => {
            gameArea.appendChild(buttonToHTML(button));
        });
    }
}

export default AppView;