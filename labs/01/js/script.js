import AppController from "./AppController.js";
import AppModel from "./AppModel.js";
import AppView from "./AppView.js";

const main = () => { 
    const model = new AppModel();
    const view = new AppView(document);
    const controller = new AppController(view, model);

    controller.setup();
}

main();