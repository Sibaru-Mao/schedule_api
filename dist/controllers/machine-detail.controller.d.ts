import machineDetail from '../server/machineDetail';
export declare class MachineDetailController {
    manchine: machineDetail;
    getMachineDetailDate(list: any, date: any): Promise<any>;
    changeMachineDetailData(data: any): Promise<any>;
    deleteMachineDetailData(body: any): Promise<any>;
    excelToSql(body: any): Promise<any>;
}
