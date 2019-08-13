# Scopes API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `scope` model is used to identify a single person who has signed up to your app.

- [Setup](#Model)
- [Scope model](#Model)

Methods.

- [Create a scope](#Create-a-scope)
- [Update a scope](#Update-a-scope)
- [Remove a scope](#Remove-a-scope)
- [Retrieve a scope](#Retrieve-a-scope)
- [List scopes](#List-scopes)
- [Count scopes](#Count-scopes)
- [Analytics of scopes](#Analytics-of-scopes)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your code base - use environment variables.

```ts
import { Authenticator } from 'wga-api';

const authenticator = new Authenticator({
  key: process.env.authenticatorPrivateKey
});
```

## Scope model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- name `string`: a nice scope name.
- code `string`: used to identify scope in code.
- description `string`: describe the scope's permissions.
- scopeId `string?`: the parent of the scope.
- data `object?`: developer assigned attributes.

## Create a scope

Used to sign up a scope on your app.

```ts
authenticator.scopes.create({
    name: 'Editor',
    code: 'editor',
    description: 'Can edit data without seeing config details.',
    scopeId: scopeAdminId,
    data: {
      // custom json attributes
    },
  })
  .then(scope => console.log(`Created: ${scope.name} at ${scope.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- name `string`: a nice scope name.
- code `string`: used to identify scope in code.
- description `string`: describe the scope's permissions.
- scopeId `string`: the parent of the scope.
- data `object?`: developer assigned attributes.

Returns.

- [scope](#Model) `Promise<object, Error>`: the created scope.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateScope($options: CreateScopeOptions!) {
  scope: CreateScope(options: $options) {
    id
    name
    # ... scope properties
  }
}
```

## Update a scope

Used to patch a scope's details.

```ts
authenticator.scopes.update({
    name: 'Editor',
    code: 'editor',
    description: 'Can edit data without seeing config details.',
    scopeId: undefined,
    data: {
      // custom json attributes
    },
  })
  .then(scope => console.log(`Updated: ${scope.name} at ${scope.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the scope to update.
- name `string?`: a nice scope name.
- code `string?`: used to identify scope in code.
- description `string?`: describe the scope's permissions.
- scopeId `string?`: the parent of the scope.
- data `object?`: developer assigned attributes.

Returns.

- [scope](#Model) `Promise<object, Error>`: the updated scope.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateScope($options: UpdateScopeOptions!) {
  scope: UpdateScope(options: $options) {
    id
    name
    # ... scope properties
  }
}
```

## Remove a scope

Used to permanently remove a scope.

```ts
authenticator.scopes.remove({
    id: membership.scopeId,
  })
  .then(scope => console.log(`Removed: ${scope.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- code `string?`: used when id not provided.

Returns.

- [scope](#Model) `Promise<object, Error>` the removed scope.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveScope($options: RemoveScopeOptions!) {
  scope: RemoveScope(options: $options) {
    id
    name
    # ... scope properties
  }
}
```

## Retrieve a scope

Used to get a single scope.

```ts
authenticator.scopes.retrieve({
    id: membership.scopeId,
  })
  .then(scope => console.log(`Retrieved: ${scope.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- code `string?`: used when id not provided.

Returns.

- [scope](#Model) `Promise<object, Error>` the scope requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query RetrieveScope($options: RetrieveScopeOptions!) {
  scope: RetrieveScope(options: $options) {
    id
    name
    # ... scope properties
  }
}
```

## List scopes

Used to get a list of scopes.

```ts
authenticator.scopes.list({
    search: 'Editor',
    scopeId: scopeAdmin.id,
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(scopes => console.table(scopes))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, code, and description.
- scopeId `string?`: scopes related to this scope.
- limit `number?`: maximum number of scopes returned.
- skip `number?`: skip this number of scopes.
- page `number?`: skip this number of scopes multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [scopes](#Model) `Promise<object[], Error>`: a list of scopes.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query ListScopes($options: ListScopesOptions!) {
  scopes: ListScopes(options: $options) {
    id
    name
    # ... scope properties
  }
}
```

## Count scopes

Used to count a group of scopes.

```ts
authenticator.scopes.count({
    search: 'Editor',
    scopeId: scopeAdmin.id,
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, code, and description.
- scopeId `string?`: scopes related to this scope.
  
Returns.

- count `Promise<number, Error>`: the number of scopes counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountScopes($options: CountScopesOptions!) {
  count: CountScopes(options: $options)
}
```

## Analytics of scopes

Used to get statistics of scopes over time.

```ts
authenticator.scopes.analytics({
    date: Date.now(),
    months: 6,
  })
  .then(analytics => console.table(analytics))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- date `Date?`: the end date of the time period to analayse.
- months `number?`: number of months to analyse.
  
Returns.

- analytics `Promise<object, Error>`: statistics related to scopes within time period.
  - labels `string[]`: date values within given period.
  - data `number[]`: values matching the labels.
  - created `number`: number of scopes created.
  - updated `number`: number of scopes updated.
  - active `number`: number of scopes with 1 session or more.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query AnalyticsOfScopes($options: AnalyticsOfScopesOptions!) {
  analytics: AnalyticsOfScopes(options: $options) {
    labels
    data
    # ... analytics properties
  }
}
```

## Resources

- [Allocations](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Allocations.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Memberships.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Providers.md)
- [Scopes](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Scopes.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Sessions.md)
- [Users](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Providers.md)
- [Workspaces](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Workspaces.md)
