'use strict';

const {expect} = require('chai');
const postgresBuilder = require('../builders/postgres');

class Service {
  constructor(id, options, sources) {
    this.id = id;
    this.options = options;
    this.sources = sources;
  }
}

describe('Postgres builder with bundled lodash', () => {
  let options;
  let Postgres;

  beforeEach(() => {
    Postgres = postgresBuilder.builder(Service, postgresBuilder.config);
    options = {
      name: 'database',
      version: '17.6.0-debian-12-r4',
      confDest: '/task/config',
      data: 'task_database',
      creds: {database: 'app', user: 'ignored', password: 'ignored'},
      _app: {_config: {uid: '1000'}, nonRoot: []},
    };
  });

  it('merges defaults, forces Bitnami credentials and generates service sources', () => {
    const instance = new Postgres('task', options);
    const service = instance.sources.services.database;
    expect(instance.id).to.equal('task');
    expect(instance.options.creds).to.deep.equal({database: 'app', user: 'postgres', password: ''});
    expect(instance.options._app.nonRoot).to.deep.equal(['database']);
    expect(service.image).to.equal('bitnamilegacy/postgresql:17.6.0-debian-12-r4');
    expect(service.command).to.equal('/launch.sh');
    expect(service.environment).to.include({POSTGRESQL_DATABASE: 'app', POSTGRES_DB: 'app', ALLOW_EMPTY_PASSWORD: 'yes'});
    expect(service.volumes).to.deep.equal([
      '/task/config/launch.sh:/launch.sh',
      '/task/config/postgresql.conf:/bitnami/postgresql/conf/conf.d/lando.conf',
      'task_database:/bitnami/postgresql',
    ]);
    expect(instance.options.healthcheck).to.equal('psql --host=database --username=postgres --dbname=app -c "\\l"');
  });

  it('does not mutate caller credentials or shared defaults during merging', () => {
    const originalConfig = JSON.stringify(postgresBuilder.config);
    new Postgres('task', options);
    expect(options.creds).to.deep.equal({database: 'app', user: 'ignored', password: 'ignored'});
    expect(options._app.nonRoot).to.deep.equal([]);
    expect(JSON.stringify(postgresBuilder.config)).to.equal(originalConfig);
  });

  it('skips the permission sweep when the host UID matches Bitnami', () => {
    options._app._config.uid = '1001';
    expect(new Postgres('task', options).options._app.nonRoot).to.deep.equal([]);
  });

  it('preserves a custom healthcheck', () => {
    options.healthcheck = 'pg_isready -U postgres';
    expect(new Postgres('task', options).options.healthcheck).to.equal(options.healthcheck);
  });

  it('uses the default database when no database override is supplied', () => {
    delete options.creds;
    const instance = new Postgres('task', options);
    expect(instance.options.creds.database).to.equal('database');
    expect(instance.sources.services.database.environment.POSTGRESQL_DATABASE).to.equal('database');
  });
});
