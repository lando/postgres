'use strict';

// checks to see if a setting is disabled
module.exports = options => {
  return [
    'psql',
    `--host=${options.name}`,
    `--username=${options.creds.user}`,
    `--dbname=${options.creds.database}`,
    '-c "\\\l"',
  ].join(' ');
};
