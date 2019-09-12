# 🏇 Authenticator API

> The fastest way to add auth to your app

This repository provides JavaScript helper methods which correspond to the Authenticator API.

## Install

Using [npm](https://www.npmjs.com/package/wga-api).

```shell
npm i --save wga-api
```

Using yarn.

```shell
yarn add wga-api
```

## Setup

An secret key can be found in your [Authenticator workspace](https://windowgadgets.io/).

```ts
import { Authenticator } from 'wga-api'

export const authenticator = new Authenticator({
  secret: process.env.WGA_SECRET_KEY,
})
```

**Note:** never store your secret key directly in your code as it can be a security vulnerability. Use a package such as [dotenv](https://www.npmjs.com/package/dotenv) to store your application secrets as environment variables.

## Usage

The official Authenticator docs can be found [here](https://github.com/jackrobertscott/authenticator).

```ts
import { authenticator } from '../my-utils/authenticator.ts'

authenticator.accounts.create({
    email: 'example@email.com',
    password: 'SuperSecretPassword123',
    name: 'Fred Blogs',
  })
  .then(account => console.log(`Account created at ${account.created}`))
  .catch(error => console.log(`An error occurred: ${error.message}`))
```

## Resources

- [Accounts](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/accounts.md)
- [Groups](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/groups.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/sessions.md)
