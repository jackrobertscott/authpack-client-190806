# Providers API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `provider` model stores 3rd party app details.

- [Setup](#Setup)
- [Provider model](#Provider-model)

Methods.

- [Create a provider](#Create-a-provider)
- [Update a provider](#Update-a-provider)
- [Remove a provider](#Remove-a-provider)
- [Get a provider](#Get-a-provider)
- [List providers](#List-providers)
- [Count providers](#Count-providers)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your codebase - use environment variables.

```ts
import { AuthenticatorAPI } from 'wga-api'

const wga = new AuthenticatorAPI({
  secret: process.env.AUTHENTICATOR_SECRET
})
```

## Provider model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- meta `object?`: developer assigned attributes.
- name `string`: the providers name e.g. Facebook.
- tag `string`: a unique code for provider e.g. `facebook`.
- client `string`: the oauth client id.
- redirect `string`: the oauth redirect url.
- scopes `string`: the oauth permissions which are required.
- url `string`: the generated 3rd party authentication page.

## Create a provider

Used to add a user as a new member of a team.

```ts
wga.providers.create({
    meta: {/* attributes */},
    name: 'Facebook',
    tag: 'facebook',
    client: 'FACEBOOK_APP_ID',
    secret: 'FACEBOOK_APP_SECRET_KEY',
    scopes: 'users:read,repos:read,repos:write',
    redirect: 'https://example.com/login/facebook',
  })
  .then(provider => console.log(`Created: ${provider.id} at ${provider.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- meta `object?`: developer assigned attributes.
- name `string`: the providers name.
- tag `string`: a unique code for provider.
- client `string`: the oauth client id.
- secret `string`: the oauth client secret.
- scopes `string`: the oauth permissions which are required.
- redirect `string`: the oauth redirect url.

Returns.

- [provider](#Provider-model) `Promise<object, Error>`: the created provider.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateProvider($options: CreateProviderOptions!) {
  provider: CreateProvider(options: $options) {
    id
    # ... provider properties
  }
}
```

## Update a provider

Used to patch a provider's details.

```ts
wga.providers.update({
    id: provider.id,
    meta: {/* attributes */},
    name: 'Facebook',
    tag: 'facebook',
    client: 'FACEBOOK_APP_ID',
    secret: 'FACEBOOK_APP_SECRET_KEY',
    scopes: 'users:read,repos:read,repos:write',
    redirect: 'https://example.com/login/facebook',
  })
  .then(provider => console.log(`Updated: ${provider.id} at ${provider.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the provider to update.
- meta `object?`: developer assigned attributes.
- name `string?`: the providers name.
- tag `string?`: a unique code for provider.
- client `string?`: the oauth client id.
- secret `string?`: the oauth client secret.
- scopes `string?`: the oauth permissions which are required.
- redirect `string?`: the oauth redirect url.

Returns.

- [provider](#Provider-model) `Promise<object, Error>`: the updated provider.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateProvider($options: UpdateProviderOptions!) {
  provider: UpdateProvider(options: $options) {
    id
    # ... provider properties
  }
}
```

## Remove a provider

Used to permanently remove a provider.

```ts
wga.providers.remove({
    id: provider.providerId,
  })
  .then(provider => console.log(`Removed: ${provider.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- tag `string?`: used when id not provided.

Returns.

- [provider](#Provider-model) `Promise<object, Error>` the removed provider.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveProvider($options: RemoveProviderOptions!) {
  provider: RemoveProvider(options: $options) {
    id
    # ... provider properties
  }
}
```

## Get a provider

Used to get a single provider.

```ts
wga.providers.get({
    id: provider.providerId,
  })
  .then(provider => console.log(`Getd: ${provider.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- tag `string?`: used when id not provided.

Returns.

- [provider](#Provider-model) `Promise<object, Error>` the provider requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query GetProvider($options: GetProviderOptions!) {
  provider: GetProvider(options: $options) {
    id
    # ... provider properties
  }
}
```

## List providers

Used to get a list of providers.

```ts
wga.providers.list({
    search: 'Google',
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(providers => console.table(providers))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, and tag.
- limit `number?`: maximum number of providers returned.
- skip `number?`: skip this number of providers.
- page `number?`: skip this number of providers multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [providers](#Provider-model) `Promise<object[], Error>`: a list of providers.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query ListProviders($options: ListProvidersOptions!) {
  providers: ListProviders(options: $options) {
    id
    # ... provider properties
  }
}
```

## Count providers

Used to count a team of providers.

```ts
wga.providers.count({
    search: 'Google',
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, and tag.
  
Returns.

- count `Promise<number, Error>`: the number of providers counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountProviders($options: CountProvidersOptions!) {
  count: CountProviders(options: $options)
}
```

## Resources

- [Users](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/users.md)
- [Teams](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/teams.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/sessions.md)
