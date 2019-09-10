# Sessions API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `session` model is created when a account authenticates and requires an access token.

- [Setup](#Model)
- [Session model](#Model)

Methods.

- [Create a session](#Create-a-session)
- [Update a session](#Update-a-session)
- [Remove a session](#Remove-a-session)
- [Retrieve a session](#Retrieve-a-session)
- [List sessions](#List-sessions)
- [Count sessions](#Count-sessions)
- [Analytics of sessions](#Analytics-of-sessions)

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

## Session model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- group `string`: the related group.
- account `string`: the related account.
- meta `object?`: developer assigned attributes.
- expiry `Date`: the expiry time of the token.
- token `string`: the access token created by the session.
- deactivated `boolean`: manually deactivated token.

## Create a session

Used to sign up a session on your app.

```ts
authenticator.sessions.create({
    group: group.id,
    account: account.id,
    meta: {/* attributes */},
    expiry: new Date(),
    deactivated: false,
  })
  .then(session => console.log(`Created: ${session.id} at ${session.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- group `string`: the group's id.
- account `string`: the account's id.
- meta `object?`: developer assigned attributes.
- expiry `Date`: the expiry time of the token.
- deactivated `boolean`: manually deactivated token.

Returns.

- [session](#Model) `Promise<object, Error>`: the created session.

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
authenticator.sessions.update({
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

- [session](#Model) `Promise<object, Error>`: the updated session.

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
authenticator.sessions.remove({
    id: membership.sessionId,
  })
  .then(session => console.log(`Removed: ${session.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.

Returns.

- [session](#Model) `Promise<object, Error>` the removed session.

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

## Retrieve a session

Used to get a single session.

```ts
authenticator.sessions.retrieve({
    id: session.id,
  })
  .then(session => console.log(`Retrieved: ${session.id}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- token `string?`: this access token used if the id is not provided.

Returns.

- [session](#Model) `Promise<object, Error>` the session requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query RetrieveSession($options: RetrieveSessionOptions!) {
  session: RetrieveSession(options: $options) {
    id
    # ... session properties
  }
}
```

## List sessions

Used to get a list of sessions.

```ts
authenticator.sessions.list({
    account: account.id,
    group: group.id,
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(sessions => console.table(sessions))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- group `string?`: filtered by this group's id.
- account `string?`: filtered by this account's id.
- limit `number?`: maximum number of sessions returned.
- skip `number?`: skip this number of sessions.
- page `number?`: skip this number of sessions multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [sessions](#Model) `Promise<object[], Error>`: a list of sessions.

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

Used to count a group of sessions.

```ts
authenticator.sessions.count({
    account: account.id,
    group: group.id,
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- group `string?`: filtered by this group's id.
- account `string?`: filtered by this account's id.
  
Returns.

- count `Promise<number, Error>`: the number of sessions counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountSessions($options: CountSessionsOptions!) {
  count: CountSessions(options: $options)
}
```

## Analytics of sessions

Used to get statistics of sessions over time.

```ts
authenticator.sessions.analytics({
    date: Date.now(),
    months: 6,
  })
  .then(analytics => console.table(analytics))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- ending `string?`: the final day in the period i.e. `2019-12-24`.
- months `number?`: number of months to analyse.
  
Returns.

- analytics `Promise<object, Error>`: statistics related to sessions within time period.
  - labels `string[]`: date values within given period.
  - data `number[]`: values matching the labels.
  - created `number`: number of sessions created.
  - updated `number`: number of sessions updated.
  - active `number`: number of sessions with 1 session or more.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query AnalyticsOfSessions($options: AnalyticsOfSessionsOptions!) {
  analytics: AnalyticsOfSessions(options: $options) {
    labels
    data
    # ... analytics properties
  }
}
```

## Resources

- [Accessors](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/accessors.md)
- [Accounts](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/accounts.md)
- [Groups](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/groups.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/sessions.md)
