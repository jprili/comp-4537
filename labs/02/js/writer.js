import StorageDAO from "./StorageDAO.js";
import CONFIG from "../lang/config.js";

const fieldsID = "fields";
const addButtonID = "add-btn";
const dateContainerID = "date-container";
const nextIDKey = "next-id";

class Writer {
    constructor(dao, msgs) {
        /**
         * @type {{[key: string]: HTMLElement}}
         */
        this.fields = {};

        /**
         * @type {StorageDAO}
         */
        this.dao = dao;

        /**
         * @type {USER_MSGS}
         */
        this.msgs = msgs;

        /**
         * @type {number}
         */
        this.nextID = 0;
    }

    /**
     * 
     * @param {Date | null} date 
     */
    updateStoredAt = (date = null) => {
        const dateContainer = document.getElementById(dateContainerID);
        if (date === null) {
            date = new Date();
        } 
        dateContainer.textContent = date.toTimeString();
    }

    addFieldGroup = (modelID, value = "") => {
        const field = document.createElement("div");
        const textArea = document.createElement("textarea");
        const removeBtn = document.createElement("button");

        field.id = `field-${modelID}`;
        textArea.className = `content`;
        textArea.value = value
        removeBtn.className = `remove-button`;
        removeBtn.textContent = this.msgs.removeButtonText;

        field.appendChild(textArea);
        field.appendChild(removeBtn);

        removeBtn.onclick = () => this.removeFieldGroup(modelID); 
        textArea.oninput = () => this.onInputField(modelID);
        this.fields[modelID] = field;
        this.dao.update(modelID, value);
        this.updateStoredAt()
        document.getElementById(fieldsID).appendChild(field);
    }

    onInputField = (modelID) => {
        const element = this.fields[modelID];
        const value = element.getElementsByClassName("content")[0].value
        this.dao.update(modelID, value);
        this.updateStoredAt();
    }

    onAddFieldGroup = () => {
        this.addFieldGroup(this.nextID);
        this.incrementID();
    } 

    removeFieldGroup = (toRemoveId) => {
        const element = this.fields[toRemoveId];
        element.remove();
        delete this.fields[toRemoveId];
        this.dao.remove(toRemoveId);
        this.updateStoredAt()
    }

    loadFromStorage = () => {
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

    generateStoredAtText = (value = "") => {
        const container = document.createElement("div");
        const storedAt = document.createElement("span");
        storedAt.textContent = this.msgs.storedAtText;
        const dateContainer = document.createElement("span");
        dateContainer.id = dateContainerID;
        dateContainer.textContent = value;
        container.appendChild(storedAt);
        container.appendChild(dateContainer);
        return container;
    }

    setup = () => {
        const mainDiv = document.getElementById("main");
        const fieldsDiv = document.createElement("div");
        const addButton = document.createElement("button");

        fieldsDiv.id = fieldsID;
        addButton.id = addButtonID;
        addButton.textContent = this.msgs.addButtonText;
        addButton.onclick = this.onAddFieldGroup;

        mainDiv.appendChild(this.generateStoredAtText());
        mainDiv.appendChild(fieldsDiv);
        mainDiv.appendChild(addButton);

        this.nextID = parseInt(this.dao.get(nextIDKey) || "0");
        this.loadFromStorage();
    }
}

const main = async () => {
    const msgs = await import(
        `../lang/messages/${CONFIG.appLang}/user.js`
    );
    const writer = new Writer(new StorageDAO(localStorage), msgs.default);
    writer.setup();
}

main();