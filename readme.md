![Authpack](https://raw.githubusercontent.com/jackrobertscott/authpack/master/docs/assets/banner.png)

![npm](https://img.shields.io/npm/v/wga-plugin) ![language](https://img.shields.io/badge/language-typescript-blue) ![build](https://img.shields.io/badge/build-passing-green)

## Features

[Authpack](https://authpack.io) is a complete user and team management system for your app.

- 🔥 Built to be fast.
- 🛠 Setup with less than 8 lines of code.
- 🎉 Works with all JS libraries including React, Vue, and more.
- 😻 Login with Facebook, GitHub, Google, and more.
- 🔒 Encrypted password protection.
- ⚛️ Complete GraphQL API.
- 💻 Responsive design works on all screen sizes.
- 👨‍💻 TypeScript property hinting.
- 👩‍👧‍👦 Teams and access permissions built in.
- ✌️ More coming soon...

2019 Release.

## Table of Contents

- [Gadgets](#gadgets)
- [API](#api)

## Gadgets

Authpack Gadgets provide you with a premade login system.

**Install**

```shell
npm i --save wga-plugin
```

**Setup**

Using ES6 imports.

```ts
import * as Authpack from 'wga-plugin'

export default const authpack = new Authpack.Gadgets({
  key: 'AUTHPACK_CLIENT_KEY',
})
```

Using ES5 require.

```js
const Authpack = require('authpack')

module.exports.authpack = new Authpack.Gadgets({
  key: 'AUTHPACK_CLIENT_KEY',
})
```

**Teams**

To enable teams, pass the following options.

```ts
const authpack = new Authpack.Gadgets({
  key: 'AUTHPACK_CLIENT_KEY',
  enable_teams: true,
  prompt_teams: true,
})
```

- `enable_teams` [boolean]: will enable the teams tab once the user has authenticated.
- `prompt_teams` [boolean]: will prompt the user to create a team once authenticated.

## Security

Authpack providers you with 2 different authentication keys; a client key and a secret key. The client key is safe to use on the browser. **Never use your secret key on the browser.** We also highly recommend you store both your client and secret keys as an environment variables.

**Resources**

- [dotenv - Node.js Environment Variables](https://www.npmjs.com/package/dotenv)
- [Zeit Now - Environment Variables and Secrets](https://zeit.co/docs/v2/environment-variables-and-secrets)
- [Create React App - Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Vue JS - Environment Variables](https://cli.vuejs.org/guide/mode-and-env.html)

## Links

- [Authpack Website](https://authpack.io)
- [Authpack Dashboard](https://v1.authpack.io)