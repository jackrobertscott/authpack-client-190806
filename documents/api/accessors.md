# Accessors API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `accessor` model is created to store the access tokens between a provider and a account.

- [Setup](#Model)
- [Accessor model](#Model)

Methods.

- [Create an accessor](#Create-a-accessor)
- [Update an accessor](#Update-a-accessor)
- [Remove an accessor](#Remove-a-accessor)
- [Retrieve an accessor](#Retrieve-a-accessor)
- [List accessors](#List-accessors)
- [Count accessors](#Count-accessors)
- [Analytics of accessors](#Analytics-of-accessors)

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

## Accessor model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- account `string`: the related account.
- provider `string`: the related provider.
- meta `object?`: developer assigned attributes.
- expiry `Date`: the expiry time of the token.
- token `string`: the access token created by the accessor.

## Create an accessor

Used to sign up an accessor on your app.

```ts
authenticator.accessors.create({
    account: account.id,
    provider: provider.id,
    meta: {/* attributes */},
    code: queryString.parse(location.search).code,
    expiry: new Date(),
  })
  .then(accessor => console.log(`Created: ${accessor.id} at ${accessor.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- account `string|object`: the account's id or an object which will create a new account.
- provider `string`: the provider's id.
- meta `object?`: developer assigned attributes.
- code `string`: the oauth code returned after authenticating.
- expiry `Date`: the expiry time of the token.

Returns.

- [accessor](#Model) `Promise<object, Error>`: the created accessor.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateAccessor($options: CreateAccessorOptions!) {
  accessor: CreateAccessor(options: $options) {
    id
    # ... accessor properties
  }
}
```

## Update an accessor

Used to patch an accessor's details.

```ts
authenticator.accessors.update({
    id: accessor.id,
    meta: {/* attributes */},
  })
  .then(accessor => console.log(`Updated: ${accessor.id} at ${accessor.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the accessor to update.
- meta `object?`: developer assigned attributes.

Returns.

- [accessor](#Model) `Promise<object, Error>`: the updated accessor.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateAccessor($options: UpdateAccessorOptions!) {
  accessor: UpdateAccessor(options: $options) {
    id
    # ... accessor properties
  }
}
```

## Remove an accessor

Used to permanently remove an accessor.

```ts
authenticator.accessors.remove({
    id: membership.accessorId,
  })
  .then(accessor => console.log(`Removed: ${accessor.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.

Returns.

- [accessor](#Model) `Promise<object, Error>` the removed accessor.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveAccessor($options: RemoveAccessorOptions!) {
  accessor: RemoveAccessor(options: $options) {
    id
    # ... accessor properties
  }
}
```

## Retrieve an accessor

Used to get a single accessor.

```ts
authenticator.accessors.retrieve({
    id: accessor.id,
  })
  .then(accessor => console.log(`Retrieved: ${accessor.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- token `string?`: this access token used if the id is not provided.

Returns.

- [accessor](#Model) `Promise<object, Error>` the accessor requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query RetrieveAccessor($options: RetrieveAccessorOptions!) {
  accessor: RetrieveAccessor(options: $options) {
    id
    # ... accessor properties
  }
}
```

## List accessors

Used to get a list of accessors.

```ts
authenticator.accessors.list({
    account: account.id,
    provider: provider.id,
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(accessors => console.table(accessors))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- account `string`: filtered by this account's id.
- provider `string`: filtered by this provider's id.
- limit `number?`: maximum number of accessors returned.
- skip `number?`: skip this number of accessors.
- page `number?`: skip this number of accessors multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [accessors](#Model) `Promise<object[], Error>`: a list of accessors.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query ListAccessors($options: ListAccessorsOptions!) {
  accessors: ListAccessors(options: $options) {
    id
    # ... accessor properties
  }
}
```

## Count accessors

Used to count a group of accessors.

```ts
authenticator.accessors.count({
    account: account.id,
    provider: provider.id,
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- account `string`: filtered by this account's id.
- provider `string`: filtered by this provider's id.
  
Returns.

- count `Promise<number, Error>`: the number of accessors counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountAccessors($options: CountAccessorsOptions!) {
  count: CountAccessors(options: $options)
}
```

## Analytics of accessors

Used to get statistics of accessors over time.

```ts
authenticator.accessors.analytics({
    date: Date.now(),
    months: 6,
  })
  .then(analytics => console.table(analytics))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- ending `number?`: the end date timestamp of the time period to analayse.
- months `number?`: number of months to analyse.
  
Returns.

- analytics `Promise<object, Error>`: statistics related to accessors within time period.
  - labels `string[]`: date values within given period.
  - data `number[]`: values matching the labels.
  - created `number`: number of accessors created.
  - updated `number`: number of accessors updated.
  - active `number`: number of accessors with 1 accessor or more.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query AnalyticsOfAccessors($options: AnalyticsOfAccessorsOptions!) {
  analytics: AnalyticsOfAccessors(options: $options) {
    labels
    data
    # ... analytics properties
  }
}
```

## Resources

- [Accessors](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/accessors.md)
- [Accounts](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/accounts.md)
- [Groups](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/groups.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/sessions.md)
