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

    /**
     * Display the error in the UI
     * @param {string} err 
     */
    displayError = (err) => {
        const errDisplay = this.root.getElementById("error-display");
        errDisplay.textContent = err;
        setTimeout(() => {
            errDisplay.textContent = "";
        }, 2000)
    }
}

export default AppView;