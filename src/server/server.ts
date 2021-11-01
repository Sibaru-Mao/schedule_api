import {MysqlDataSource} from './../datasources/mysql.datasource';

export default class {
  mysql = new MysqlDataSource

  async select(table: any) {
    try {
      return await this.mysql.execute(`select * from ${table}`)    
    } catch (error) {
      console.log("!!select ERROR:",error);
    }
  }

  async sql(sql: any) {
    try {
      return await this.mysql.execute(sql)   
    } catch (error) {
      console.log("!!SQL ERROR:",error) 
    }
  }
}
