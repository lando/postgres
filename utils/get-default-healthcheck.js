'use strict';

// checks to see if a setting is disabled
module.exports = options => {
  let healthcheck = [
    'psql',
    `--host=${options.name}`,
  ];

  // Only include whatever creds are available.
  options.creds.user ? healthcheck.push(`--username=${options.creds.user}`) : false;
  options.creds.database ? healthcheck.push(`--dbname=${options.creds.database}`) : false;

  return healthcheck.concat([
    '-c "\\l"',
  ]).join(' ');
};
