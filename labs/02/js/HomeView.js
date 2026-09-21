const labTitleID = "lab-title"
const readerLink = "reader.html"
const writerLink = "writer.html"

class HomeView {
    /**
     * @constructor
     * @param {USER_MSGS} msgs - object in user.js file
     */
    constructor(msgs) {
        /**
         * @type {USER_MSGS}
         */
        this.msgs = msgs
    }

    /**
     * Generate a <li> with link
     * @param {string} text - display text
     * @param {string} link
     * @returns {HTMLElement} list item
     */
    #generateListLinkItem = (text, link) => {
        const linkElement = document.createElement("a")
        linkElement.href = link
        linkElement.textContent = text
        const item = document.createElement("li");
        item.appendChild(linkElement)
        return item
    }

    /**
     * Setup the DOM for the homepage.
     */
    setup = () => {
        const labTitle = document.createElement("h1");
        labTitle.id = labTitleID;
        document.title = this.msgs.labTitle;
        labTitle.textContent = this.msgs.labTitle;

        const list = document.createElement("ul");
        list.appendChild(
            this.#generateListLinkItem(
                this.msgs.linkToWriterText,
                writerLink
            )
        );
        list.appendChild(
            this.#generateListLinkItem(
                this.msgs.linkToReaderText,
                readerLink
            )
        );
        const mainDiv = document.getElementById("main");
        mainDiv.appendChild(labTitle)
        mainDiv.appendChild(list);
    }
}

export default HomeView;