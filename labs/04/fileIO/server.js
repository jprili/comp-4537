import http from "http";
import fs from "fs";
import url from "url";

const PORT = process.env.PORT || 3000;
const WRITE_TARGET = "file.txt";

const setupCORS = (res, origin) => {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

const resBadRequest = (res) => {
    res.writeHead(400);
    res.end("Bad request");
} 

http.createServer(async (req, res) => {
    setupCORS(res, process.env.ORIGIN || process.env.RENDER_EXTERNAL_HOSTNAME);

    // GUARD
    if (req.method === "OPTIONS") {
        res.writeHead(204); // No Content
        res.end();
        return;
    }

    let q = url.parse(req.url, true);
    if (!q.pathname.match(
        /\/labs\/04\/(write|read)File\/?/
    )) {
        resBadRequest(res);
        return;
    }

    if (q.pathname.match(/\/labs\/04\/writeFile\/?/)) {
        if (q.query["text"] == null) {
            resBadRequest(res);
            return;
        }
        fs.appendFile(WRITE_TARGET, q.query["text"],
            (err) => {
                if (err) {
                    console.log(err);
                }
                console.log(`Write "${q.query["text"]}" sucessful.`);
                res.writeHead(200, {"Content-Type": "text"});
                res.end("OK");
            }
        );
    } else if (
        q.pathname.match(/\/labs\/04\/readFile\/*/) 
        && q.pathname.endsWith(WRITE_TARGET)
    ) {
        fs.readFile(WRITE_TARGET,
            (err, data)=> {
                if (err) {
                    console.log(err);
                    res.writeHead(404);
                    res.end("Not found");
                    return;
                }
                console.log(`Read "${data}" sucessful.`);
                res.writeHead(200, {"Content-Type": "text"});
                res.end(data);
            }
        );
    } else {
        res.writeHead(404);
        res.end("Not found");
    }
}).listen(PORT);