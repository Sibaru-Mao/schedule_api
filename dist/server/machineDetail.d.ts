import server from './server';
export default class {
    mysql: server;
    detail_all_data(): Promise<any>;
    detail_data(list: any, date: any): Promise<any>;
    change_detail_data(data: any): Promise<{}>;
}
