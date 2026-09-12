import GameButtonModel from "./GameButtonModel.js";

class AppView {
    /**
     * Constructs the User Interface.
     * @param {HTMLDocument} root
     */
    constructor(root) {
        /**
         * @type {HTMLDocument}
         */
        this.root = root;

        /**
         * @type {HTMLElement[]}
         */
        this.gButtonViews = [];
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
     * Apply a side-effect for each button in the view.
     * @param {(e: HTMLElement) => void} fn - function to apply 
     */
    forEachButtonView = (fn) => {
        this.gButtonViews.forEach(fn);
    }

    /**
     * Display the buttons in the model 
     * @param {GameButtonModel[]} buttons 
     */
    displayButtons = (buttons) => {
        const gameArea = this.root.getElementById("game-area");
        gameArea.replaceChildren();   // clear children
        this.gButtonViews = []; // clear buttonElements
        buttons.forEach((button) => {
            const buttonView = button.toHTML();
            gameArea.appendChild(buttonView);
            this.gButtonViews.push(buttonView);
        });
    }

    /**
     * Display the message in the UI
     * @param {string} msg
     */
    displayMessage = (msg) => {
        const errDisplay = this.root.getElementById("error-display");
        errDisplay.textContent = msg;
        setTimeout(() => {
            errDisplay.textContent = "";
        }, 2000)
    }

    /**
     * Remove the displayed buttons in the game area.
     */
    clearGameArea = () => {
        this.gButtonViews = []
        this.root.getElementById("game-area").replaceChildren();
    }
}

export default AppView;