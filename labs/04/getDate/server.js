import http from "http";
import url from "url";
import { getDate } from "./modules/utils.js";

const PORT = process.env.PORT || 3000;
const LANG = "en";

const setupCORS = (res, origin) => {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

http.createServer(async (req, res) => {
    setupCORS(res, process.env.ORIGIN || process.env.RENDER_EXTERNAL_HOSTNAME)

    if (req.method === "OPTIONS") {
        res.writeHead(204); // No Content
        res.end();
        return;
    }

    let q = url.parse(req.url, true);
    if (!q.pathname.match(/\/labs\/04\/getDate\/?/)) {
        res.writeHead(400);
        res.end("Bad request");
    } else {
        res.writeHead(200, {"Content-Type": "text/html"});
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
