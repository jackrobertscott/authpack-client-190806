# Workspaces API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The `workspace` model is used to identify a single person who has signed up to your app.

- [Setup](#Model)
- [Workspace model](#Model)

Methods.

- [Create a workspace](#Create-a-workspace)
- [Update a workspace](#Update-a-workspace)
- [Remove a workspace](#Remove-a-workspace)
- [Retrieve a workspace](#Retrieve-a-workspace)
- [Query workspaces](#Query-workspaces)
- [Count workspaces](#Count-workspaces)
- [Analytics of workspaces](#Analytics-of-workspaces)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your code base - use environment variables.

```ts
import { Authenticator } from 'wga-api';

const authenticator = new Authenticator({
  key: process.env.wgaPrivateKey
});
```

## Workspace model

Properties.

- id `string`: unique identifier.
- created `Date`: time of creation.
- updated `Date`: time of last update.
- name `string`: full name.
- email `string`: valid email address.
- workspacename `string`: unique code.
- password `string`: encrypted string.
- avatar `string?`: url pointing to the workspaces avatar image.
- data `object?`: developer assigned attributes.

## Create a workspace

Used to sign up a workspace on your app.

```ts
authenticator.workspaces.create({
    name: 'Fred Blogs',
    email: 'fredBlogs@example.com',
    workspacename: 'freddy123',
    password: authenticator.utils.encrypt('SecretPassword123'),
    avatar: document.getElementById('fileInput').files[0],
    data: {
      // custom json attributes
    },
  })
  .then(workspace => console.log(`Created: ${workspace.name} at ${workspace.created}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- name `string`: full name.
- email `string`: valid email address.
- workspacename `string`: unique code.
- password `string`: encrypted string.
- avatar `File?`: a JavaScript [File](https://developer.mozilla.org/en-US/docs/Web/API/File) object.
- data `object?`: developer assigned attributes.

Returns.

- [workspace](#Model) `Promise<object, Error>`: the created workspace.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation CreateWorkspace($options: CreateWorkspaceOptions!) {
  workspace: CreateWorkspace(options: $options) {
    id
    name
    # ... workspace properties
  }
}
```

## Update a workspace

Used to patch a workspace's details.

```ts
authenticator.workspaces.update({
    id: workspace.id,
    name: 'Fred Blogs',
    workspacename: 'freddy123',
    email: 'fredBlogs@example.com',
    password: authenticator.utils.encrypt('SecretPassword123'),
    avatar: document.getElementById('fileInput').files[0],
    data: {
      // custom json attributes
    },
  })
  .then(workspace => console.log(`Updated: ${workspace.name} at ${workspace.updated}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string`: id of the workspace to update.
- name `string?`: full name.
- email `string?`: valid email address.
- workspacename `string?`: unique code.
- password `string?`: encrypted string.
- avatar `File?`: a JavaScript [File](https://developer.mozilla.org/en-US/docs/Web/API/File) object.
- data `object?`: developer assigned attributes.

Returns.

- [workspace](#Model) `Promise<object, Error>`: the updated workspace.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation UpdateWorkspace($options: UpdateWorkspaceOptions!) {
  workspace: UpdateWorkspace(options: $options) {
    id
    name
    # ... workspace properties
  }
}
```

## Remove a workspace

Used to permanently remove a workspace.

```ts
authenticator.workspaces.remove({
    id: membership.workspaceId,
  })
  .then(workspace => console.log(`Removed: ${workspace.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- workspacename `string?`: used when id not provided.
- email `string?`: used when neither id and workspacename are provided.

Returns.

- [workspace](#Model) `object`: the removed workspace.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
mutation RemoveWorkspace($options: RemoveWorkspaceOptions!) {
  workspace: RemoveWorkspace(options: $options) {
    id
    name
    # ... workspace properties
  }
}
```

## Retrieve a workspace

Used to get a single workspace.

```ts
authenticator.workspaces.retrieve({
    id: membership.workspaceId,
  })
  .then(workspace => console.log(`Retrieved: ${workspace.name}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- id `string?`: unique identifier.
- workspacename `string?`: used when id not provided.
- email `string?`: used when neither id and workspacename are provided.

Returns.

- [workspace](#Model) `object`: the workspace requested.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query RetrieveWorkspace($options: RetrieveWorkspaceOptions!) {
  workspace: RetrieveWorkspace(options: $options) {
    id
    name
    # ... workspace properties
  }
}
```

## Query workspaces

Used to get a list of workspaces.

```ts
authenticator.workspaces.query({
    search: 'Fred',
    limit: 10,
    skip: 5,
    page: 0,
  })
  .then(workspaces => console.table(workspaces))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, workspacename, and email.
- limit `number?`: maximum number of workspaces returned.
- skip `number?`: skip this number of workspaces.
- page `number?`: skip this number of workspaces multiplied by the limit.

**Note:** `skip` and `page` are summed when used together.

Returns.

- [workspaces](#Model) `Promise<object[], Error>`: a list of workspaces.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query QueryWorkspaces($options: QueryWorkspacesOptions!) {
  workspaces: QueryWorkspaces(options: $options) {
    id
    name
    # ... workspace properties
  }
}
```

## Count workspaces

Used to count a group of workspaces.

```ts
authenticator.workspaces.count({
    search: 'Fred',
  })
  .then(count => console.log(`Counted: ${count}`))
  .catch(error => console.warn(`Error: (${error.code}) ${error.message}`))
```

Options.

- search `string?`: compared against name, workspacename, and email.
  
Returns.

- count `number`: the number of workspaces counted.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query CountWorkspaces($options: CountWorkspacesOptions!) {
  count: CountWorkspaces(options: $options)
}
```

## Analytics of workspaces

Used to get statistics of workspaces over time.

```ts
authenticator.workspaces.analytics({
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

- analytics `object`: statistics related to workspaces within time period.
  - labels `string[]`: date values within given period.
  - data `number[]`: values matching the labels.
  - created `number`: number of workspaces created.
  - updated `number`: number of workspaces updated.
  - active `number`: number of workspaces with 1 session or more.

GraphQL version.

`POST` `https://wga.api.windowgadgets.io/graphql?access_token=...`

```graphql
query AnalyticsOfWorkspaces($options: AnalyticsOfWorkspacesOptions!) {
  analytics: AnalyticsOfWorkspaces(options: $options) {
    labels
    data
    # ... analytics properties
  }
}
```

## Resources

- [Workspaces](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Workspaces.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Sessions.md)
- [Workspaces](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Workspaces.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Memberships.md)
- [Scopes](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Scopes.md)
- [Themes](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/Themes.md)
