# Permissions API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `permission` model allows developers to assign access levels to an account.

- [Setup](#Model)
- [Permission model](#Model)

Methods.

- [Create a permission](#Create-a-permission)
- [Update a permission](#Update-a-permission)
- [Remove a permission](#Remove-a-permission)
- [Retrieve a permission](#Retrieve-a-permission)
- [List permissions](#List-permissions)
- [Count permissions](#Count-permissions)
- [Analytics of permissions](#Analytics-of-permissions)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your codebase - use environment variables.

```ts
import { Authenticator } from 'wga-api';

const authenticator = new Authenticator({
  secret: process.env.AUTHENTICATOR_SECRET
  devmode: false,
});
```

## Permission model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- meta `object?`: developer assigned attributes.
- name `string`: a nice permission name.
- tag `string`: used to identify permission in code.
- description `string?`: describe the permission's permissions.

## Create a permission

Used to sign up a permission on your app.

```ts
authenticator.permissions.create({
    meta: {/* attributes */},
    name: 'Editor',
    tag: 'editor',
    description: 'Can edit data without seeing config details.',
  })
  .then(permission => console.log(`Created: ${permission.name} at ${permission.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- meta `object?`: developer assigned attributes.
- name `string`: a nice permission name.
- tag `string`: used to identify permission in code.
- description `string`: describe the permission's permissions.

Returns.

- [permission](#Model) `Promise<object, Error>`: the created permission.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreatePermission($options: CreatePermissionOptions!) {
  permission: CreatePermission(options: $options) {
    id
    name
    # ... permission properties
  }
}
```

## Update a permission

Used to patch a permission's details.

```ts
authenticator.permissions.update({
    meta: {/* attributes */},
    name: 'Editor',
    tag: 'editor',
    description: 'Can edit data without seeing config details.',
  })
  .then(permission => console.log(`Updated: ${permission.name} at ${permission.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the permission to update.
- meta `object?`: developer assigned attributes.
- name `string?`: a nice permission name.
- tag `string?`: used to identify permission in code.
- description `string?`: describe the permission's permissions.

Returns.

- [permission](#Model) `Promise<object, Error>`: the updated permission.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdatePermission($options: UpdatePermissionOptions!) {
  permission: UpdatePermission(options: $options) {
    id
    name
    # ... permission properties
  }
}
```

## Remove a permission

Used to permanently remove a permission.

```ts
authenticator.permissions.remove({
    id: membership.permissionId,
  })
  .then(permission => console.log(`Removed: ${permission.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- tag `string?`: used when id not provided.

Returns.

- [permission](#Model) `Promise<object, Error>` the removed permission.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemovePermission($options: RemovePermissionOptions!) {
  permission: RemovePermission(options: $options) {
    id
    name
    # ... permission properties
  }
}
```

## Retrieve a permission

Used to get a single permission.

```ts
authenticator.permissions.retrieve({
    id: membership.permissionId,
  })
  .then(permission => console.log(`Retrieved: ${permission.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- tag `string?`: used when id not provided.

Returns.

- [permission](#Model) `Promise<object, Error>` the permission requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query RetrievePermission($options: RetrievePermissionOptions!) {
  permission: RetrievePermission(options: $options) {
    id
    name
    # ... permission properties
  }
}
```

## List permissions

Used to get a list of permissions.

```ts
authenticator.permissions.list({
    search: 'Editor',
    permission: permission.id,
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(permissions => console.table(permissions))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, code, and description.
- permission `string?`: filtered by this permission's id - must be child of permission.
- limit `number?`: maximum number of permissions returned.
- skip `number?`: skip this number of permissions.
- page `number?`: skip this number of permissions multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [permissions](#Model) `Promise<object[], Error>`: a list of permissions.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query ListPermissions($options: ListPermissionsOptions!) {
  permissions: ListPermissions(options: $options) {
    id
    name
    # ... permission properties
  }
}
```

## Count permissions

Used to count a group of permissions.

```ts
authenticator.permissions.count({
    search: 'Editor',
    permission: permission.id,
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, code, and description.
- permission `string?`: filtered by this permission's id - must be child of permission.
  
Returns.

- count `Promise<number, Error>`: the number of permissions counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountPermissions($options: CountPermissionsOptions!) {
  count: CountPermissions(options: $options)
}
```

## Analytics of permissions

Used to get statistics of permissions over time.

```ts
authenticator.permissions.analytics({
    date: Date.now(),
    months: 6,
  })
  .then(analytics => console.table(analytics))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- ending `string?`: the final day in the period i.e. `2019-12-24`.
- months `number?`: number of months to analyse.
  
Returns.

- analytics `Promise<object, Error>`: statistics related to permissions within time period.
  - labels `string[]`: date values within given period.
  - data `number[]`: values matching the labels.
  - created `number`: number of permissions created.
  - updated `number`: number of permissions updated.
  - active `number`: number of permissions with 1 session or more.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query AnalyticsOfPermissions($options: AnalyticsOfPermissionsOptions!) {
  analytics: AnalyticsOfPermissions(options: $options) {
    labels
    data
    # ... analytics properties
  }
}
```

## Resources

- [Accounts](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/accounts.md)
- [Groups](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/groups.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/sessions.md)
