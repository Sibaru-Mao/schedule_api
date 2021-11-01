import server from './server'
import { read, IWorkBook } from 'ts-xlsx';


export default class {
  mysql = new server

  async show_personnel() {
    return await this.mysql.select('whitelist')
  }

  async change_personnel(body: any) {
    let list = ["id", "username", "mail", "permission"]
    let data = body.data
    let sql = `DELETE FROM whitelist WHERE id=${JSON.stringify(data[0])}`
    console.log(sql);
    await this.mysql.sql(sql)

    if (body.status) {
      sql = this.insert_sql("whitelist", list, data)
    }
    return await this.mysql.sql(sql)
  }

  async show_maintenance_data() {
    let data = await this.mysql.select('psekmodelmapping')
    return this.format_data(data)
  }

  format_data = (data: any) => {
    const res: any = {}
    let list: any = []
    // line分类并创建line的数组
    data.forEach((e: any) => {
      if (!res[e.modeltype]) {
        res[e.modeltype] = []
        res[e.modeltype].push(e.model)
      } else {
        res[e.modeltype].push(e.model)
      }
    })
    return res
  }

  composition_data(data: any) {
    let composition_data: any = []
    console.log();

    data.forEach((element: any) => {
      element.forEach((elem: any, id: any) => {
        if (id != 0 && elem != '') {
          composition_data.push([element[0], elem])
        }
      });
    });
    return composition_data
  }

  async change_maintenance(data: any) {
    let list = ["modeltype", "model"]//,"username","trndate"]
    await this.mysql.sql("DELETE FROM psekmodelmapping")
    data = this.composition_data(data)
    let sql = this.insert_sql("psekmodelmapping", list, data)
    return await this.mysql.sql(sql)
  }

  insert_sql(database: any, list: any, data: any) {
    let template = list.join(',')
    let insert_sql = `INSERT INTO ${database}(${template}) VALUES`
    /* 数据插入，区分首条数据 */
    let insert = (id: number) => {
      return id != 0 ? ',' : ''
    }
    if (Array.isArray(data[0])) {
      data.forEach((element: any, index: any) => {
        insert_sql += insert(index)
        let sql = '('
        element.forEach((elem: any, id: any) => {
          sql += insert(id)
          sql += JSON.stringify(elem)
        });
        sql += ')'
        insert_sql += sql
      });
    } else {
      let sql = '("'
      sql+=data.join('","')
      sql += '")'
      insert_sql += sql
    }
    console.log(insert_sql);

    return insert_sql

  }
   

  async get_permission(user: any) {
    let sql = `SELECT permission FROM whitelist WHERE id=${user}`
    return await this.mysql.sql(sql)
  }
}