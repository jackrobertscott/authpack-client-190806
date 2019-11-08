# 🏇 Depreciated: Authenticator API

> User and team management for your app

Helper methods which may be used to access the Authenticator API using GraphQL.

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

Start by importing the `AuthenticatorAPI` class.

```ts
import { AuthenticatorAPI } from 'wga-api'
```

A secret security key can be found in your [Authenticator](https://authenticator.windowgadgets.io/) app settings.

```ts
const wga = new AuthenticatorAPI({
  secret: process.env.WGA_SECRET_KEY,
})
```

**Note:** use a package such as [dotenv](https://www.npmjs.com/package/dotenv) to securely store your secret variables.

## Credits

Created with ❤️ by [Window Gadgets](https://authenticator.windowgadgets.io/).
