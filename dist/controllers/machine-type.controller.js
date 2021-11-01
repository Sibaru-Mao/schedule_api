"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineTypeController = void 0;
const tslib_1 = require("tslib");
// import {inject} from '@loopback/core';
const machineType_1 = tslib_1.__importDefault(require("../server/machineType"));
const rest_1 = require("@loopback/rest");
class MachineTypeController {
    constructor() {
        this.manchine = new machineType_1.default;
    }
    async getMachineType() {
        return await this.manchine.type();
    }
    async getMachineLine() {
        return await this.manchine.line();
    }
    // @get("/getMachineType",{responses: {'200': {description: '获取所有机种类型名称',},},})
    // async getMachineType(): Promise<any> {
    //   return await this.manchine.line();
    // }
    async getMachineCapacity(date) {
        return await this.manchine.capacity(JSON.parse(date));
    }
    // @requestBody() date:RequestBody
    // @param.query.string('date', { required: false, description: '时间区间(年月日)' } date: any)
    // @param.path.string('date')
    async getMachinePlant(date) {
        return await this.manchine.plant(JSON.parse(date));
    }
    async getMachineDate(data, date) {
        return await this.manchine.data(JSON.parse(data), JSON.parse(date));
    }
    async changeMachinePlant(data, date) {
        await this.manchine.change(JSON.parse(data), JSON.parse(date));
        return 'OK';
    }
}
tslib_1.__decorate([
    rest_1.get("/getMachineType", { responses: { '200': { description: '获取所有机种名称', }, }, }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MachineTypeController.prototype, "getMachineType", null);
tslib_1.__decorate([
    rest_1.get("/getMachineLine", { responses: { '200': { description: '获取所有线别名称', }, }, }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MachineTypeController.prototype, "getMachineLine", null);
tslib_1.__decorate([
    rest_1.get("/getMachineCapacity", { responses: { '200': { description: '获取所有产能数据', }, }, }),
    tslib_1.__param(0, rest_1.param.query.string('date')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MachineTypeController.prototype, "getMachineCapacity", null);
tslib_1.__decorate([
    rest_1.get("/getMachinePlant", {
        responses: {
            '200': {
                description: '获取机种数据',
                // content: {
                //   'application/json': {
                //     schema: {type: 'string'},
                //   },
                // },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('date', { required: false, description: '时间区间(年月日)' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MachineTypeController.prototype, "getMachinePlant", null);
tslib_1.__decorate([
    rest_1.get("/getMachineDate", { responses: { '200': { description: '查询机种数据', }, }, }),
    tslib_1.__param(0, rest_1.param.query.string('data')),
    tslib_1.__param(1, rest_1.param.query.string('date')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MachineTypeController.prototype, "getMachineDate", null);
tslib_1.__decorate([
    rest_1.get("/changeMachinePlant", { responses: { '200': { description: '修改机种数据', }, }, }),
    tslib_1.__param(0, rest_1.param.query.string('data')),
    tslib_1.__param(1, rest_1.param.query.string('date')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MachineTypeController.prototype, "changeMachinePlant", null);
exports.MachineTypeController = MachineTypeController;
//# sourceMappingURL=machine-type.controller.js.map