import AppModel from "./AppModel";
import AppView from "./AppView";

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
        const value = this.view.root.getElementById("button-count").value();
        this.model.createButtons()
    }

    setup = () => {

    }
}

export default AppController;