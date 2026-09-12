import AppModel from "./AppModel.js";
import AppView from "./AppView.js";
import Utils from "./utils/Utils.js";

class AppController {

    /**
     * Constructs the application controller
     * @param {AppView} view 
     * @param {AppModel} model 
     */
    constructor(view, model) {
        this.view = view;
        this.model = model; 
    }

    /**
     * Start the memory game.
     * May need refactoring.
     */
    startGame = async () => {
        const value = this.view.root.getElementById("button-count").value;
        const err = this.model.createButtons(value);
        if (err !== null) {
            this.view.displayError(err);
        } else {
            const buttonModels = this.model.getButtons();
            this.view.displayButtons(buttonModels);
            this.view.forEachButtonView(b => { b.disabled = true; })

            await Utils.sleep(buttonModels.length * 1000);
            for (let i = 0; i < 3; ++i) {
                this.model
                    .randomizePositions(this.view.getWindowDimensionsEm());
                this.view.displayButtons(buttonModels);
                this.view.forEachButtonView(b => { b.disabled = true; })
                if (i != 2) {
                    await Utils.sleep(2000);
                }
            } 
            const gButtonViews = this.view.gButtonViews;
            for (const gButton of gButtonViews) {
                const label = gButton.getElementsByClassName("label")[0];
                label.hidden = true;
                gButton.onclick = () => this.onClickGameButton(gButton);
                gButton.disabled = false;
            }
        }
    }

    /**
     * Starts the game when clicked. 
     * @param {HTMLElement} goButton 
     */
    onClickGo = async (goButton) => {
        goButton.disabled = true;
        await this.startGame();
    }

    /**
     * Updates the state of the game and view when clicked.
     * @param {HTMLElement} gameButton
     */
    onClickGameButton = (gameButton) => {
        const labelSpan = gameButton.getElementsByClassName("label")[0];
        labelSpan.toggleAttribute("hidden");
    }

    setup = () => {
        const goButton = this.view.root.getElementById("go");
        goButton.onclick = () => this.onClickGo(goButton);
    }
}

export default AppController;