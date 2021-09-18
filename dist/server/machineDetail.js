"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = tslib_1.__importDefault(require("./server"));
class default_1 {
    constructor() {
        this.mysql = new server_1.default;
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
        console.log(sql);
        return await this.mysql.sql(sql);
    }
    async change_detail_data(data) {
        let sql = `DELETE FROM line_detail_data WHERE id=${data.id}`;
        console.log(sql);
        await this.mysql.sql(sql);
        sql = `INSERT INTO line_detail_data(id, date, shift, line, mo, pn, qty, order_type, model, remark) VALUES(${data.id},${JSON.stringify(data.date)},${JSON.stringify(data.shift)},${JSON.stringify(data.line)},${JSON.stringify(data.mo)},${JSON.stringify(data.pn)},${JSON.stringify(data.qty)},${JSON.stringify(data.order_type)},${JSON.stringify(data.model)},${JSON.stringify(data.remark)})`;
        console.log(sql);
        await this.mysql.sql(sql);
        return {};
    }
}
exports.default = default_1;
//# sourceMappingURL=machineDetail.js.map