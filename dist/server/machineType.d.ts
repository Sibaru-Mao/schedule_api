import server from './server';
export default class {
    mysql: server;
    classification: (data: any, date: any) => void;
    compile_select_data: (list: any, date: any) => string;
    compile_insert_data: (data: any, date: any) => string;
    filter_date: (data: any, date: any) => any;
    format_data: (data: any, date: any) => any;
    type(): Promise<any>;
    capacity(date: any): Promise<any>;
    ca(): Promise<any>;
    plant(date: any): Promise<any>;
    data(list: any, date: any): Promise<any>;
    change(data: any, date: any): Promise<void>;
    line(): Promise<any>;
    find(): Promise<void>;
}
