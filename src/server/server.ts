import {MysqlDataSource} from './../datasources/mysql.datasource';

export default class {
  mysql = new MysqlDataSource

  async select(table: any) {
    return await this.mysql.execute(`select * from ${table}`)
  }

  async sql(sql: any) {
    return await this.mysql.execute(sql)
  }
}
