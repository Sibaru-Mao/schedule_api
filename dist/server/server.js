"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_datasource_1 = require("./../datasources/mysql.datasource");
class default_1 {
    constructor() {
        this.mysql = new mysql_datasource_1.MysqlDataSource;
    }
    async select(table) {
        try {
            return await this.mysql.execute(`select * from ${table}`);
        }
        catch (error) {
            console.log("!!select ERROR:", error);
        }
    }
    async sql(sql) {
        try {
            return await this.mysql.execute(sql);
        }
        catch (error) {
            console.log("!!SQL ERROR:", error);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=server.js.map