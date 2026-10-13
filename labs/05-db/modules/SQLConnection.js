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
        let result;
        try {
            result = await this.connection(strings, ...params);
        } catch (e) {
            console.error(e);
            result = [];
        }
        return result; 
    }
}

export default SQLConnection