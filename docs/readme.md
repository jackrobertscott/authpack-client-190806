# Authpack

> Authpack 🏇 the fastest way to add auth to your apps

## Overview

The authpack gadgets provide the quickest solution to user & team management.

- [Setup](#Setup)
- [Gadgets state](#Gadgets-state)

Powered by the Authpack: *[go to app.](https://www.authpack.io)*

## Setup

Never store your private keys in your codebase - use environment variables.

```ts
import { AuthpackGadgets } from 'wga-gadgets';

const gadgets = new AuthpackGadgets({
  id: process.env.authpackId,
  token: localStorage.get('token'),
});
```

Properties.

- id `string`: your app's id which is located in your *[authpack settings.](https://www.authpack.io)*
- token `string`: the initial authpack session token used.
