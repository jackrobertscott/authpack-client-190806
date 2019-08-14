# Accounts API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `account` model is used to identify a single person who has signed up to your app.

- [Setup](#Model)
- [Account model](#Model)

Methods.

- [Create a account](#Create-a-account)
- [Update a account](#Update-a-account)
- [Remove a account](#Remove-a-account)
- [Retrieve a account](#Retrieve-a-account)
- [List accounts](#List-accounts)
- [Count accounts](#Count-accounts)
- [Analytics of accounts](#Analytics-of-accounts)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your codebase - use environment variables.

```ts
import { Authenticator } from 'wga-api';

const authenticator = new Authenticator({
  key: process.env.authenticatorPrivateKey
});
```

## Account model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- meta `object?`: developer assigned attributes.
- email `string?`: valid email address.
- username `string?`: unique code.
- password `string?`: encrypted string.
- avatar `string?`: url pointing to the account's avatar image.
- name `string?`: full name.

## Create a account

Used to sign up a account on your app.

```ts
authenticator.accounts.create({
    meta: {/* attributes */},
    email: 'fredBlogs@example.com',
    username: 'freddy123',
    password: crypto.createHash('md5').update('SecretPassword123').digest('hex'),
    avatar: 'https://images.example.com/profile.png',
    name: 'Fred Blogs',
  })
  .then(account => console.log(`Created: ${account.name} at ${account.created}`))
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

- [account](#Model) `Promise<object, Error>`: the created account.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateAccount($options: CreateAccountOptions!) {
  account: CreateAccount(options: $options) {
    id
    name
    # ... account properties
  }
}
```

## Update a account

Used to patch a account's details.

```ts
authenticator.accounts.update({
    id: account.id,
    meta: {/* attributes */},
    email: 'fredBlogs@example.com',
    username: 'freddy123',
    password: crypto.createHash('md5').update('SecretPassword123').digest('hex'),
    avatar: 'https://images.example.com/profile.png',
    name: 'Fred Blogs',
  })
  .then(account => console.log(`Updated: ${account.name} at ${account.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the account to update.
- meta `object?`: developer assigned attributes.
- email `string?`: valid email address.
- username `string?`: unique code.
- password `string?`: encrypted string.
- avatar `string?`: a url to an image.
- name `string?`: full name.

Returns.

- [account](#Model) `Promise<object, Error>`: the updated account.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateAccount($options: UpdateAccountOptions!) {
  account: UpdateAccount(options: $options) {
    id
    name
    # ... account properties
  }
}
```

## Remove a account

Used to permanently remove a account.

```ts
authenticator.accounts.remove({
    id: membership.accountId,
  })
  .then(account => console.log(`Removed: ${account.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- email `string?`: used when id not provided.
- username `string?`: used when neither id and email are provided.

Returns.

- [account](#Model) `Promise<object, Error>` the removed account.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveAccount($options: RemoveAccountOptions!) {
  account: RemoveAccount(options: $options) {
    id
    name
    # ... account properties
  }
}
```

## Retrieve a account

Used to get a single account.

```ts
authenticator.accounts.retrieve({
    id: membership.accountId,
  })
  .then(account => console.log(`Retrieved: ${account.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- email `string?`: used when id not provided.
- username `string?`: used when neither id and email are provided.

Returns.

- [account](#Model) `Promise<object, Error>` the account requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query RetrieveAccount($options: RetrieveAccountOptions!) {
  account: RetrieveAccount(options: $options) {
    id
    name
    # ... account properties
  }
}
```

## List accounts

Used to get a list of accounts.

```ts
authenticator.accounts.list({
    search: 'Fred',
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(accounts => console.table(accounts))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, username, and email.
- limit `number?`: maximum number of accounts returned.
- skip `number?`: skip this number of accounts.
- page `number?`: skip this number of accounts multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [accounts](#Model) `Promise<object[], Error>`: a list of accounts.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query ListAccounts($options: ListAccountsOptions!) {
  accounts: ListAccounts(options: $options) {
    id
    name
    # ... account properties
  }
}
```

## Count accounts

Used to count a group of accounts.

```ts
authenticator.accounts.count({
    search: 'Fred',
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, username, and email.
  
Returns.

- count `Promise<number, Error>`: the number of accounts counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountAccounts($options: CountAccountsOptions!) {
  count: CountAccounts(options: $options)
}
```

## Analytics of accounts

Used to get statistics of accounts over time.

```ts
authenticator.accounts.analytics({
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

- analytics `Promise<object, Error>`: statistics related to accounts within time period.
  - labels `string[]`: date values within given period.
  - data `number[]`: values matching the labels.
  - created `number`: number of accounts created.
  - updated `number`: number of accounts updated.
  - active `number`: number of accounts with 1 session or more.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query AnalyticsOfAccounts($options: AnalyticsOfAccountsOptions!) {
  analytics: AnalyticsOfAccounts(options: $options) {
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
