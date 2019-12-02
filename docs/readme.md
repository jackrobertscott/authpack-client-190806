# Authpack

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The authenticator gadgets provide the quickest solution to user & team management.

- [Setup](#Setup)
- [Gadgets state](#Gadgets-state)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your codebase - use environment variables.

```ts
import { AuthenticatorGadgets } from 'wga-gadgets';

const gadgets = new AuthenticatorGadgets({
  id: process.env.authenticatorId,
  token: localStorage.get('token'),
});
```

Properties.

- id `string`: your app's id which is located in your *[authenticator settings.](https://wga.windowgadgets.io)*
- token `string`: the initial authenticator session token used.
