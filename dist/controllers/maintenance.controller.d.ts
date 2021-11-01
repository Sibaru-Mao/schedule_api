import maintenance from '../server/maintenance';
export declare class MaintenanceController {
    constructor();
    manchine: maintenance;
    showMaintenance(): Promise<any>;
    changeMaintenance(body: any): Promise<any>;
    showPersonnel(): Promise<any>;
    changePersonnel(body: any): Promise<any>;
    getPermission(user: any): Promise<any>;
}
