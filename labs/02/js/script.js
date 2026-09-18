import CONFIG from "../lang/config.js";
import HomeView from "./HomeView.js";

const main = async () => { 
    const msgs = await import(
        `../lang/messages/${CONFIG.appLang}/user.js`
    );
    const homeView = new HomeView(msgs.default);
    homeView.setup()
}

main();