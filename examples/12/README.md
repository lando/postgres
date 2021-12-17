Postgres Example
================

This example exists primarily to test the following documentation:

* [Postgres Service](https://docs.devwithlando.io/tutorials/postgres.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should use 12 as the specified version
lando ssh -s defaults -c "psql -V" | grep "12"

# Should see the default database on healthcheck
lando healthcheckdefaults | grep 'database'

# Should use the correct default user pass db
lando verifydefaultsdatabase | grep 'pg_database'

# Should be able to receive connections from the outside
lando crossconnect | grep 'pg_database'
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
