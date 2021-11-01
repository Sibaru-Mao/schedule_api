import server from './server'

export default class {
  mysql = new server

  classification = (data: any, date: any) => {
    date.forEach((element: any) => {
      data[element] = []
    });
  }

  compile_select_data = (list: any, date: any) => {
    let select_sql: string = `SELECT shiftdate,line,line_id,`
    if (list[1] == 'ALL') {
      if (list[2] == 'ALL') {
        select_sql += `day_day_modeltype,day_day_quantity,day_day_status`
        select_sql += `,day_night_modeltype,day_night_quantity,day_night_status FROM line_planing_data WHERE `
      } else if (list[2] == 'D') {
        select_sql += `day_day_modeltype,day_day_quantity,day_day_status`
        select_sql += `,day_night_modeltype=NULL day_night_modeltype,day_night_quantity=NULL day_night_quantity,day_night_status=NULL day_night_status`
        select_sql += ` FROM line_planing_data  WHERE `
      } else {
        select_sql += `day_day_modeltype=NULL day_day_modeltype,day_day_quantity=NULL day_day_quantity,day_day_status=NULL day_day_status`
        select_sql += `,day_night_modeltype,day_night_quantity,day_night_status FROM line_planing_data WHERE `
      }
    } else {
      if (list[2] == 'ALL') {
        select_sql += `case when day_day_modeltype IN ("` + list[1] + `") then  day_day_modeltype END day_day_modeltype,`
        select_sql += `case when day_day_modeltype IN ("` + list[1] + `") then  day_day_quantity END day_day_quantity,`
        select_sql += `case when day_day_modeltype IN ("` + list[1] + `") then  day_day_status END day_day_status,`
        select_sql += `case when day_night_modeltype IN ("` + list[1] + `") then  day_night_modeltype END day_night_modeltype,`
        select_sql += `case when day_night_modeltype IN ("` + list[1] + `") then  day_night_quantity END day_night_quantity,`
        select_sql += `case when day_night_modeltype IN ("` + list[1] + `") then  day_night_status END day_night_status `
        select_sql += `FROM line_planing_data WHERE (day_day_modeltype IN ("` + list[1] + `") OR day_night_modeltype IN ("` + list[1] + `")) AND `
      } else if (list[2] == 'D') {
        select_sql += `case when day_day_modeltype IN ("` + list[1] + `") then  day_day_modeltype END day_day_modeltype,`
        select_sql += `case when day_day_modeltype IN ("` + list[1] + `") then  day_day_quantity END day_day_quantity,`
        select_sql += `case when day_day_modeltype IN ("` + list[1] + `") then  day_day_status END day_day_status,`
        select_sql += `day_night_modeltype=NULL day_night_modeltype,day_night_quantity=NULL day_night_quantity,day_night_status=NULL day_night_status `
        select_sql += `FROM line_planing_data WHERE day_day_modeltype IN ("` + list[1] + `") AND `
      } else {
        select_sql += `day_day_modeltype=NULL day_day_modeltype,day_day_quantity=NULL day_day_quantity,day_day_status=NULL day_day_status,`
        select_sql += `case when day_night_modeltype IN ("` + list[1] + `") then  day_night_modeltype END day_night_modeltype,`
        select_sql += `case when day_night_modeltype IN ("` + list[1] + `") then  day_night_quantity END day_night_quantity,`
        select_sql += `case when day_night_modeltype IN ("` + list[1] + `") then  day_night_status END day_night_status `
        select_sql += `FROM line_planing_data WHERE day_night_modeltype IN ("` + list[1] + `") AND `
      }
    }
    select_sql += `STR_TO_DATE(shiftdate,'%Y%m%d') BETWEEN STR_TO_DATE(` + date[0] + `,'%Y%m%d') AND STR_TO_DATE(` + date[date.length - 1] + `,'%Y%m%d')`
    if (list[0] != "ALL") {
      select_sql += `AND LINE ="` + list[0] + `"`
    }
    return select_sql

  }

  compile_insert_data = (data: any, date: any) => {
    let list: any = []
    let insert_sql = "INSERT INTO line_planing_data(shiftdate,line,line_id,day_day_modeltype,day_day_quantity,day_day_status,day_night_modeltype,day_night_quantity,day_night_status) VALUES"
    data.forEach((element: any) => {
      element.forEach((elem: any, id: any) => {
        if (id != 0) {
          for (let index = 0; index < elem.length; index += 2) {
            list.push({
              'shiftdate': date[index / 2],
              'line': element[0],
              'line_id': id - 1,
              'day_day_modeltype': elem[index]['model'],
              'day_day_quantity': elem[index]['number'],
              'day_day_status': elem[index]['status'],
              'day_night_modeltype': elem[index + 1]['model'],
              'day_night_quantity': elem[index + 1]['number'],
              'day_night_status': elem[index + 1]['status']
            });
          }
        }
      });
    });
    list.forEach((element: any, index: any) => {
      if (index != 0) {
        insert_sql += `,('` + element.shiftdate + `','` + element.line + `',` + element.line_id + `,'` + element.day_day_modeltype + `', ` + Number(element.day_day_quantity) +`, `+element.day_day_status+ `,'` + element.day_night_modeltype + `', ` + Number(element.day_night_quantity) +`, `+element.day_night_status+`)`
      } else {
        insert_sql += `('` + element.shiftdate + `','` + element.line + `',` + element.line_id + `,'` + element.day_day_modeltype + `', ` + Number(element.day_day_quantity) + `, `+element.day_day_status+ `,'` + element.day_night_modeltype + `', ` + Number(element.day_night_quantity) +`, `+element.day_night_status+`)`
      }
    });
    return insert_sql
  }

  //筛选指定日期內的数据
  filter_date = (data: any, date: any) => {
    if (date) {
      let nowData = data.filter((element: any) => {
        return Number(element.shiftdate) >= Number(date[0]) && Number(date[date.length - 1]) >= Number(element.shiftdate)
      });
      return nowData
    }
  }

  //前台表格格式化
  format_data = (data: any, date: any) => {
    const res: any = {}
    let list: any = []
    // line分类并创建line的数组
    data.forEach((e: any) => {
      if (!res[e.line]) {
        res[e.line] = {}
        res[e.line]['line_id'] = []
        res[e.line]['line_id'].push(e)
        this.classification(res[e.line], date)
        list.push([e.line])
      } else {
        res[e.line]['line_id'].push(e)
        this.classification(res[e.line], date)
      }
    })

    // 创建line的行数组且导入sql中数据
    Object.keys(res).forEach((element: any, index: any) => {
      let n = 0
      // Math.max.apply( Math, res[element]['line_id'][line_id] )计算最大行数
      res[element]['line_id'].forEach((elem: any) => {
        if (elem['line_id'] > n) {
          n = elem['line_id']
        }
      });
      for (let i = 1; i <= n + 1; i++) {
        list[index].push([])
        date.forEach((elem: any) => {
          let bl = true
          for (let e of res[element]['line_id']) {
            if (e.shiftdate == elem && e.line_id == i - 1) {
              list[index][i].push({
                "model": e['day_day_modeltype'],
                "number": e['day_day_quantity'],
                "status": e['day_day_status']
              }, {
                "model": e['day_night_modeltype'],
                "number": e['day_night_quantity'],
                "status": e['day_night_status']
              })
              bl = false
              break
            }
            // return e.shiftdate == elem ? e : false
          }
          if (bl) {
            list[index][i].push({
              "model": null,
              "number": '',
              "status": null
            }, {
              "model": null,
              "number": '',
              "status": null
            })
          }
        });
      }
    });
    return list
  }



  async type() {
    return await this.mysql.select('psekmodelmapping')
  }
  async capacity(date: any) {
    const res: any = {}
    let data=(await this.mysql.select('V_SFCLINEOUTPUT'))

    data=this.filter_date(data,date)
    //分类求和
    data.forEach((e: any) => {
      if (!res[e.line]) {
        res[e.line] = {}
        if (!res[e.line][e.model]) {
          res[e.line][e.model] = e.output
        }
      } else {
        if (!res[e.line][e.model]) {
          res[e.line][e.model] = e.output
        } else {
          res[e.line][e.model] += e.output
        }
      }
    })

    Object.keys(res).forEach(element => {
      let list:any=[]
      Object.keys(res[element]).forEach(elem => {
        list.push({
          "model":elem,
          "output":res[element][elem]
        })
      });
      res[element]=list
    });
    return res
  }

  async ca() {
    let data = (await this.mysql.select('V_SFCLINEOUTPUT'))
    return data
  }

  async plant(date: any) {
    let data = await this.mysql.select('line_planing_data')
    data = this.filter_date(data, date)
    return this.format_data(data, date)
  }

  async data(list: any, date: any) {
    let data = await this.mysql.sql(this.compile_select_data(list, date))
    return this.format_data(data, date)
  }

  async change(data: any, date: any) {
    await this.mysql.sql(`DELETE FROM line_planing_data
      WHERE STR_TO_DATE(shiftdate,'%Y%m%d')
      BETWEEN STR_TO_DATE(` + date[0] + `,'%Y%m%d') AND STR_TO_DATE(` + date[date.length - 1] + `,'%Y%m%d')`)
    data.forEach((element: any) => {
      element.pop()
    });
    let my_sql = this.compile_insert_data(data, date)
    await this.mysql.sql(my_sql)
  }

  async line() {
    //查询所有线体名
    return await this.mysql.sql('SELECT distinct line FROM line_planing_data')
  }

  async find() {
    return await this.mysql.sql('SELECT distinct modeltype FROM line_planing_data')
  }
}

