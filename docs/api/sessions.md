# Sessions API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `session` model is created when a user authenticates and requires an access token.

- [Setup](#Setup)
- [Session model](#Session-model)

Methods.

- [Create a session](#Create-a-session)
- [Update a session](#Update-a-session)
- [Remove a session](#Remove-a-session)
- [Get a session](#Get-a-session)
- [List sessions](#List-sessions)
- [Count sessions](#Count-sessions)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your codebase - use environment variables.

```ts
import { AuthenticatorAPI } from 'wga-api'

const wga = new AuthenticatorAPI({
  secret: process.env.AUTHENTICATOR_SECRET
})
```

## Session model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- team `string`: the related team.
- user `string`: the related user.
- meta `object?`: developer assigned attributes.
- expiry `Date`: the expiry time of the token.
- token `string`: the access token created by the session.
- deactivated `boolean`: manually deactivated token.

## Create a session

Used to sign up a session on your app.

```ts
wga.sessions.create({
    team: team.id,
    user: user.id,
    meta: {/* attributes */},
    expiry: new Date(),
    deactivated: false,
  })
  .then(session => console.log(`Created: ${session.id} at ${session.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- team `string`: the team's id.
- user `string`: the user's id.
- meta `object?`: developer assigned attributes.
- expiry `Date`: the expiry time of the token.
- deactivated `boolean`: manually deactivated token.

Returns.

- [session](#Session-model) `Promise<object, Error>`: the created session.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateSession($options: CreateSessionOptions!) {
  session: CreateSession(options: $options) {
    id
    # ... session properties
  }
}
```

## Update a session

Used to patch a session's details.

```ts
wga.sessions.update({
    id: session.id,
    meta: {/* attributes */},
    deactivated: false,
  })
  .then(session => console.log(`Updated: ${session.id} at ${session.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the session to update.
- meta `object?`: developer assigned attributes.
- deactivated `boolean`: manually deactivated token.

Returns.

- [session](#Session-model) `Promise<object, Error>`: the updated session.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateSession($options: UpdateSessionOptions!) {
  session: UpdateSession(options: $options) {
    id
    # ... session properties
  }
}
```

## Remove a session

Used to permanently remove a session.

```ts
wga.sessions.remove({
    id: membership.sessionId,
  })
  .then(session => console.log(`Removed: ${session.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.

Returns.

- [session](#Session-model) `Promise<object, Error>` the removed session.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveSession($options: RemoveSessionOptions!) {
  session: RemoveSession(options: $options) {
    id
    # ... session properties
  }
}
```

## Get a session

Used to get a single session.

```ts
wga.sessions.get({
    id: session.id,
  })
  .then(session => console.log(`Getd: ${session.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- token `string?`: this access token used if the id is not provided.

Returns.

- [session](#Session-model) `Promise<object, Error>` the session requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query GetSession($options: GetSessionOptions!) {
  session: GetSession(options: $options) {
    id
    # ... session properties
  }
}
```

## List sessions

Used to get a list of sessions.

```ts
wga.sessions.list({
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(sessions => console.table(sessions))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against session details.
- limit `number?`: maximum number of sessions returned.
- skip `number?`: skip this number of sessions.
- page `number?`: skip this number of sessions multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [sessions](#Session-model) `Promise<object[], Error>`: a list of sessions.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query ListSessions($options: ListSessionsOptions!) {
  sessions: ListSessions(options: $options) {
    id
    # ... session properties
  }
}
```

## Count sessions

Used to count a team of sessions.

```ts
wga.sessions.count()
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against session details.

Returns.

- count `Promise<number, Error>`: the number of sessions counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountSessions($options: CountSessionsOptions!) {
  count: CountSessions(options: $options)
}
```

## Resources

- [Users](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/users.md)
- [Teams](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/teams.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/sessions.md)
