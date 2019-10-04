# Users API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `user` model is used to identify a single person who has signed up to your app.

- [Setup](#Model)
- [User model](#Model)

Methods.

- [Create a user](#Create-a-user)
- [Update a user](#Update-a-user)
- [Remove a user](#Remove-a-user)
- [Retrieve a user](#Retrieve-a-user)
- [List users](#List-users)
- [Count users](#Count-users)
- [Analytics of users](#Analytics-of-users)

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

## User model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- meta `object?`: developer assigned attributes.
- email `string?`: valid email address.
- username `string?`: unique code.
- password `string?`: encrypted string.
- avatar `string?`: url pointing to the user's avatar image.
- name `string?`: full name.

## Create a user

Used to sign up a user on your app.

```ts
authenticator.users.create({
    meta: {/* attributes */},
    email: 'fredBlogs@example.com',
    username: 'freddy123',
    password: 'SecretPassword123',
    avatar: 'https://images.example.com/profile.png',
    name: 'Fred Blogs',
  })
  .then(user => console.log(`Created: ${user.name} at ${user.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- meta `object?`: developer assigned attributes.
- email `string`: valid email address.
- username `string`: unique code.
- password `string`: password string - we recommend you encrypt this as well.
- avatar `string?`: a url to an image.
- name `string`: full name.

Returns.

- [user](#Model) `Promise<object, Error>`: the created user.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateUser($options: CreateUserOptions!) {
  user: CreateUser(options: $options) {
    id
    name
    # ... user properties
  }
}
```

## Update a user

Used to patch a user's details.

```ts
authenticator.users.update({
    id: user.id,
    meta: {/* attributes */},
    email: 'fredBlogs@example.com',
    username: 'freddy123',
    password: crypto.createHash('md5').update('SecretPassword123').digest('hex'),
    avatar: 'https://images.example.com/profile.png',
    name: 'Fred Blogs',
  })
  .then(user => console.log(`Updated: ${user.name} at ${user.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the user to update.
- meta `object?`: developer assigned attributes.
- email `string?`: valid email address.
- username `string?`: unique code.
- password `string?`: encrypted string.
- avatar `string?`: a url to an image.
- name `string?`: full name.

Returns.

- [user](#Model) `Promise<object, Error>`: the updated user.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateUser($options: UpdateUserOptions!) {
  user: UpdateUser(options: $options) {
    id
    name
    # ... user properties
  }
}
```

## Remove a user

Used to permanently remove a user.

```ts
authenticator.users.remove({
    id: membership.userId,
  })
  .then(user => console.log(`Removed: ${user.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- email `string?`: used when id not provided.
- username `string?`: used when neither id and email are provided.

Returns.

- [user](#Model) `Promise<object, Error>` the removed user.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveUser($options: RemoveUserOptions!) {
  user: RemoveUser(options: $options) {
    id
    name
    # ... user properties
  }
}
```

## Retrieve a user

Used to get a single user.

```ts
authenticator.users.retrieve({
    id: membership.userId,
  })
  .then(user => console.log(`Retrieved: ${user.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- email `string?`: used when id not provided.
- username `string?`: used when neither id and email are provided.

Returns.

- [user](#Model) `Promise<object, Error>` the user requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query RetrieveUser($options: RetrieveUserOptions!) {
  user: RetrieveUser(options: $options) {
    id
    name
    # ... user properties
  }
}
```

## List users

Used to get a list of users.

```ts
authenticator.users.list({
    search: 'Fred',
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(users => console.table(users))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, username, and email.
- limit `number?`: maximum number of users returned.
- skip `number?`: skip this number of users.
- page `number?`: skip this number of users multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [users](#Model) `Promise<object[], Error>`: a list of users.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query ListUsers($options: ListUsersOptions!) {
  users: ListUsers(options: $options) {
    id
    name
    # ... user properties
  }
}
```

## Count users

Used to count a workspace of users.

```ts
authenticator.users.count({
    search: 'Fred',
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, username, and email.
  
Returns.

- count `Promise<number, Error>`: the number of users counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountUsers($options: CountUsersOptions!) {
  count: CountUsers(options: $options)
}
```

## Analytics of users

Used to get statistics of users over time.

```ts
authenticator.users.analytics({
    ending: Date.now(),
    months: 6,
  })
  .then(analytics => console.table(analytics))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- ending `string?`: the final day in the period i.e. `2019-12-24`.
- months `number?`: number of months to analyse.
  
Returns.

- analytics `Promise<object, Error>`: statistics related to users within time period.
  - labels `string[]`: date values within given period.
  - data `number[]`: values matching the labels.
  - created `number`: number of users created.
  - updated `number`: number of users updated.
  - active `number`: number of users with 1 session or more.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query AnalyticsOfUsers($options: AnalyticsOfUsersOptions!) {
  analytics: AnalyticsOfUsers(options: $options) {
    labels
    data
    # ... analytics properties
  }
}
```

## Resources

- [Users](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/users.md)
- [Workspaces](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/workspaces.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/sessions.md)
