# Groups API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `group` model is used to identify a single person who has signed up to your app.

- [Setup](#Model)
- [Group model](#Model)

Methods.

- [Create a group](#Create-a-group)
- [Update a group](#Update-a-group)
- [Remove a group](#Remove-a-group)
- [Retrieve a group](#Retrieve-a-group)
- [List groups](#List-groups)
- [Count groups](#Count-groups)
- [Analytics of groups](#Analytics-of-groups)

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

## Group model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- meta `object?`: developer assigned attributes.
- name `string`: group name.
- tag `string`: unique code used in urls.
- domains `string[]`: whitelisted domains for using the authenticator API.

## Create a group

Used to sign up a group on your app.

```ts
authenticator.groups.create({
    meta: {/* attributes */},
    name: 'Awesome Group',
    tag: 'awesome-group',
    domains: ['app.example.com'],
  })
  .then(group => console.log(`Created: ${group.name} at ${group.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- meta `object?`: developer assigned attributes.
- name `string`: group name.
- tag `string`: unique code.
- domains `string[]`: whitelisted domains for using the authenticator API.

Returns.

- [group](#Model) `Promise<object, Error>`: the created group.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateGroup($options: CreateGroupOptions!) {
  group: CreateGroup(options: $options) {
    id
    name
    # ... group properties
  }
}
```

## Update a group

Used to patch a group's details.

```ts
authenticator.groups.update({
    id: group.id,
    meta: {/* attributes */},
    name: 'Awesome Group',
    tag: 'awesome-group',
    domains: ['app.example.com'],
  })
  .then(group => console.log(`Updated: ${group.name} at ${group.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the group to update.
- meta `object?`: developer assigned attributes.
- name `string?`: group name.
- tag `string?`: unique code.
- domains `string[]?`: whitelisted domains for using the authenticator API.

Returns.

- [group](#Model) `Promise<object, Error>`: the updated group.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateGroup($options: UpdateGroupOptions!) {
  group: UpdateGroup(options: $options) {
    id
    name
    # ... group properties
  }
}
```

## Remove a group

Used to permanently remove a group.

```ts
authenticator.groups.remove({
    id: membership.groupId,
  })
  .then(group => console.log(`Removed: ${group.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- tag `string?`: used when id not provided.

Returns.

- [group](#Model) `Promise<object, Error>` the removed group.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveGroup($options: RemoveGroupOptions!) {
  group: RemoveGroup(options: $options) {
    id
    name
    # ... group properties
  }
}
```

## Retrieve a group

Used to get a single group.

```ts
authenticator.groups.retrieve({
    id: membership.groupId,
  })
  .then(group => console.log(`Retrieved: ${group.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- tag `string?`: used when id not provided.

Returns.

- [group](#Model) `Promise<object, Error>` the group requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query RetrieveGroup($options: RetrieveGroupOptions!) {
  group: RetrieveGroup(options: $options) {
    id
    name
    # ... group properties
  }
}
```

## List groups

Used to get a list of groups.

```ts
authenticator.groups.list({
    search: 'Awesome',
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(groups => console.table(groups))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, code, and domains.
- limit `number?`: maximum number of groups returned.
- skip `number?`: skip this number of groups.
- page `number?`: skip this number of groups multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [groups](#Model) `Promise<object[], Error>`: a list of groups.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query ListGroups($options: ListGroupsOptions!) {
  groups: ListGroups(options: $options) {
    id
    name
    # ... group properties
  }
}
```

## Count groups

Used to count a group of groups.

```ts
authenticator.groups.count({
    search: 'Awesome',
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, code, and domains.
  
Returns.

- count `Promise<number, Error>`: the number of groups counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountGroups($options: CountGroupsOptions!) {
  count: CountGroups(options: $options)
}
```

## Analytics of groups

Used to get statistics of groups over time.

```ts
authenticator.groups.analytics({
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

- analytics `Promise<object, Error>`: statistics related to groups within time period.
  - labels `string[]`: date values within given period.
  - data `number[]`: values matching the labels.
  - created `number`: number of groups created.
  - updated `number`: number of groups updated.
  - active `number`: number of groups with 1 session or more.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query AnalyticsOfGroups($options: AnalyticsOfGroupsOptions!) {
  analytics: AnalyticsOfGroups(options: $options) {
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
