import CONFIG from "../lang/config.js";

const main = async () => { 
    const msgs = await import(
        `../lang/messages/${CONFIG.appLang}/user.js`
    );
}

main();