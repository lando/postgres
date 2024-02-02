---
title: Postgres Lando Plugin
description: Add a highly configurable Postgres service to Lando for local development with all the power of Docker and Docker Compose.
next: ./config.html
---

# Postgres

[PostgreSQL](https://www.postgresql.org/) is an advanced open source database server.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/core/v3/lando-service.html) top-level config in your [Landofile](https://docs.lando.dev/core/v3).

```yaml
services:
  myservice:
    type: postgres
```

## Supported versions

*   [14](https://hub.docker.com/r/bitnami/postgresql)
*   [13](https://hub.docker.com/r/bitnami/postgresql)
*   [12](https://hub.docker.com/r/bitnami/postgresql)
*   [11](https://hub.docker.com/r/bitnami/postgresql)
*   [11.1.0](https://hub.docker.com/r/bitnami/postgresql)
*   **[10](https://hub.docker.com/r/bitnami/postgresql)** **(default)**
*   [10.6.0](https://hub.docker.com/r/bitnami/postgresql)
*   [9.6](https://hub.docker.com/r/bitnami/postgresql)
*   [custom](https://docs.lando.dev/core/v3/lando-service.html#overrides)

## Patch versions

::: warning Not officially supported!
While we allow users to specify patch versions for this service, they are not *officially* supported, so if you use one, YMMV.
:::

To use a patch version, you can do something as shown below:

```yaml
services:
  myservice:
    type: postgres:9.6.11
```

But make sure you use one of the available [patch tags](https://hub.docker.com/r/bitnami/postgresql/tags) for the underlying image we are using.

