# Teams API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `team` model is used to team multiple users together.

- [Setup](#Setup)
- [Team model](#Team-model)

Methods.

- [Create a team](#Create-a-team)
- [Update a team](#Update-a-team)
- [Remove a team](#Remove-a-team)
- [Get a team](#Get-a-team)
- [List teams](#List-teams)
- [Count teams](#Count-teams)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your codebase - use environment variables.

```ts
import { AuthenticatorAPI } from 'wga-api'

const wga = new AuthenticatorAPI({
  secret: process.env.AUTHENTICATOR_SECRET
})
```

## Team model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- meta `object?`: developer assigned attributes.
- name `string`: team name.
- tag `string`: unique code used in urls.
- description `string?`: description of the team.

## Create a team

Used to sign up a team on your app.

```ts
wga.teams.create({
    meta: {/* attributes */},
    name: 'Awesome Team',
    tag: 'awesome-team',
    description: 'Team made of awesome people',
  })
  .then(team => console.log(`Created: ${team.name} at ${team.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- meta `object?`: developer assigned attributes.
- name `string`: team name.
- tag `string`: unique code.
- description `string?`: description of the team.

Returns.

- [team](#Team-model) `Promise<object, Error>`: the created team.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateTeam($options: CreateTeamOptions!) {
  team: CreateTeam(options: $options) {
    id
    name
    # ... team properties
  }
}
```

## Update a team

Used to patch a team's details.

```ts
wga.teams.update({
    id: team.id,
    meta: {/* attributes */},
    name: 'Awesome Team',
    tag: 'awesome-team',
    description: 'Team made of awesome people x2',
  })
  .then(team => console.log(`Updated: ${team.name} at ${team.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the team to update.
- meta `object?`: developer assigned attributes.
- name `string?`: team name.
- tag `string?`: unique code.
- description `string?`: description of the team.

Returns.

- [team](#Team-model) `Promise<object, Error>`: the updated team.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateTeam($options: UpdateTeamOptions!) {
  team: UpdateTeam(options: $options) {
    id
    name
    # ... team properties
  }
}
```

## Remove a team

Used to permanently remove a team.

```ts
wga.teams.remove({
    id: membership.teamId,
  })
  .then(team => console.log(`Removed: ${team.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- tag `string?`: used when id not provided.

Returns.

- [team](#Team-model) `Promise<object, Error>` the removed team.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveTeam($options: RemoveTeamOptions!) {
  team: RemoveTeam(options: $options) {
    id
    name
    # ... team properties
  }
}
```

## Get a team

Used to get a single team.

```ts
wga.teams.get({
    id: membership.teamId,
  })
  .then(team => console.log(`Getd: ${team.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- tag `string?`: used when id not provided.

Returns.

- [team](#Team-model) `Promise<object, Error>` the team requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query GetTeam($options: GetTeamOptions!) {
  team: GetTeam(options: $options) {
    id
    name
    # ... team properties
  }
}
```

## List teams

Used to get a list of teams.

```ts
wga.teams.list({
    search: 'Awesome',
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(teams => console.table(teams))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, code.
- limit `number?`: maximum number of teams returned.
- skip `number?`: skip this number of teams.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [teams](#Team-model) `Promise<object[], Error>`: a list of teams.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query ListTeams($options: ListTeamsOptions!) {
  teams: ListTeams(options: $options) {
    id
    name
    # ... team properties
  }
}
```

## Count teams

Used to count a team of teams.

```ts
wga.teams.count({
    search: 'Awesome',
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, code.
  
Returns.

- count `Promise<number, Error>`: the number of teams counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountTeams($options: CountTeamsOptions!) {
  count: CountTeams(options: $options)
}
```

## Resources

- [Users](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/users.md)
- [Teams](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/teams.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/sessions.md)
