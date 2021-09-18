"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_datasource_1 = require("./../datasources/mysql.datasource");
class default_1 {
    constructor() {
        this.mysql = new mysql_datasource_1.MysqlDataSource;
    }
    async select(table) {
        return await this.mysql.execute(`select * from ${table}`);
    }
    async sql(sql) {
        return await this.mysql.execute(sql);
    }
}
exports.default = default_1;
//# sourceMappingURL=server.js.map