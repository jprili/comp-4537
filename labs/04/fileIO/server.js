import http from "http";
import fs from "fs";
import url from "url";

const PORT = process.env.PORT || 3000;
const WRITE_TARGET = "file.txt";

const resBadRequest = (res) => {
    res.writeHead(400);
    res.end("Bad request");
} 

http.createServer(async (req, res) => {
    let q = url.parse(req.url, true);

    // GUARD
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
                res.writeHead(200, {"Content-Type": "text"});
                res.end("OK");
            }
        );
    } else if (
        q.pathname.match(/\/labs\/04\/readFile\/*/) 
        && q.pathname.endsWith(WRITE_TARGET)
    ) {
        const data = fs.readFile(WRITE_TARGET,
            err => {
                if (err) {
                    console.log(err);
                }
                res.writeHead(200, {"Content-Type": "text"});
                res.end(data);
            }
        );
    } else {
        res.writeHead(404);
        res.end("Not found");
    }
}).listen(PORT);