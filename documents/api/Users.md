# Users API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `user` model is used to identify a single person who has signed up to your app.

- [User model](#Model)

Methods.

- [Create a user](#Create-a-user)
- [Update a user](#Update-a-user)
- [Retrieve a user](#Retrieve-a-user)
- [Query users](#Query-users)
- [Count users](#Count-users)
- [Remove a user](#Remove-a-user)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Model

Properties.

- id `string`: unique identifier.
- name `string`: full name.
- email `string`: valid email address.
- username `string`: unique code.
- password `string`: encrypted string.
- data `object?`: developer assigned attributes.
- created `Date`: time of creation.
- updated `Date`: time of last update.

## Setup

Never store your private keys in your code base - use environment variables.

```ts
import { Authenticator } from 'wga-api';

const authenticator = new Authenticator({
  key: process.env.wgaPrivateKey
});
```

## Create a user

Used to sign up a user on your app.

```ts
authenticator.users.create({
    name: 'Fred Blogs',
    email: 'fredBlogs@example.com',
    username: 'freddy123',
    password: authenticator.utils.encrypt('SecretPassword123'),
    data: {
      dogsName: 'Bobby',
    },
  })
  .then(user => console.log(`Created: ${user.name} at ${user.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- name `string`: full name.
- email `string`: valid email address.
- username `string`: unique code.
- password `string`: encrypted string.
- data `object?`: developer assigned attributes.

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
    name: 'Fred Blogs',
    username: 'freddy123',
    email: 'fredBlogs@example.com',
    password: authenticator.utils.encrypt('SecretPassword123'),
    data: {
      dogsName: 'Bobby',
    },
  })
  .then(user => console.log(`Created: ${user.name} at ${user.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the user to update.
- name `string?`: full name.
- email `string?`: valid email address.
- username `string?`: unique code.
- password `string?`: encrypted string.
- data `object?`: developer assigned attributes.

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

## Retrieve a user

Used to get a single user.

```ts
authenticator.users.retrieve({
    id: membership.userId,
  })
  .then(user => console.log(`Retrieved: ${user.name} at ${user.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- username `string?`: used when id not provided.
- email `string?`: used when neither id and username are provided.

Returns.

- user `object`: the user requested.

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

## Query users

Used to get a list of users.

```ts
authenticator.users.query({
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
query QueryUsers($options: QueryUsersOptions!) {
  users: QueryUsers(options: $options) {
    id
    name
    # ... user properties
  }
}
```

## Count users

Used to count a group of users.

```ts
authenticator.users.count({
    search: 'Fred',
  })
  .then(count => console.log(`Users counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, username, and email.
  
Returns.

- count `number`: the number of users counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountUsers($options: CountUsersOptions!) {
  count: CountUsers(options: $options)
}
```

## Remove a user

Used to permanently remove a user.

```ts
authenticator.users.remove({
    id: membership.userId,
  })
  .then(user => console.log(`Retrieved: ${user.name} at ${user.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- username `string?`: used when id not provided.
- email `string?`: used when neither id and username are provided.

Returns.

- user `object`: the user removed.

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

## Resources

- [Users](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Users.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Sessions.md)
- [Workspaces](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Workspaces.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Memberships.md)
- [Scopes](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Scopes.md)
- [Themes](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Themes.md)
