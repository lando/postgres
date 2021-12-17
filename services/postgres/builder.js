'use strict';

// Modules
const _ = require('lodash');

// Supported versions
const supportedVersions = [
  '14',
  '14.1.x',
  '14.0.x',
  '13',
  '13.5.x',
  '13.4.x',
  '13.3.x',
  '13.2.x',
  '13.1.x',
  '13.0.x',
  '12',
  '12.9.x',
  '12.8.x',
  '12.7.x',
  '12.6.x',
  '12.5.x',
  '12.4.x',
  '12.3.x',
  '12.2.x',
  '12.1.x',
  '12.0.x',
  '11',
  '11.14.x',
  '11.13.x',
  '11.12.x',
  '11.11.x',
  '11.10.x',
  '11.9.x',
  '11.8.x',
  '11.7.x',
  '11.6.x',
  '11.5.x',
  '11.4.x',
  '11.3.x',
  '11.2.x',
  '11.1.x',
  '11.0.x',
  '10',
  '10.19.x',
  '10.18.x',
  '10.17.x',
  '10.16.x',
  '10.15.x',
  '10.14.x',
  '10.13.x',
  '10.12.x',
  '10.11.x',
  '10.10.x',
  '10.9.x',
  '10.8.x',
  '10.7.x',
  '10.6.x',
  '10.5.x',
  '10.4.x',
  '10.3.x',
  '10.2.x',
  '10.1.x',
  '10.0.x',
  '9.6.x'
];

/*
 * Apache for all
 */
module.exports = {
  name: 'postgres',
  config: {
    version: '10',
    supported: supportedVersions,
    pinPairs: {
      '14': 'bitnami/postgresql:14.1.0-debian-10-r9',
      '13': 'bitnami/postgresql:13.5.0-debian-10-r9',
      '12': 'bitnami/postgresql:12.9.0-debian-10-r9',
      '11': 'bitnami/postgresql:11.14.0-debian-10-r9',
      '10': 'bitnami/postgresql:10.19.0-debian-10-r9',
      '9.6': 'bitnami/postgresql:9.6.24-debian-10-r9',
    },
    patchesSupported: true,
    confSrc: __dirname,
    creds: {
      database: 'database',
    },
    healthcheck: 'psql -U postgres -c "\\\l"',
    port: '5432',
    defaultFiles: {
      database: 'postgresql.conf',
    },
    remoteFiles: {
      database: '/bitnami/postgresql/conf/conf.d/lando.conf',
    },
  },
  parent: '_service',
  builder: (parent, config) => class LandoPostgres extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // The Bitnami Postgres container is particular about the user/pass.
      options.creds.user = 'postgres';
      options.creds.password = '';
      // Ensure the non-root backup perm sweep runs
      // NOTE: we guard against cases where the UID is the same as the bitnami non-root user
      // because this messes things up on circle ci and presumably elsewhere and _should_ be unncessary
      if (_.get(options, '_app._config.uid', '1000') !== '1001') options._app.nonRoot.push(options.name);

      const postgres = {
        image: `bitnami/postgresql:${options.version}`,
        command: '/launch.sh',
        environment: {
          ALLOW_EMPTY_PASSWORD: 'yes',
          POSTGRESQL_DATABASE: options.creds.database,
          POSTGRES_DB: options.creds.database,
          LANDO_NEEDS_EXEC: 'DOEEET',
        },
        volumes: [
          `${options.confDest}/launch.sh:/launch.sh`,
          `${options.confDest}/${options.defaultFiles.database}:${options.remoteFiles.database}`,
          `${options.data}:/bitnami/postgresql`,
        ],
      };
      // Send it downstream
      super(id, options, {services: _.set({}, options.name, postgres)});
    };
  },
};
