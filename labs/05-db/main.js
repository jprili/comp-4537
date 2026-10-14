import SQLConnection from "./modules/SQLConnection.js";
import Listener from "./modules/Listener.js";
import url from "url";

const main = async () => {
    const basePath = /\/05\/api\/((query)\/"(.*)"|(insert)\/?)$/;
    const listener = new Listener(process.env.LISTENER_PORT);
    listener.setCallback(async (req, res) => {
        let q = url.parse(req.url, true);
        const match = decodeURI(q.pathname).match(basePath);
        if (!match) {
            res.writeHeader(403);
            res.end("Invalid request");
            return;
        }
        
        const connection = new SQLConnection(process.env.DATABASE_URL);
        try {
            connection.connect();
        } catch (e) {
            res.writeHeader(500);
            res.end(`Database Error ${e}`);
            return;
        }

        let result;
        if (req.method === "GET" && match[2] === "query" && match[3]) {
            const query = match[3];
            try {
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
                const { name, dateOfBirth } = JSON.parse(rawBody);
                connection.connect()
                connection.query`
                    insert into patients(name, dateofbirth) 
                    values (${name}, ${dateOfBirth});
                `
            });
            result = { result: "Query sent." }
        }
        connection.disconnect();
        res.writeHeader(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(result));
    })
    listener.buildServer()
    listener.start()
}

main();