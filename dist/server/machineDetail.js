"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = tslib_1.__importDefault(require("./server"));
class default_1 {
    constructor() {
        this.mysql = new server_1.default;
        // xlsx.read(data)
        // try {
        // let wb: IWorkBook = read(data)
        // let sheet=wb.Sheets 
        // let excelData = new Uint8Array(data);
        // let arr = new Array();
        // for (let i = 0; i != excelData.length; ++i) {
        //   arr[i] = String.fromCharCode(excelData[i])
        // }
        // let bstr = arr.join("");
        //     const worksheets = XLSX.read(data, { type: 'base64' })
        //     console.log("______________", worksheets);
        //     // const sheetname=
        //     const excelRowData = XLSX.utils.sheet_to_json(worksheets.Sheets['Sheet1'])
        //     console.log(excelRowData);
        //   } catch (error) {
        //     console.log(error);
        //   }
        // }
    }
    async detail_all_data() {
        return await this.mysql.select('line_detail_data');
    }
    async detail_data(list, date) {
        // let data = await this.mysql.sql(this.compile_select_data(list, date))
        // return this.format_data(data, date)
        /*
        SELECT * FROM line_detail_data
        WHERE  line = 'KA1'
        AND model = 'LLA'
        AND shift = 'D'
        AND mo IN('1', '2')
        AND STR_TO_DATE(DATE, '%Y/%m/%d')
        BETWEEN STR_TO_DATE('2021/7/1', '%Y/%m/%d') AND STR_TO_DATE('2021/7/7', '%Y/%m/%d')
        */
        let col_name_list = ['line', 'model', 'shift', 'mo'];
        let sql = 'SELECT * FROM line_detail_data WHERE ';
        if (list[list.length - 1] == '') {
            list[list.length - 1] = 'ALL';
        }
        else {
            list[list.length - 1] = list[list.length - 1].split(' ').join("','");
        }
        list.forEach((element, index) => {
            if (element != 'ALL') {
                if (index != list.length - 1) {
                    sql += `${col_name_list[index]} = '${element}' AND `;
                }
                else {
                    sql += `${col_name_list[index]} IN ('${element}') AND `;
                }
            }
        });
        sql += `STR_TO_DATE(DATE, '%Y/%m/%d') BETWEEN STR_TO_DATE('${date[0]}', '%Y/%m/%d') AND STR_TO_DATE('${date[1]}', '%Y/%m/%d')`;
        return await this.mysql.sql(sql);
    }
    async delete_detail_data(id) {
        let sql = `DELETE FROM line_detail_data WHERE id=${id}`;
        console.log(sql);
        return await this.mysql.sql(sql);
    }
    async change_detail_data(data) {
        await this.delete_detail_data(data.id);
        let sql = `INSERT INTO line_detail_data(id, date, shift, line, mo, pn, qty, order_type, model, remark) VALUES(${data.id},${JSON.stringify(data.date)},${JSON.stringify(data.shift)},${JSON.stringify(data.line)},${JSON.stringify(data.mo)},${JSON.stringify(data.pn)},${JSON.stringify(data.qty)},${JSON.stringify(data.order_type)},${JSON.stringify(data.model)},${JSON.stringify(data.remark)})`;
        console.log(sql);
        return await this.mysql.sql(sql);
    }
    async excel(data) {
        let list = ['id', 'date', 'shift', 'line', 'mo', 'pn', 'qty', 'order_type', 'model', 'remark'];
        let id_list = [];
        if (data[0][0] == "ID") {
            data.splice(0, 1);
        }
        for (let index = 0; index < data.length; index++) {
            let date = new Date(data[index][1]);
            data[index][1] = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
            // data[index][1] = date.toLocaleDateString();
            if (data[index][0] != null) {
                id_list.push(data[index][0]);
            }
        }
        if (id_list.length != 0) {
            // let sql_tem =`DELETE FROM line_detail_data WHERE id IN (${id_list.join(',')})`
            await this.mysql.sql(`DELETE FROM line_detail_data WHERE id IN (${id_list.join(',')})`);
        }
        let sql = this.insert_sql('line_detail_data', list, data);
        return await this.mysql.sql(sql);
    }
    insert_sql(database, list, data) {
        let template = list.join(',');
        let insert_sql = `INSERT INTO ${database}(${template}) VALUES`;
        /* 数据插入，区分首条数据 */
        let insert = (id) => {
            return id != 0 ? ',' : '';
        };
        if (Array.isArray(data[0])) {
            data.forEach((element, index) => {
                insert_sql += insert(index);
                let sql = '(';
                element.forEach((elem, id) => {
                    sql += insert(id);
                    sql += JSON.stringify(elem);
                });
                sql += ')';
                insert_sql += sql;
            });
        }
        else {
            let sql = '("';
            sql += data.join('","');
            sql += '")';
            insert_sql += sql;
        }
        console.log(insert_sql);
        return insert_sql;
    }
}
exports.default = default_1;
//# sourceMappingURL=machineDetail.js.map