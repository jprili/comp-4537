import ButtonModel from "./ButtonModel";
import Vec2 from "./utils/Vec2";

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

    randomisePositions = () => {
        this.buttons.forEach((button) => {
            let newPosition = Vec2.randomVec(
                0, window.innerWidth, 0, window.innerHeight
            );
            button.setPosition(newPosition);
        });
    }
}

export default AppModel;