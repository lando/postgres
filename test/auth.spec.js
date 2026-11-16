'use strict';

const {expect} = require('chai');
const getHealthcheck = require('../utils/get-default-healthcheck');

describe('Postgres healthcheck credentials', () => {
  it('includes the configured username and database', () => {
    expect(getHealthcheck({name: 'database', creds: {user: 'postgres', database: 'app'}}))
      .to.equal('psql --host=database --username=postgres --dbname=app -c "\\l"');
  });

  it('omits empty credentials instead of passing invalid arguments', () => {
    expect(getHealthcheck({name: 'database', creds: {user: '', database: ''}}))
      .to.equal('psql --host=database -c "\\l"');
  });

  it('allows a username without a database', () => {
    expect(getHealthcheck({name: 'database', creds: {user: 'postgres'}}))
      .to.equal('psql --host=database --username=postgres -c "\\l"');
  });

  it('allows a database without a username', () => {
    expect(getHealthcheck({name: 'database', creds: {database: 'app'}}))
      .to.equal('psql --host=database --dbname=app -c "\\l"');
  });
});
