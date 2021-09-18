import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';


const config = {
  name: 'mysql',
  connector: 'mysql',
  url: '',
  host: '10.66.28.11',
  port: 3306,
  user: 'PSEK230',
  password: 'Psek230@prd',
  database: 'PSEK230'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqlDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mysql';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysql', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
