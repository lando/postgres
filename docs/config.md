---
title: Configuration
description: Learn how to configure the Lando Postgres service.
---

# Configuration

Here are the configuration options, set to the default values, for this service. If you are unsure about where this goes or what this means, we *highly recommend* scanning the [services documentation](https://docs.lando.dev/services/lando-3.html) to get a good handle on how the magicks work.

Also note that the below options are in addition to the [build steps](https://docs.lando.dev/services/lando-3.html#build-steps) and [overrides](https://docs.lando.dev/services/lando-3.html#overrides) that are available to every service.

::: warning Be careful when switching database type, version or credentials!
You should be careful switching database `type`, `version` or `creds`.

In the case of type and version, the underlying database files between these things will not be compatible. In the case of credentials, these are set when the container is **initially created** so in order to change them, you need to `lando destroy && lando start`. Note that `lando destroy` will delete all the data in your database.

To upgrade the PostgreSQL major version you need to:

1. Take a database dump
2. Destroy the postgres container
3. Change version in `.lando.yml` and rebuild
4. Restore your database dump

**Ignoring this warning can prevent your database from starting**
:::

```yaml
services:
  myservice:
    type: postgres:17
    portforward: false
    creds:
      database: database
      # Note that you cannot change the below but they are shown here for transparency
      # You can read more about why this is below
      # By "NO PASSWORD" we mean the password is blank
      user: postgres
      password: NO PASSWORD
    config:
      database: SEE BELOW
```

## Port forwarding

`portforward` will allow you to access this service externally by assigning a port directly on your host's `localhost`. Note that ` portforward` can be set to either `true` or a specific `port` but we *highly recommend* you set it to `true` unless you have pretty good knowledge of how port assignment works or you have a **very** compelling reason for needing a locked down port.

`portforward: true` will prevent inevitable port collisions and provide greater reliability and stability across Lando apps. That said, one downside of `portforward: true` is that Docker will assign a different port every time you restart your application. You can read more about accessing services externally [over here](https://docs.lando.dev/guides/external-access.html).

`tl;dr`

**Recommended**

```yaml
services:
  myservice:
    type: postgres:17
    portforward: true
```

**Not recommended**

```yaml
services:
  myservice:
    type: postgres:17
    portforward: 5432
```

## Setting custom credentials

The postgres service user is set to `postgres` and the password is empty. It does not allow setting a custom user or password as this interferes with tooling commands and build steps. Lando needs to access the postgres super user to perform tooling commands. See [the Bitnami documentation](https://github.com/bitnami/containers/tree/main/bitnami/postgresql) for more information.

You can also configure the default `database`. However, it is *very important* to note that these things get set the **FIRST TIME YOU START** the service and **ONLY THE FIRST TIME.**

This means that if you change any of the `creds`, you need to `lando destroy` and then `lando start` the service for the changes to take effect. This stands in contrast to the normal `lando rebuild` method to change config and is a consequence of persisting the database's data directory between rebuilds.

```yaml
services:
  myservice:
    type: postgres
    creds:
      database: database -> db7
```

```bash
lando destroy -y && lando start
```

Also note that by default, all `postgres` services have a passwordless `postgres` user with all permissions. **DO NOT ALTER THE PASSWORD OF THE POSTGRES USER.**

## Using a custom postgres config file

You may need to override our [default postgres config](https://github.com/lando/postgres/tree/main/builders) with your own [custom postgres config](https://github.com/postgres/postgres/blob/master/src/backend/utils/misc/postgresql.conf.sample).

If you do this, you must use a file that exists inside your application and express it relative to your project root as shown below:

**A hypothetical project**

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory but you can call it whatever you want such as `.lando` in the example below:

```bash
./
|-- config
   |-- my-custom.conf
|-- .lando.yml
```

**Landofile's postgres config**

```yaml
services:
  myservice:
    type: postgres:17
    config:
      database: config/my-custom.conf
```

## Getting information

You can get connection and credential information about your postgres instance by running [`lando info`](https://docs.lando.dev/cli/info.html). It may also be worth checking out our [accessing services externally guide](https://docs.lando.dev/guides/external-access.html).
