import ButtonModel from "./ButtonModel.js";
import Vec2 from "./utils/Vec2.js";
import CONFIG from "../lang/config.js";

class AppModel {
    /**
     * Instantiate an app model with a config. 
     * @constructor
     * @param {CONFIG} config - the configuration file
     */
    constructor(config) {
        /**
         * @type {ButtonModel[]}
         */
        this.buttons = [];

        /**
         * @type {typeof CONFIG} the configuration file
         */
        this.config = config;
    }

    /**
     * Creates several buttons based on the count input.
     * @param {number} count - count of buttons to create
     * @returns {[string | null]} an error message if not null
     */
    createButtons = (count) => {
        this.buttons.length = 0; // clear buttons

        if (count < 3 || count > 7) {
            return `invalid count argument: ${count}`;
        }

        const colors = [...this.config.gameButtonColors];
        for (let i = 0; i < count; i++) {
            // TODO: randomise colour
            this.buttons[i] = new ButtonModel(
                i + 1, 
                colors[i], 
                null, 
                this.config.gameButtonWidthEm,
                this.config.gameButtonHeightEm
            );
        } 

        return null
    }

    /**
     * Scramble the positions of the buttons.
     * 
     * @param {[number, number]} window dimensions in em
     */
    randomisePositions = (dimensions) => {
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
}

export default AppModel;