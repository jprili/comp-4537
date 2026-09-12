import ButtonModel from "./ButtonModel.js";
import Vec2 from "./utils/Vec2.js";

class AppModel {
    constructor() {
        this.buttons = [];
    }

    /**
     * Creates several buttons based on the count input.
     * @param {number} count 
     * @returns {[string | null]} an error message if not null
     */
    createButtons = (count) => {
        this.buttons.length = 0; // clear buttons

        if (count < 3 || count > 7) {
            return `invalid count argument: ${count}`;
        }

        for (let i = 0; i < count; i++) {
            // TODO: randomise colour
            this.buttons[i] = new ButtonModel(i + 1, "#fff", null);
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
            const maxX = windowWidthEm - ButtonModel.WIDTH;
            const maxY = windowHeightEm - ButtonModel.HEIGHT;
            const newPosition = Vec2.randomVec(
                0, maxX, 0, maxY
            );

            button.setPosition(newPosition);
        });
    }
}

export default AppModel;