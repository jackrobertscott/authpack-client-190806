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

**Note:** we have open sourced our client side code in this repository. Feel free to explore our code and learn how we built Authpack's dashboard and gadgets. The Authpack API and backend logic will remain private and is not included in this repository.

## Table of Contents

- [Gadgets](#gadgets)
- [Usage](#usage)
- [Security](#security)
- [Links](#links)

## Gadgets

Authpack Gadgets provide you with a premade login system.

### Install

```shell
npm i --save wga-plugin
```

### Setup

```ts
import * as Authpack from 'wga-plugin'

export const authpack = new Authpack.Gadgets({
  key: 'wga-client-key-...',
})
```

### Teams

To enable teams, pass the following options.

```ts
const authpack = new Authpack.Gadgets({
  key: 'wga-client-key-...',
  enable_teams: true,
  prompt_teams: true,
})
```

- `enable_teams` `boolean`: will enable the teams tab once the user has authenticated.
- `prompt_teams` `boolean`: will prompt the user to create a team once authenticated.

## Usage

The Authpack gadgets store a single state object. This object will contain the current user, team, session, permissions, bearer token etc. As the user interacts with the gadgets, this state object will be mutated. You may listen to this state object and update your app accordingly.

### Methods

**Listen** to gadgets state.

```ts
authpack.listen((state) => {
  if (state.ready) {
    if (state.user) {
      console.log(`User email: ${state.user.email}`)
    } else {
      console.log(`No user is currently authenticated`)
    }
  }
})
```

**Show** the gadgets.

```ts
authpack.show()
```

**Hide** the gadgets.

```ts
authpack.hide()
```

**Logout** the user manually.

```ts
authpack.exit()
```

**Get** the current state object.

```ts
authpack.current()
```

## Security

Authpack providers you with 2 different authentication keys; a client key and a secret key. The client key is safe to use on the browser. **Never use your secret key on the browser.** We also highly recommend you store both your client and secret keys as an environment variables.

### Resources

- [dotenv - Node.js Environment Variables](https://www.npmjs.com/package/dotenv)
- [Zeit Now - Environment Variables and Secrets](https://zeit.co/docs/v2/environment-variables-and-secrets)
- [Create React App - Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Vue JS - Environment Variables](https://cli.vuejs.org/guide/mode-and-env.html)

## Links

- [React Tutorial](https://github.com/jackrobertscott/authpack/tree/master/docs/react.md)
- [Authpack Website](https://authpack.io)
- [Authpack Dashboard](https://v1.authpack.io)