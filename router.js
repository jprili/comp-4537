const BACKENDS = {
    "/labs/04/getDate": process.env.GET_DATE_04,
    "/labs/04/fileIO": process.env.FILE_IO_04,
}

export default {
    async fetch(req) {
        console.debug(req);
        const url = new URL(req.url);
        for (const [path, target] of Object.entries(BACKENDS)) {
            if (url.pathname.startsWith(path)) {
                return fetch(new URL(url.pathname + url.search, target), req);
            }
        }
        return fetch(req);
    }
}