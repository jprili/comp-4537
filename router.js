import { env } from "cloudflare:workers";

export default {
    async fetch(req) {
        const backends = {
            "/labs/04/getDate": env.GET_DATE_04,
            "/labs/04/fileIO":  env.FILE_IO_04,
        }

        const url = new URL(req.url);
        for (const [path, target] of Object.entries(backends)) {
            if (url.pathname.startsWith(path)) {
                return fetch(new URL(url.pathname + url.search, target), req);
            }
        }
    }
}