import StorageDAO from "./StorageDAO.js";
import CONFIG from "../lang/config.js";

const fieldsID = "fields";
const nextIDKey = "next-id";
const dateContainerID = "date-container";

class Reader {
    constructor(dao, msgs) {
        /**
         * @type {Storage}
         */
        this.dao = dao;

        /**
         * @type {number}
         */
        this.nextID = 0;

        /**
         * @type {USER_MSGS}
         */
        this.msgs = msgs;
    }

    generateUpdatedAtText = (value = "") => {
        const container = document.createElement("div");
        const storedAt = document.createElement("span");
        storedAt.textContent = this.msgs.updatedAtText;
        const dateContainer = document.createElement("span");
        dateContainer.id = dateContainerID;
        dateContainer.textContent = value;
        container.appendChild(storedAt);
        container.appendChild(dateContainer);
        return container;
    }

    /**
     * 
     * @param {Date | null} date 
     */
    updateUpdatedAt = (date = null) => {
        const dateContainer = document.getElementById(dateContainerID);
        if (date === null) {
            date = new Date();
        } 
        dateContainer.textContent = date.toTimeString();
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
        this.updateUpdatedAt();
        for (let i = 0; i < this.nextID; i++) {
            const val = this.dao.get(i);
            if (val !== null) {
                this.addFieldGroup(i, val);
            }
        }
    }

    getNextID = () => {
        this.nextID = parseInt(this.dao.get(nextIDKey) || "0");
    }

    setup = () => {
        const mainDiv = document.getElementById("main");
        const fieldsDiv = document.createElement("div");
        fieldsDiv.id = fieldsID;
        window.onstorage = () => {
            this.getNextID();
            this.loadFromStorage();
        };

        mainDiv.appendChild(this.generateUpdatedAtText());
        mainDiv.appendChild(fieldsDiv);

        this.getNextID();
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