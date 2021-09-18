"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineDetailController = void 0;
const tslib_1 = require("tslib");
// import {inject} from '@loopback/core';
const machineDetail_1 = tslib_1.__importDefault(require("../server/machineDetail"));
const rest_1 = require("@loopback/rest");
class MachineDetailController {
    constructor() {
        this.manchine = new machineDetail_1.default;
    }
    // @get("/getMachineDetailAll", {responses: {'200': {description: '获取所有机种详细信息',}, },})
    // async getMachineDetailAllData(): Promise<any> {
    //   return await this.manchine.detail_all_data();
    // }
    async getMachineDetailDate(list, date) {
        return await this.manchine.detail_data(JSON.parse(list), JSON.parse(date));
    }
    async changeMachineDetailData(data) {
        return await this.manchine.change_detail_data(JSON.parse(data));
    }
}
tslib_1.__decorate([
    rest_1.get("/getMachineDetail", { responses: { '200': { description: '查询机种详细信息', }, }, }),
    tslib_1.__param(0, rest_1.param.query.string('list')),
    tslib_1.__param(1, rest_1.param.query.string('date')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MachineDetailController.prototype, "getMachineDetailDate", null);
tslib_1.__decorate([
    rest_1.get("/changeMachineDetail", { responses: { '200': { description: '修改机种详细信息', }, }, }),
    tslib_1.__param(0, rest_1.param.query.string('data')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MachineDetailController.prototype, "changeMachineDetailData", null);
exports.MachineDetailController = MachineDetailController;
//# sourceMappingURL=machine-detail.controller.js.map