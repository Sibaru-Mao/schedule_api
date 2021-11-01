import server from './server';
export default class {
    mysql: server;
    show_personnel(): Promise<any>;
    change_personnel(body: any): Promise<any>;
    show_maintenance_data(): Promise<any>;
    format_data: (data: any) => any;
    composition_data(data: any): any;
    change_maintenance(data: any): Promise<any>;
    insert_sql(database: any, list: any, data: any): string;
    get_permission(user: any): Promise<any>;
}
