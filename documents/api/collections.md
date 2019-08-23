# Collections API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `collection` model is used to group multiple accounts together.

- [Setup](#Model)
- [Collection model](#Model)

Methods.

- [Create a collection](#Create-a-collection)
- [Update a collection](#Update-a-collection)
- [Remove a collection](#Remove-a-collection)
- [Retrieve a collection](#Retrieve-a-collection)
- [List collections](#List-collections)
- [Count collections](#Count-collections)
- [Analytics of collections](#Analytics-of-collections)

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

## Collection model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- meta `object?`: developer assigned attributes.
- name `string`: collection name.
- tag `string`: unique code used in urls.
- domains `string[]`: whitelisted domains for using the authenticator API.

## Create a collection

Used to sign up a collection on your app.

```ts
authenticator.collections.create({
    meta: {/* attributes */},
    name: 'Awesome Collection',
    tag: 'awesome-collection',
    domains: ['app.example.com'],
  })
  .then(collection => console.log(`Created: ${collection.name} at ${collection.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- meta `object?`: developer assigned attributes.
- name `string`: collection name.
- tag `string`: unique code.
- domains `string[]`: whitelisted domains for using the authenticator API.

Returns.

- [collection](#Model) `Promise<object, Error>`: the created collection.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateCollection($options: CreateCollectionOptions!) {
  collection: CreateCollection(options: $options) {
    id
    name
    # ... collection properties
  }
}
```

## Update a collection

Used to patch a collection's details.

```ts
authenticator.collections.update({
    id: collection.id,
    meta: {/* attributes */},
    name: 'Awesome Collection',
    tag: 'awesome-collection',
    domains: ['app.example.com'],
  })
  .then(collection => console.log(`Updated: ${collection.name} at ${collection.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the collection to update.
- meta `object?`: developer assigned attributes.
- name `string?`: collection name.
- tag `string?`: unique code.
- domains `string[]?`: whitelisted domains for using the authenticator API.

Returns.

- [collection](#Model) `Promise<object, Error>`: the updated collection.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateCollection($options: UpdateCollectionOptions!) {
  collection: UpdateCollection(options: $options) {
    id
    name
    # ... collection properties
  }
}
```

## Remove a collection

Used to permanently remove a collection.

```ts
authenticator.collections.remove({
    id: membership.collectionId,
  })
  .then(collection => console.log(`Removed: ${collection.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- tag `string?`: used when id not provided.

Returns.

- [collection](#Model) `Promise<object, Error>` the removed collection.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveCollection($options: RemoveCollectionOptions!) {
  collection: RemoveCollection(options: $options) {
    id
    name
    # ... collection properties
  }
}
```

## Retrieve a collection

Used to get a single collection.

```ts
authenticator.collections.retrieve({
    id: membership.collectionId,
  })
  .then(collection => console.log(`Retrieved: ${collection.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- tag `string?`: used when id not provided.

Returns.

- [collection](#Model) `Promise<object, Error>` the collection requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query RetrieveCollection($options: RetrieveCollectionOptions!) {
  collection: RetrieveCollection(options: $options) {
    id
    name
    # ... collection properties
  }
}
```

## List collections

Used to get a list of collections.

```ts
authenticator.collections.list({
    search: 'Awesome',
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(collections => console.table(collections))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, code, and domains.
- limit `number?`: maximum number of collections returned.
- skip `number?`: skip this number of collections.
- page `number?`: skip this number of collections multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [collections](#Model) `Promise<object[], Error>`: a list of collections.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query ListCollections($options: ListCollectionsOptions!) {
  collections: ListCollections(options: $options) {
    id
    name
    # ... collection properties
  }
}
```

## Count collections

Used to count a collection of collections.

```ts
authenticator.collections.count({
    search: 'Awesome',
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, code, and domains.
  
Returns.

- count `Promise<number, Error>`: the number of collections counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountCollections($options: CountCollectionsOptions!) {
  count: CountCollections(options: $options)
}
```

## Analytics of collections

Used to get statistics of collections over time.

```ts
authenticator.collections.analytics({
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

- analytics `Promise<object, Error>`: statistics related to collections within time period.
  - labels `string[]`: date values within given period.
  - data `number[]`: values matching the labels.
  - created `number`: number of collections created.
  - updated `number`: number of collections updated.
  - active `number`: number of collections with 1 session or more.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query AnalyticsOfCollections($options: AnalyticsOfCollectionsOptions!) {
  analytics: AnalyticsOfCollections(options: $options) {
    labels
    data
    # ... analytics properties
  }
}
```

## Resources

- [Accessors](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/accessors.md)
- [Accounts](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/accounts.md)
- [Collections](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/collections.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/sessions.md)
