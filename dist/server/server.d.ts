import { MysqlDataSource } from './../datasources/mysql.datasource';
export default class {
    mysql: MysqlDataSource;
    select(table: any): Promise<any>;
    sql(sql: any): Promise<any>;
}
