// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import { model, property } from '@loopback/repository';
import machineDetail from '../server/machineDetail';
import {
  param,
  get,
  post,
  requestBody,
  getModelSchemaRef,
} from '@loopback/rest';

@model()
class MyModel {
  @property()
  data: string;
}

export class MachineDetailController {
  manchine = new machineDetail

  // @requestBody.array() users: User[] 接受数组
  // @get("/getMachineDetailAll", {responses: {'200': {description: '获取所有机种详细信息',}, },})
  // async getMachineDetailAllData(): Promise<any> {
  //   return await this.manchine.detail_all_data();
  // }

  @get("/getMachineDetail", { responses: { '200': { description: '查询机种详细信息', }, }, })
  async getMachineDetailDate(@param.query.string('list') list: any, @param.query.string('date') date: any): Promise<any> {
    return await this.manchine.detail_data(JSON.parse(list), JSON.parse(date));
  }

  @get("/changeMachineDetail", { responses: { '200': { description: '修改机种详细信息', }, }, })
  async changeMachineDetailData(@param.query.string('data') data: any): Promise<any> {
    return await this.manchine.change_detail_data(JSON.parse(data));
  }

  @post("/deleteMachineDetail", { responses: { '200': { description: '删除机种详细信息' } } })
  async deleteMachineDetailData(@requestBody() body: any): Promise<any> {
    await this.manchine.delete_detail_data(body.data);
    return "删除成功！"
  }

  @post("/excelToSql", { responses: { '200': { description: '上传excel数据' } } })
  async excelToSql(@requestBody() body: any): Promise<any> {
    return await this.manchine.excel(body.data);
  }

  // {
  //   content: { 'application/json': { schema: { 'x-ts-type': MyModel } } },
  // }) body: MyModel,

}
