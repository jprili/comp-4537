import AppModel from "./AppModel.js";
import AppView from "./AppView.js";

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

    onClickGo = () => {
        const value = this.view.root.getElementById("button-count").value;
        const err = this.model.createButtons(value);
        if (err !== null) {
            console.log(err);
            return;
        } 

        this.model.randomisePositions(this.view.getWindowDimensionsEm());
        this.view.displayButtons(this.model.buttons);
    }

    setup = () => {
        this.view.root.getElementById("go").onclick = this.onClickGo;
    }
}

export default AppController;