# Memberships API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `membership` model is used to collection a account to a collection.

- [Setup](#Model)
- [Membership model](#Model)

Methods.

- [Create a membership](#Create-a-membership)
- [Update a membership](#Update-a-membership)
- [Remove a membership](#Remove-a-membership)
- [Retrieve a membership](#Retrieve-a-membership)
- [List memberships](#List-memberships)
- [Count memberships](#Count-memberships)
- [Analytics of memberships](#Analytics-of-memberships)

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

## Membership model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- collection `object`: the related collection.
- account `object`: the related account.
- permissions `object[]`: the permissions assigned to member.
- meta `object?`: developer assigned attributes.
- email `string?`: email address - used when account not provided.

## Create a membership

Used to add a account as a new member of a collection.

```ts
authenticator.memberships.create({
    collection: collection.id,
    account: account.id,
    permissions: [permissionEditor.id, permissionCommentor.id],
    meta: {/* attributes */},
    email: 'invitation@email.com',
  })
  .then(membership => console.log(`Created: ${membership.id} at ${membership.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- collection: `string`: id of a collection.
- account: `string`: id of a account.
- permissions `string[]?`: ids of permissions assigned to member.
- meta `object?`: developer assigned attributes.
- email `string?`: email address - used when account not provided.

Returns.

- [membership](#Model) `Promise<object, Error>`: the created membership.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateMembership($options: CreateMembershipOptions!) {
  membership: CreateMembership(options: $options) {
    id
    # ... membership properties
  }
}
```

## Update a membership

Used to patch a membership's details.

```ts
authenticator.memberships.update({
    id: membership.id,
    permissions: [permissionEditor.id, permissionCommentor.id],
    meta: {/* attributes */},
  })
  .then(membership => console.log(`Updated: ${membership.id} at ${membership.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the membership to update.
- permissions `string[]?`: permission permissions assigned to member.
- meta `object?`: developer assigned attributes.

Returns.

- [membership](#Model) `Promise<object, Error>`: the updated membership.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateMembership($options: UpdateMembershipOptions!) {
  membership: UpdateMembership(options: $options) {
    id
    # ... membership properties
  }
}
```

## Remove a membership

Used to permanently remove a membership.

```ts
authenticator.memberships.remove({
    id: membership.id,
  })
  .then(membership => console.log(`Removed: ${membership.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.

Returns.

- [membership](#Model) `Promise<object, Error>` the removed membership.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveMembership($options: RemoveMembershipOptions!) {
  membership: RemoveMembership(options: $options) {
    id
    # ... membership properties
  }
}
```

## Retrieve a membership

Used to get a single membership.

```ts
authenticator.memberships.retrieve({
    id: membership.id,
  })
  .then(membership => console.log(`Retrieved: ${membership.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.

Returns.

- [membership](#Model) `Promise<object, Error>` the membership requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query RetrieveMembership($options: RetrieveMembershipOptions!) {
  membership: RetrieveMembership(options: $options) {
    id
    # ... membership properties
  }
}
```

## List memberships

Used to get a list of memberships.

```ts
authenticator.memberships.list({
    collection: collection.id,
    account: account.id,
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(memberships => console.table(memberships))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- collection: `string`: filtered by this collections's id.
- account: `string?`: filtered by this account's id.
- limit `number?`: maximum number of memberships returned.
- skip `number?`: skip this number of memberships.
- page `number?`: skip this number of memberships multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [memberships](#Model) `Promise<object[], Error>`: a list of memberships.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query ListMemberships($options: ListMembershipsOptions!) {
  memberships: ListMemberships(options: $options) {
    id
    # ... membership properties
  }
}
```

## Count memberships

Used to count a collection of memberships.

```ts
authenticator.memberships.count({
    collection: collection.id,
    account: account.id,
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- collection: `string`: filtered by this collections's id.
- account: `string?`: filtered by this account's id.
  
Returns.

- count `Promise<number, Error>`: the number of memberships counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountMemberships($options: CountMembershipsOptions!) {
  count: CountMemberships(options: $options)
}
```

## Analytics of memberships

Used to get statistics of memberships over time.

```ts
authenticator.memberships.analytics({
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

- analytics `Promise<object, Error>`: statistics related to memberships within time period.
  - labels `string[]`: date values within given period.
  - data `number[]`: values matching the labels.
  - created `number`: number of memberships created.
  - updated `number`: number of memberships updated.
  - active `number`: number of memberships with 1 session or more.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query AnalyticsOfMemberships($options: AnalyticsOfMembershipsOptions!) {
  analytics: AnalyticsOfMemberships(options: $options) {
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
