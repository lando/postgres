---
title: PostgreSQL Lando Plugin
description: Add a highly configurable Postgres service to Lando for local development with all the power of Docker and Docker Compose.
next: ./config.html
---

# PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is an advanced open source database server.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/services/lando-3.html) top-level config in your [Landofile](https://docs.lando.dev/landofile/).

```yaml
services:
  myservice:
    type: postgres:17
```

## Supported versions

*   [17](https://hub.docker.com/r/bitnamilegacy/postgresql/tags?name=17.)
*   [16](https://hub.docker.com/r/bitnamilegacy/postgresql/tags?name=16.)
*   [15](https://hub.docker.com/r/bitnamilegacy/postgresql/tags?name=15.)
*   [14](https://hub.docker.com/r/bitnamilegacy/postgresql/tags?name=14.)
*   [13](https://hub.docker.com/r/bitnamilegacy/postgresql/tags?name=13.)
*   [12](https://hub.docker.com/r/bitnamilegacy/postgresql/tags?name=12.)
*   [11](https://hub.docker.com/r/bitnamilegacy/postgresql/tags?name=11.)
*   [11.1.0](https://hub.docker.com/r/bitnamilegacy/postgresql/tags?name=11.1.)
*   [10](https://hub.docker.com/r/bitnamilegacy/postgresql/tags?name=10.)
*   [10.6.0](https://hub.docker.com/r/bitnamilegacy/postgresql/tags?name=10.6.)
*   [9.6](https://hub.docker.com/r/bitnamilegacy/postgresql/tags?name=9.6)
*   [custom](https://docs.lando.dev/services/lando-3.html#overrides)

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

But make sure you use one of the available [patch tags](https://hub.docker.com/r/bitnamilegacy/postgresql/tags) for the underlying image we are using.
