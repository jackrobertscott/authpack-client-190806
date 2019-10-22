# Memberships API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `membership` model is used to associate a user with a team.

- [Setup](#Setup)
- [Membership model](#Membership-model)

Methods.

- [Create a membership](#Create-a-membership)
- [Update a membership](#Update-a-membership)
- [Remove a membership](#Remove-a-membership)
- [Retrieve a membership](#Retrieve-a-membership)
- [List memberships](#List-memberships)
- [Count memberships](#Count-memberships)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your codebase - use environment variables.

```ts
import { AuthenticatorAPI } from 'wga-api'

const wga = new AuthenticatorAPI({
  secret: process.env.AUTHENTICATOR_SECRET
  devmode: false,
})
```

## Membership model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- team `object`: the related team.
- user `object`: the related user.
- permissions `object[]`: the permissions assigned to member.
- meta `object?`: developer assigned attributes.
- email `string?`: email address - used when user not provided.

## Create a membership

Used to add a user as a new member of a team.

```ts
wga.memberships.create({
    team: team.id,
    user: user.id,
    permissions: [permissionEditor.id, permissionCommentor.id],
    meta: {/* attributes */},
    email: 'invitation@email.com',
  })
  .then(membership => console.log(`Created: ${membership.id} at ${membership.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- team: `string`: id of a team.
- user: `string`: id of a user.
- permissions `string[]?`: ids of permissions assigned to member.
- meta `object?`: developer assigned attributes.
- email `string?`: email address - used when user not provided.

Returns.

- [membership](#Membership-model) `Promise<object, Error>`: the created membership.

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
wga.memberships.update({
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

- [membership](#Membership-model) `Promise<object, Error>`: the updated membership.

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
wga.memberships.remove({
    id: membership.id,
  })
  .then(membership => console.log(`Removed: ${membership.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.

Returns.

- [membership](#Membership-model) `Promise<object, Error>` the removed membership.

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
wga.memberships.retrieve({
    id: membership.id,
  })
  .then(membership => console.log(`Retrieved: ${membership.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.

Returns.

- [membership](#Membership-model) `Promise<object, Error>` the membership requested.

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
wga.memberships.list({
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(memberships => console.table(memberships))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against membership details.
- limit `number?`: maximum number of memberships returned.
- skip `number?`: skip this number of memberships.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [memberships](#Membership-model) `Promise<object[], Error>`: a list of memberships.

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

Used to count a team of memberships.

```ts
wga.memberships.count()
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against membership details.
  
Returns.

- count `Promise<number, Error>`: the number of memberships counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountMemberships($options: CountMembershipsOptions!) {
  count: CountMemberships(options: $options)
}
```

## Resources

- [Users](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/users.md)
- [Teams](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/teams.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/sessions.md)
