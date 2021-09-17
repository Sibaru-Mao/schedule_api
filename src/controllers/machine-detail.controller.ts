// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import machineDetail from '../server/machineDetail';
import {
  param,
  get,
} from '@loopback/rest';

export class MachineDetailController {
  manchine = new machineDetail

  // @get("/getMachineDetailAll", {responses: {'200': {description: '获取所有机种详细信息',}, },})
  // async getMachineDetailAllData(): Promise<any> {
  //   return await this.manchine.detail_all_data();
  // }

  @get("/getMachineDetail", {responses: {'200': {description: '查询机种详细信息',},},})
  async getMachineDetailDate(@param.query.string('list')list: any,@param.query.string('date') date: any): Promise<any> {
    return await this.manchine.detail_data(JSON.parse(list), JSON.parse(date));
  }

  @get("/changeMachineDetail", {responses: {'200': {description: '修改机种详细信息',}, },})
  async changeMachineDetailData(@param.query.string('data') data: any): Promise<any> {
    return await this.manchine.change_detail_data(JSON.parse(data));
  }
}
