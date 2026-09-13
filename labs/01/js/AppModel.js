import GameButtonModel from "./GameButtonModel.js";
import Vec2 from "./utils/Vec2.js";
import CONFIG from "../lang/config.js";
import Utils from "./utils/Utils.js";
import GameState from "./GameState.js";

class AppModel {
    /**
     * Instantiate an app model with a config. 
     * @constructor
     * @param {CONFIG} config - the configuration file
     */
    constructor(config) {
        /**
         * @type {GameButtonModel[]}
         */
        this.buttons = [];

        /**
         * @type {typeof CONFIG} the configuration file
         */
        this.config = config;

        /**
         * @type {GameState}
         */
        this.gameState = GameState.getInstance();
    }

    /**
     * Obtain a shallow copy of the buttons in the app. 
     * @returns {GameButtonModel[]} the button array 
     */
    getButtons = () => [...this.buttons];

    /**
     * Creates several buttons based on the count input.
     * @param {number} count - count of buttons to create
     * @returns {boolean} if an error occured
     */
    createButtons = (count) => {
        this.buttons.length = 0; // clear buttons

        if (count < 3 || count > 7) {
            return true;
        }

        const colors = Utils.shuffled([...this.config.gameButtonColors]);
        for (let i = 0; i < count; i++) {
            this.buttons[i] = new GameButtonModel(
                i + 1, 
                colors[i], 
                null, 
                this.config.gameButtonWidthEm,
                this.config.gameButtonHeightEm
            );
        } 
        return false;
    }

    /**
     * Scramble the positions of the buttons.
     * 
     * @param {[number, number]} dimension - window dimensions in em
     */
    randomizePositions = (dimensions) => {
        this.buttons.forEach((button) => {
            const [ windowWidthEm, windowHeightEm ] = dimensions;
            // Note the offsets (+x is to the right, +y is down)
            const maxX = windowWidthEm - this.config.gameButtonWidthEm;
            const maxY = windowHeightEm - this.config.gameButtonHeightEm;
            const newPosition = Vec2.randomVec(
                0, maxX, 0, maxY
            );

            button.setPosition(newPosition);
        });
    }

    /**
     * Update the game state depending on `buttonId` clicked. 
     * 
     * @param {string} gButtonId - the id of the button clicked
     * @returns {[boolean, boolean]} if the game is finished, 
     *                               and if the game is won
     */
    update = (gButtonId) => {
        const gButtonClicked = parseInt(gButtonId.slice(-1));
        this.gameState.click(gButtonClicked, this.buttons.length);
        return [this.gameState.isCompleted, this.gameState.isSuccess];
    }

    resetGame = () => {
        this.gameState.reset();
    }
}

export default AppModel;