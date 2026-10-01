import http from "http";
import url from "url";
import { getDate } from "./modules/utils.js";

const PORT = 3000;
const LANG = "en";

http.createServer(async (req, res) => {
    let q = url.parse(req.url, true);
    res.writeHead(200, {"Content-Type": "text/html"});
    if (!q.pathname.match(/\/labs\/04\/getDate\/?/)) {
        res.end("Bad request");
    } else {
        const jsonObj = await import(
            `./lang/${LANG}.json`, {with: {type: "json"}});
        const greeting = jsonObj.default.greeting;
        res.end(
            `<span style="color: blue;">
                ${greeting.replace("%1", q.query["name"])} ${getDate()}
            </span>`
        );
    }
}).listen(PORT);
