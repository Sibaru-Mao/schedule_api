// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import { model, property } from '@loopback/repository';
import maintenance from '../server/maintenance';
import {
  param,
  get,
  post,
  requestBody,
  getModelSchemaRef,
} from '@loopback/rest';

export class MaintenanceController {
  constructor() { }
  manchine = new maintenance

  @get("/showMaintenance", { responses: { '200': { description: '查询机种维护信息', }, }, })
  async showMaintenance(): Promise<any> {
    return await this.manchine.show_maintenance_data();
  }

  @post("/changeMaintenance", { responses: { '200': { description: '修改机种维护信息' } } })
  async changeMaintenance(@requestBody() body: any): Promise<any> {
    return await this.manchine.change_maintenance(body.data);
  }

  @get("/showPersonnel", { responses: { '200': { description: '查询权限维护信息', }, }, })
  async showPersonnel(): Promise<any> {
    return await this.manchine.show_personnel();
  }

  @post("/changePersonnel", { responses: { '200': { description: '修改机种详细信息' } } })
  async changePersonnel(@requestBody() body: any): Promise<any> {
    return await this.manchine.change_personnel(body);
  }

  @get("/getPermission", { responses: { '200': { description: '获取人员权限信息', }, }, })
  async getPermission(@param.query.string('user') user: any): Promise<any> {
    return await this.manchine.get_permission(user);
  }
}
