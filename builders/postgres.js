'use strict';

// Modules
const _ = require('lodash');
const path = require('path');

/*
 * Apache for all
 */
module.exports = {
  name: 'postgres',
  config: {
    version: '10',
    supported: ['17', '16', '15', '14', '13', '12', '11', '11.1', '11.0', '10', '10.6.0', '9.6'],
    pinPairs: {
      '17': 'bitnamilegacy/postgresql:17.6.0-debian-12-r4',
      '16': 'bitnamilegacy/postgresql:16.6.0-debian-12-r2',
      '15': 'bitnamilegacy/postgresql:15.10.0-debian-12-r2',
      '14': 'bitnamilegacy/postgresql:14.18.0-debian-12-r0',
      '13': 'bitnamilegacy/postgresql:13.18.0-debian-12-r2',
      '12': 'bitnamilegacy/postgresql:12.20.0-debian-12-r26',
      '11': 'bitnamilegacy/postgresql:11.22.0-debian-11-r4',
      '10': 'bitnamilegacy/postgresql:10.23.0-debian-11-r3',
      '9.6': 'bitnamilegacy/postgresql:9.6.24',
    },
    patchesSupported: true,
    confSrc: path.resolve(__dirname, '..', 'config'),
    creds: {
      database: 'database',
    },
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

      if (!options.healthcheck) options.healthcheck = require('../utils/get-default-healthcheck')(options);

      const postgres = {
        image: `bitnamilegacy/postgresql:${options.version}`,
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
    }
  },
};
