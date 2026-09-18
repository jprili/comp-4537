import StorageDAO from "./StorageDAO.js";
import CONFIG from "../lang/config.js";

const fieldsID = "fields";
const nextIDKey = "next-id";

class Reader {

    constructor(dao) {
        /**
         * @type {Storage}
         */
        this.dao = dao
    }

    addFieldGroup = (modelID, value = "") => {
        const field = document.createElement("div");
        const textArea = document.createElement("textarea");
        field.id = `field-${modelID}`;
        textArea.disabled = true;
        textArea.className = `content`;
        textArea.value = value
        field.appendChild(textArea);
        document.getElementById(fieldsID).appendChild(field);
    }

    loadFromStorage = () => {
        document.getElementById(fieldsID).replaceChildren();
        for (let i = 0; i < this.nextID; i++) {
            const val = this.dao.get(i);
            if (val !== null) {
                this.addFieldGroup(i, val);
            }
        }
    }

    incrementID = () => {
        ++this.nextID;
        this.dao.update(nextIDKey, this.nextID);
    }

    setup = () => {
        const mainDiv = document.getElementById("main");
        const fieldsDiv = document.createElement("div");
        fieldsDiv.id = fieldsID;
        window.onstorage = this.loadFromStorage;
        mainDiv.appendChild(fieldsDiv);

        this.nextID = parseInt(this.dao.get(nextIDKey) || "0");
        this.loadFromStorage();
    }
}

const main = async () => {
    const msgs = await import(
        `../lang/messages/${CONFIG.appLang}/user.js`
    );
    const reader = new Reader(new StorageDAO(localStorage), msgs.default);
    reader.setup();
}

main();