import http from "http";

class Listener {
    #callback;

    constructor(port = 8080) {
        this.port = port;
        this.server = null; 
        this.#callback = null;
    }

    setCallback = (callback) => {
        this.#callback = callback
    }

    buildServer = () => {
        this.server = http.createServer(this.#callback);
    }

    start = () => {
        if (this.server === null) {
            console.log("Server callback not set.");
            return;
        }
        this.server.listen(
            this.port,
            () => { console.log("server running on http://localhost:8080") }
        )
    }
}

export default Listener;