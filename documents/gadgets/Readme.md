# Providers API

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The authenticator gadgets provide user management so your don't have to.

- [Setup](#Setup)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your code base - use environment variables.

```ts
import { AuthenticatorGadgets } from 'wga-gadgets';

const gadgets = new AuthenticatorGadgets({
  id: process.env.authenticatorId,
});
```
