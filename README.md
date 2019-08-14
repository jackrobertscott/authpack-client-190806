# 🏇 Authenticator

> The fastest way to add auth to your app

An open source repository containing the frontend components of the Window Gadgets Authenticator codebase.

## Table of Contents

- [Gadgets](#gadgets)
- [Api](#api)

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
gadgets.listen(state => state && console.table(state.account.id))
```

Protect routes.

```js
if (gadgets.access(['admin', 'editor'])) {
  console.log('User has access')
} else {
  console.log('User does not have access')
}
```

[See gadgets documents here.](https://github.com/jackrobertscott/authenticator/blob/master/documents/gadgets/gadgets.md)

## Api

The Authenticator Api let's you build a custom login system.

Install.

```shell
npm i --save wga-api
```

Configure.

```js
import { Authenticator } from 'wga-api';

const authenticator = new Authenticator({
  secret: process.env.AUTHENTICATOR_SECRET,
})
```

Create an account.

```js
/**
 * Generate an account username and password credentials.
 */
const account = await authenticator.accounts.create({
  email: 'freddy@email.com',
  username: 'freddy',
  password: 'SuperSecret123',
})
```

Create an auth token e.g. logging in or signing up an account.

```js
/**
 * Retrieve the user's account.
 */
const account = await authenticator.accounts.retrieve({
  username: 'freddy',
  password: 'SuperSecret123',
})
/**
 * Create a new authentication session.
 */
const session = await authenticator.sessions.create({
  account: account.id,
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
 * Access the account from the session.
 */
console.log(session.account.email)
```

Api models.

- [Accessors](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/accessors.md)
- [Accounts](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/accounts.md)
- [Groups](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/groups.md)
- [Memberships](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/memberships.md)
- [Permissions](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/permissions.md)
- [Providers](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/providers.md)
- [Sessions](https://github.com/jackrobertscott/authenticator/blob/master/documents/api/sessions.md)

## Resources

- [Terms](https://github.com/jackrobertscott/authenticator/blob/master/documents/legal/terms.md)
