PostgreSQL Custom Example

This example exists primarily to test the following documentation:

* [Postgres Service](https://docs.devwithlando.io/tutorials/postgres.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should use the specfied version when set by the user
lando exec defaults custom -- psql -V | grep "11."

# Should use the correct custom user pass db
lando verifycustom | grep 'pg_database'

# Should be able to receive connections from the outside
lando crossconnect  | grep 'pg_database'

# Should use a custom config file if specified
lando showmax | grep 999

# should show the correct user in info
lando info -s mimicarecipe | grep user | grep postgres

# should show the correct database in info
lando info -s mimicarecipe | grep 'mimic'
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
