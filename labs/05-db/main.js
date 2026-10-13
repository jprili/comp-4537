import SQLConnection from "./modules/SQLConnection.js";

const main = async () => {
    const connection = new SQLConnection(process.env.DATABASE_URL);
    connection.connect();
    const result = await connection.query`select * from patients`;
    console.debug(result);
    connection.disconnect();
}

main();