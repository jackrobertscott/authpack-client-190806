# Allocations API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `allocation` model is created to store the access tokens between a provider and a user.

- [Setup](#Model)
- [Allocation model](#Model)

Methods.

- [Create an allocation](#Create-a-allocation)
- [Update an allocation](#Update-a-allocation)
- [Remove an allocation](#Remove-a-allocation)
- [Retrieve an allocation](#Retrieve-a-allocation)
- [List allocations](#List-allocations)
- [Count allocations](#Count-allocations)
- [Analytics of allocations](#Analytics-of-allocations)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your code base - use environment variables.

```ts
import { Authenticator } from 'wga-api';

const authenticator = new Authenticator({
  key: process.env.authenticatorPrivateKey
});
```

## Allocation model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- userId `string`: the user's id.
- providerId `string`: the provider's id.
- expiry `Date`: the expiry time of the token.
- token `string`: the access token created by the allocation.
- data `object?`: developer assigned attributes.

## Create an allocation

Used to sign up an allocation on your app.

```ts
authenticator.allocations.create({
    userId: user.id,
    providerId: provider.id,
    expiry: new Date(),
    data: {
      // custom json attributes
    },
  })
  .then(allocation => console.log(`Created: ${allocation.id} at ${allocation.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- userId `string`: the user's id.
- providerId `string`: the provider's id.
- expiry `Date`: the expiry time of the token.
- data `object?`: developer assigned attributes.

Returns.

- [allocation](#Model) `Promise<object, Error>`: the created allocation.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateAllocation($options: CreateAllocationOptions!) {
  allocation: CreateAllocation(options: $options) {
    id
    # ... allocation properties
  }
}
```

## Update an allocation

Used to patch an allocation's details.

```ts
authenticator.allocations.update({
    id: allocation.id,
    data: {
      // custom json attributes
    },
  })
  .then(allocation => console.log(`Updated: ${allocation.id} at ${allocation.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the allocation to update.
- data `object?`: developer assigned attributes.

Returns.

- [allocation](#Model) `Promise<object, Error>`: the updated allocation.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateAllocation($options: UpdateAllocationOptions!) {
  allocation: UpdateAllocation(options: $options) {
    id
    # ... allocation properties
  }
}
```

## Remove an allocation

Used to permanently remove an allocation.

```ts
authenticator.allocations.remove({
    id: membership.allocationId,
  })
  .then(allocation => console.log(`Removed: ${allocation.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.

Returns.

- [allocation](#Model) `Promise<object, Error>` the removed allocation.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveAllocation($options: RemoveAllocationOptions!) {
  allocation: RemoveAllocation(options: $options) {
    id
    # ... allocation properties
  }
}
```

## Retrieve an allocation

Used to get a single allocation.

```ts
authenticator.allocations.retrieve({
    id: allocation.id,
  })
  .then(allocation => console.log(`Retrieved: ${allocation.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- token `string?`: this access token used if the id is not provided.

Returns.

- [allocation](#Model) `Promise<object, Error>` the allocation requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query RetrieveAllocation($options: RetrieveAllocationOptions!) {
  allocation: RetrieveAllocation(options: $options) {
    id
    # ... allocation properties
  }
}
```

## List allocations

Used to get a list of allocations.

```ts
authenticator.allocations.list({
    userId: user.id,
    providerId: provider.id,
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(allocations => console.table(allocations))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- userId `string`: filtered by this user's id.
- providerId `string`: filtered by this provider's id.
- limit `number?`: maximum number of allocations returned.
- skip `number?`: skip this number of allocations.
- page `number?`: skip this number of allocations multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [allocations](#Model) `Promise<object[], Error>`: a list of allocations.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query ListAllocations($options: ListAllocationsOptions!) {
  allocations: ListAllocations(options: $options) {
    id
    # ... allocation properties
  }
}
```

## Count allocations

Used to count a group of allocations.

```ts
authenticator.allocations.count({
    userId: user.id,
    providerId: provider.id,
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- userId `string`: filtered by this user's id.
- providerId `string`: filtered by this provider's id.
  
Returns.

- count `Promise<number, Error>`: the number of allocations counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountAllocations($options: CountAllocationsOptions!) {
  count: CountAllocations(options: $options)
}
```

## Analytics of allocations

Used to get statistics of allocations over time.

```ts
authenticator.allocations.analytics({
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

- analytics `Promise<object, Error>`: statistics related to allocations within time period.
  - labels `string[]`: date values within given period.
  - data `number[]`: values matching the labels.
  - created `number`: number of allocations created.
  - updated `number`: number of allocations updated.
  - active `number`: number of allocations with 1 allocation or more.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query AnalyticsOfAllocations($options: AnalyticsOfAllocationsOptions!) {
  analytics: AnalyticsOfAllocations(options: $options) {
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
