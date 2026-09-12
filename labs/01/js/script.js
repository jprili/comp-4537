import AppController from "./AppController.js";
import AppModel from "./AppModel.js";
import AppView from "./AppView.js";
import CONFIG from "../lang/config.js";

const main = () => { 
    const model = new AppModel(CONFIG);
    const view = new AppView(document);
    const controller = new AppController(view, model);

    controller.setup();
}

main();