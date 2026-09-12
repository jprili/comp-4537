import AppController from "./AppController";
import AppModel from "./AppModel";
import AppView from "./AppView";

const main = () => { 
    const model = new AppModel();
    const view = new AppView();
    const controller = new AppController(view, model);

    console.debug("No problems?");
}

main();