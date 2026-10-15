import postgres from 'postgres'

class SQLConnection {
    constructor(connectionString) {
        this.connectionString = connectionString;
        this.connection = null;
    }

    connect = () => {
        this.connection = postgres(this.connectionString);   
    }

    disconnect = () => {
        this.connection.end();
        this.connection = null;
    }

    query = async (strings, ...params) => {
        console.debug(strings, params);
        return await this.connection(strings, ...params);
    }

    unsafeQuery = async (string) => {
        return await this.connection.unsafe(string, { prepare: true }); 
    }
}

export default SQLConnection