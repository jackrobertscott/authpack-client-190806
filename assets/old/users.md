# Users API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `user` model is used to identify a single person who has signed up to your app.

- [Setup](#Setup)
- [User model](#User-model)

Methods.

- [Create a user](#Create-a-user)
- [Update a user](#Update-a-user)
- [Remove a user](#Remove-a-user)
- [Get a user](#Get-a-user)
- [List users](#List-users)
- [Count users](#Count-users)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your codebase - use environment variables.

```ts
import { AuthenticatorAPI } from 'wga-api'

const wga = new AuthenticatorAPI({
  secret: process.env.AUTHENTICATOR_SECRET
})
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
wga.users.create({
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

- [user](#User-model) `Promise<object, Error>`: the created user.

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
wga.users.update({
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

- [user](#User-model) `Promise<object, Error>`: the updated user.

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
wga.users.remove({
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

- [user](#User-model) `Promise<object, Error>` the removed user.

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

## Get a user

Used to get a single user.

```ts
wga.users.get({
    id: membership.userId,
  })
  .then(user => console.log(`Getd: ${user.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- email `string?`: used when id not provided.
- username `string?`: used when neither id and email are provided.

Returns.

- [user](#User-model) `Promise<object, Error>` the user requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query GetUser($options: GetUserOptions!) {
  user: GetUser(options: $options) {
    id
    name
    # ... user properties
  }
}
```

## List users

Used to get a list of users.

```ts
wga.users.list({
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

- [users](#User-model) `Promise<object[], Error>`: a list of users.

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

Used to count a team of users.

```ts
wga.users.count({
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

## Resources

- [Users](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/users.md)
- [Teams](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/teams.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/sessions.md)
