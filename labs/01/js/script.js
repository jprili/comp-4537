import AppController from "./AppController.js";
import AppModel from "./AppModel.js";
import AppView from "./AppView.js";
import CONFIG from "../lang/config.js";

const main = async () => { 
    const model = new AppModel(CONFIG);
    const view = new AppView(document);
    const controller = new AppController(view, model);
    const msgs = await import(`../lang/messages/${CONFIG.appLang}/user.js`);
    controller.msgs = msgs.default;

    controller.setup();
}

main();