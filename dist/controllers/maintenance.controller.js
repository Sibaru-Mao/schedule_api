"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceController = void 0;
const tslib_1 = require("tslib");
const maintenance_1 = tslib_1.__importDefault(require("../server/maintenance"));
const rest_1 = require("@loopback/rest");
class MaintenanceController {
    constructor() {
        this.manchine = new maintenance_1.default;
    }
    async showMaintenance() {
        return await this.manchine.show_maintenance_data();
    }
    async changeMaintenance(body) {
        return await this.manchine.change_maintenance(body.data);
    }
    async showPersonnel() {
        return await this.manchine.show_personnel();
    }
    async changePersonnel(body) {
        return await this.manchine.change_personnel(body);
    }
    async getPermission(user) {
        return await this.manchine.get_permission(user);
    }
}
tslib_1.__decorate([
    rest_1.get("/showMaintenance", { responses: { '200': { description: '查询机种维护信息', }, }, }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "showMaintenance", null);
tslib_1.__decorate([
    rest_1.post("/changeMaintenance", { responses: { '200': { description: '修改机种维护信息' } } }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "changeMaintenance", null);
tslib_1.__decorate([
    rest_1.get("/showPersonnel", { responses: { '200': { description: '查询权限维护信息', }, }, }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "showPersonnel", null);
tslib_1.__decorate([
    rest_1.post("/changePersonnel", { responses: { '200': { description: '修改机种详细信息' } } }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "changePersonnel", null);
tslib_1.__decorate([
    rest_1.get("/getPermission", { responses: { '200': { description: '获取人员权限信息', }, }, }),
    tslib_1.__param(0, rest_1.param.query.string('user')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "getPermission", null);
exports.MaintenanceController = MaintenanceController;
//# sourceMappingURL=maintenance.controller.js.map