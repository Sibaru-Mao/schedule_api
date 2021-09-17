// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import machineType from '../server/machineType';
import {
  Request,
  RestBindings,
  param,
  get,
  requestBody,
  response,
  ResponseObject,
  RequestBody,
} from '@loopback/rest';
import { request } from 'https';


export class MachineTypeController {
  manchine = new machineType
  constructor() { }

  @get("/getMachineType", {responses: {'200': {description: '获取所有机种名称',}, },})
  async getMachineType(): Promise<any> {
    return await this.manchine.type();
  }

  @get("/getMachineLine",{responses: {'200': {description: '获取所有线别名称',},},})
  async getMachineLine(): Promise<any> {
    return await this.manchine.line();
  }

  @get("/getMachineCapacity",{responses: {'200': {description: '获取所有产能数据',},},})
  async getMachineCapacity(@param.query.string('date') date: any): Promise<any> {
    return await this.manchine.capacity(JSON.parse(date));
  }

  @get("/getMachinePlant", {
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
  })
  // @requestBody() date:RequestBody
  // @param.query.string('date', { required: false, description: '时间区间(年月日)' } date: any)
  // @param.path.string('date')
  async getMachinePlant(@param.query.string('date', { required: false, description: '时间区间(年月日)' }) date:any): Promise<any> {
    return await this.manchine.plant(JSON.parse(date));
  }

  @get("/getMachineDate", {responses: {'200': {description: '查询机种数据',},},})
  async getMachineDate(@param.query.string('data')data: any,@param.query.string('date') date: any): Promise<any> {
    return await this.manchine.data(JSON.parse(data), JSON.parse(date));
  }
  
  @get("/changeMachinePlant", {responses: {'200': {description: '修改机种数据',},},})
  async changeMachinePlant(@param.query.string('data')data: any,@param.query.string('date') date: any): Promise<any> {
    await this.manchine.change(JSON.parse(data), JSON.parse(date));
    return 'OK'
  }


  // @get("/selectMachinePlant", {
  //   responses: {
  //     '200': {
  //       description: '修改机种数据',
  //     },
  //   },
  // })
  // async selectMachinePlant(data:any,date:any): Promise<any> {
  //   return await this.manchine.change(data,date);
  // }
}