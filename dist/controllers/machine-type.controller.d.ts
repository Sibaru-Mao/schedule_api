import machineType from '../server/machineType';
export declare class MachineTypeController {
    manchine: machineType;
    constructor();
    getMachineType(): Promise<any>;
    getMachineLine(): Promise<any>;
    getMachineCapacity(date: any): Promise<any>;
    getMachinePlant(date: any): Promise<any>;
    getMachineDate(data: any, date: any): Promise<any>;
    changeMachinePlant(body: any): Promise<any>;
}
