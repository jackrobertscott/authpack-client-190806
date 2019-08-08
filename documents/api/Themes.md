# Themes API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `theme` model is used to identify a single person who has signed up to your app.

- [Setup](#Model)
- [Theme model](#Model)

Methods.

- [Create a theme](#Create-a-theme)
- [Update a theme](#Update-a-theme)
- [Remove a theme](#Remove-a-theme)
- [Retrieve a theme](#Retrieve-a-theme)
- [Query themes](#Query-themes)
- [Count themes](#Count-themes)
- [Analytics of themes](#Analytics-of-themes)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your code base - use environment variables.

```ts
import { Authenticator } from 'wga-api';

const authenticator = new Authenticator({
  key: process.env.wgaPrivateKey
});
```

## Theme model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- name `string`: full name.
- email `string`: valid email address.
- themename `string`: unique code.
- password `string`: encrypted string.
- avatar `string?`: url pointing to the themes avatar image.
- data `object?`: developer assigned attributes.

## Create a theme

Used to sign up a theme on your app.

```ts
authenticator.themes.create({
    name: 'Fred Blogs',
    email: 'fredBlogs@example.com',
    themename: 'freddy123',
    password: authenticator.utils.encrypt('SecretPassword123'),
    avatar: document.getElementById('fileInput').files[0],
    data: {
      // custom json attributes
    },
  })
  .then(theme => console.log(`Created: ${theme.name} at ${theme.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- name `string`: full name.
- email `string`: valid email address.
- themename `string`: unique code.
- password `string`: encrypted string.
- avatar `File?`: a JavaScript [File](https://developer.mozilla.org/en-US/docs/Web/API/File) object.
- data `object?`: developer assigned attributes.

Returns.

- [theme](#Model) `Promise<object, Error>`: the created theme.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateTheme($options: CreateThemeOptions!) {
  theme: CreateTheme(options: $options) {
    id
    name
    # ... theme properties
  }
}
```

## Update a theme

Used to patch a theme's details.

```ts
authenticator.themes.update({
    id: theme.id,
    name: 'Fred Blogs',
    themename: 'freddy123',
    email: 'fredBlogs@example.com',
    password: authenticator.utils.encrypt('SecretPassword123'),
    avatar: document.getElementById('fileInput').files[0],
    data: {
      // custom json attributes
    },
  })
  .then(theme => console.log(`Updated: ${theme.name} at ${theme.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the theme to update.
- name `string?`: full name.
- email `string?`: valid email address.
- themename `string?`: unique code.
- password `string?`: encrypted string.
- avatar `File?`: a JavaScript [File](https://developer.mozilla.org/en-US/docs/Web/API/File) object.
- data `object?`: developer assigned attributes.

Returns.

- [theme](#Model) `Promise<object, Error>`: the updated theme.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateTheme($options: UpdateThemeOptions!) {
  theme: UpdateTheme(options: $options) {
    id
    name
    # ... theme properties
  }
}
```

## Remove a theme

Used to permanently remove a theme.

```ts
authenticator.themes.remove({
    id: membership.themeId,
  })
  .then(theme => console.log(`Removed: ${theme.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- themename `string?`: used when id not provided.
- email `string?`: used when neither id and themename are provided.

Returns.

- [theme](#Model) `object`: the removed theme.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveTheme($options: RemoveThemeOptions!) {
  theme: RemoveTheme(options: $options) {
    id
    name
    # ... theme properties
  }
}
```

## Retrieve a theme

Used to get a single theme.

```ts
authenticator.themes.retrieve({
    id: membership.themeId,
  })
  .then(theme => console.log(`Retrieved: ${theme.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- themename `string?`: used when id not provided.
- email `string?`: used when neither id and themename are provided.

Returns.

- [theme](#Model) `object`: the theme requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query RetrieveTheme($options: RetrieveThemeOptions!) {
  theme: RetrieveTheme(options: $options) {
    id
    name
    # ... theme properties
  }
}
```

## Query themes

Used to get a list of themes.

```ts
authenticator.themes.query({
    search: 'Fred',
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(themes => console.table(themes))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, themename, and email.
- limit `number?`: maximum number of themes returned.
- skip `number?`: skip this number of themes.
- page `number?`: skip this number of themes multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [themes](#Model) `Promise<object[], Error>`: a list of themes.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query QueryThemes($options: QueryThemesOptions!) {
  themes: QueryThemes(options: $options) {
    id
    name
    # ... theme properties
  }
}
```

## Count themes

Used to count a group of themes.

```ts
authenticator.themes.count({
    search: 'Fred',
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, themename, and email.
  
Returns.

- count `number`: the number of themes counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountThemes($options: CountThemesOptions!) {
  count: CountThemes(options: $options)
}
```

## Analytics of themes

Used to get statistics of themes over time.

```ts
authenticator.themes.analytics({
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

- analytics `object`: statistics related to themes within time period.
  - labels `string[]`: date values within given period.
  - data `number[]`: values matching the labels.
  - created `number`: number of themes created.
  - updated `number`: number of themes updated.
  - active `number`: number of themes with 1 session or more.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query AnalyticsOfThemes($options: AnalyticsOfThemesOptions!) {
  analytics: AnalyticsOfThemes(options: $options) {
    labels
    data
    # ... analytics properties
  }
}
```

## Resources

- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Memberships.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Providers.md)
- [Scopes](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Scopes.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Sessions.md)
- [Themes](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Themes.md)
- [Users](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Providers.md)
- [Workspaces](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Workspaces.md)
