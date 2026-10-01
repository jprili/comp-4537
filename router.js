import { env } from "cloudflare:workers";

export default {
    async fetch(req) {
        const backends = {
            "/labs/04/getDate": env.GET_DATE_04,
            "/labs/04/readFile":  env.FILE_IO_04,
            "/labs/04/writeFile":  env.FILE_IO_04,
        }

        const url = new URL(req.url);
        for (const [path, target] of Object.entries(backends)) {
            if (url.pathname.startsWith(path)) {
                const newURL = new URL(url.pathname + url.search, target);
                return fetch(newURL, req);
            }
        }
        return fetch(req);
    }
}