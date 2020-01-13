# Unstable 🚧 State Quick Start

> [Authpack](https://authpack.io) 🔒 A complete user and team management system

This document contains the state schema of the Authpack [gadgets](https://github.com/jackrobertscott/authpack-client/blob/master/docs/quick/sdk.md).

- `open: boolean` is the gadgets modal currently open.
- `ready: boolean` have the gadgets finished loading.
- `client?: string` the client key used to authenticate the gadgets.
- `bearer?: string` the bearer token assigned to the current user.
- `options: IOptions` the options used to configure the gadgets.
- `cluster?: object` the cluster identified by the client key.
  - `id: string` id of cluster.
  - `name: string` name of cluster.
  - `theme_preference: string` preferred theme of gadgets.
- `user?: object` populated once a user is authenticated.
  - `id: string` id of user.
  - `email: string` email of user.
  - `verified: boolean` has user verified email.
  - `username: string` username of user.
  - `name?: string` full name of user.
  - `name_given?: string` first name of user.
  - `name_family?: string` last name of user.
- `team?: object` populated once a user is authenticated and is a member of a team.
  - `id: string` id of team.
  - `name: string` human readable name of team.
  - `tag: string` unique id tag of team.
  - `description?: string` description of team.
- `session?: object` the current session of the authenticated user.
  - `id: string` id of the session.
  - `token: string` token used to identify session and create bearer token.

**Note:** all properties containing a `?` are considered optional and may be undefined.

## Links

- [Home](https://github.com/jackrobertscott/authpack-client)
- [Website](https://authpack.io)
- [Dashboard](https://v1.authpack.io)