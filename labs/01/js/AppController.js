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
        this.msgs  = null;
    }

    setupGameButtons = async () => {
        const buttonModels = this.model.getButtons();

        // disable the displayed buttons
        this.view.displayButtons(buttonModels);
        this.view.forEachButtonView(b => { b.disabled = true; })

        await Utils.sleep(buttonModels.length * 1000);

        // scramble
        for (let i = 0; i < 3; ++i) {
            this.model
                .randomizePositions(this.view.getWindowDimensionsEm());

            // small issue here is that it clears the area every time
            this.view.displayButtons(buttonModels);
            this.view.forEachButtonView(b => { b.disabled = true; })

            if (i != 2) {
                await Utils.sleep(2000);
            }
        } 

        // connect callbacks
        const gButtonViews = this.view.gButtonViews;
        for (const gButton of gButtonViews) {
            const label = gButton.getElementsByClassName("label")[0];
            label.hidden = true;
            gButton.onclick = () => this.onClickGameButton(gButton);
            gButton.disabled = false;
        }
    }

    /**
     * Start the memory game.
     * May need refactoring.
     */
    startGame = async () => {
        const value = this.view.root.getElementById("button-count").value;
        const err = this.model.createButtons(value);
        const goButton = this.view.root.getElementById("go");
        if (err) {
            this.view.displayMessage(this.msgs.invalidInput);
            goButton.disabled = false;
        } else {
            this.setupGameButtons();
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

    handleCompletion = async (isSuccess) => {
        const goButton = this.view.root.getElementById("go");
        if (!isSuccess) {
            // show rest for like two seconds
            this.view.forEachButtonView(b => { 
                const labelSpan = b.getElementsByClassName("label")[0];
                labelSpan.hidden = false;
                b.disabled = true;
            });
            await Utils.sleep(2000);
        }
        this.view.clearGameArea();
        this.model.resetGame();
        goButton.disabled = false;
    }

    /**
     * Updates the state of the game and view when clicked.
     * @param {HTMLElement} gameButton
     */
    onClickGameButton = async (gameButton) => {
        const labelSpan = gameButton.getElementsByClassName("label")[0];
        labelSpan.toggleAttribute("hidden");
        const [isCompleted, isSuccess] = this.model.update(gameButton.id);
        if (isCompleted) {
            this.view.displayMessage( 
                isSuccess ? this.msgs.gameSuccess : this.msgs.gameFail
            );
            this.handleCompletion(isSuccess);
        }
    }

    setup = () => {
        const goButton = this.view.root.getElementById("go");
        goButton.onclick = () => this.onClickGo(goButton);
    }
}

export default AppController;