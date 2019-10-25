# 🏇 Authenticator

> User and team management for your app

This repository contains example code to help you get started with the Window Gadgets Authenticator.

## Table of Contents

- [Gadgets](#gadgets)
- [API](#api)

## Gadgets

The Authenticator Gadgets provide you with a premade login system.

Install.

```shell
npm i --save wga-gadgets
```

Configure.

```js
import { Gadgets } from 'wga-gadgets';

const gadgets = new AuthenticatorGadgets({
  id: config.authenticator.id,
})
```

Render.

```js
gadgets.render({ screen: 'login' })
```

Listen to changes.

```js
gadgets.listen(state => state && console.table(state.user.id))
```

Protect routes.

```js
if (gadgets.access(['admin', 'editor'])) {
  console.log('User has access')
} else {
  console.log('User does not have access')
}
```

[See gadgets documents here.](https://github.com/jackrobertscott/authenticator/blob/master/docs/gadgets/gadgets.md)

## API

The Authenticator API let's you build a custom login system.

Install.

```shell
npm i --save wga-api
```

Configure.

```js
import { Authenticator } from 'wga-api';

const authenticator = new Authenticator({
  secret: process.env.AUTHENTICATOR_SECRET,
  devmode: false,
})
```

Create an user.

```js
/**
 * Generate an user username and password credentials.
 */
const user = await authenticator.users.create({
  email: 'freddy@email.com',
  username: 'freddy',
  password: 'SuperSecret123',
})
```

Create an auth token e.g. logging in or signing up an user.

```js
/**
 * Retrieve the user's user.
 */
const user = await authenticator.users.retrieve({
  username: 'freddy',
  password: 'SuperSecret123',
})
/**
 * Create a new authentication session.
 */
const session = await authenticator.sessions.create({
  user: user.id,
})
/**
 * Get token from session.
 */
console.log(session.token)
```

Extract a user from an auth token e.g. authenticating a server route.

```js
/**
 * Retrieve the session with this token.
 */
const session = await authenticator.sessions.retrieve({
  token: req.body.token,
})
/**
 * Access the user from the session.
 */
console.log(session.user.email)
```

API models.

- [Users](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/users.md)
- [Workspaces](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/workspaces.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/docs/api/sessions.md)

## Resources

- [Terms](https://github.com/jackrobertscott/authenticator/blob/master/docs/legal/terms.md)
