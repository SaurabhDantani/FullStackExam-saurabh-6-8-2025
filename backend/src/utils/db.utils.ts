import { dataSource } from "../config/db.mysql";

class DbUtil {
    async getDefaultConnection() {
        return dataSource
    }

    async init() {
        console.log("Creating connection to database...");
        await dataSource;
        const db = await dataSource.initialize();
        if (!db.isInitialized) {
            console.log("Database is not initialized");
        }
    }
    
}

export default new DbUtil();