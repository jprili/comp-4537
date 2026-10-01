import { env } from "cloudflare:workers";

export default {
    async fetch(req) {
        const backends = {
            "/labs/04/getDate": env.GET_DATE_04,
            "/labs/04/fileIO":  env.FILE_IO_04,
        }

        const url = new URL(req.url);
        console.debug(url);
        for (const [path, target] of Object.entries(backends)) {
            if (url.pathname.startsWith(path)) {
                const newURL = new URL(url.pathname + url.search, target);
                console.debug(newURL);
                return fetch(newURL, req);
            }
        }
    }
}