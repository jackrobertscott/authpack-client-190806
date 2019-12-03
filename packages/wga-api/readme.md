# 🏇 Depreciated: Authpack API

> Simple user and team management API for your app

Helper methods which may be used to access the Authpack API using GraphQL.

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

Start by importing the `AuthpackAPI` class.

```ts
import { AuthpackAPI } from 'wga-api'
```

A secret security key can be found in your [Authpack](https://v1.authpack.io) app settings.

```ts
const wga = new AuthpackAPI({
  secret: process.env.WGA_SECRET_KEY,
})
```

**Note:** use a package such as [dotenv](https://www.npmjs.com/package/dotenv) to securely store your secret variables.

## Credits

Created with ❤️ by [Authpack](https://v1.authpack.io).
