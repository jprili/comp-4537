import SQLConnection from "./modules/SQLConnection.js";
import Listener from "./modules/Listener.js";
import url from "url";

const main = async () => {
    const basePath = /\/05\/api\/((query)\/(.*)|(insert)\/?)$/;
    const listener = new Listener(process.env.LISTENER_PORT);

    /* MAIN BUSINESS LOGIC */
    listener.setCallback(async (req, res) => {

        /* SET CORS OPTIONS */
        res.setHeader(
            "Access-Control-Allow-Origin", 
            process.env.ORIGIN || process.env.RENDER_EXTERNAL_HOSTNAME || "*"
        );
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        /* PREFLIGHT */
        if (req.method === "OPTIONS") {
            res.writeHead(204); // No Content
            res.end();
            return;
        }

        let q = url.parse(req.url, true);
        const match = q.pathname.match(basePath);
        if (!match) {
            res.writeHeader(403);
            res.end("Invalid request");
            return;
        }

        /* PROCESS REQUESTS */
        let connection;
        let result;
        if (req.method === "GET" && match[2] === "query" && match[3]) {
            console.log(`INFO: received query "${match[3]}"`);
            const query = atob(decodeURIComponent(match[3]));
            try {
                connection = new SQLConnection(
                    process.env.DATABASE_URL_READER
                );
                connection.connect()
                result = {
                    result: await connection.unsafeQuery(query)
                };
            } catch (e) {
                res.writeHeader(500, {"Content-Type": "application/json"});
                res.end(JSON.stringify({ result: [], error: `Error: ${e}` }));
                return;
            }
        } else if (req.method === "POST" && match[1] === "insert") {
            let rawBody = "";
            req.on("data", (chunk) => {
                rawBody += chunk;
            });
            req.on("end", () => {
                console.log(
                    `INFO: received insert request with body ${rawBody}`
                );
                const { name, dateOfBirth } = JSON.parse(rawBody);
                connection = new SQLConnection(process.env.DATABASE_URL);
                connection.connect()
                connection.query`
                    insert into patients(name, dateofbirth) 
                    values (${name}, ${dateOfBirth});
                `

            });
            result = { result: "Query sent." }
        }

        /* GUARD DISCONNECT */
        connection.disconnect()
        res.writeHeader(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(result));
    })
    listener.buildServer()
    listener.start()
}

main();