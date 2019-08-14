# 🏇 Authenticator

> The fastest way to add auth to your app

An open source repository containing the frontend components of the Window Gadgets Authenticator codebase.

## Table of Contents

- Gettings Started Guide
- Terms & Conditions
- Api

## Api

The Api provides you with full access to the Authenticator.

```shell
npm i --save wga-api
```

A clean and simple API design.

```ts
switch (platform) {
  case 'react':
    setAccount(account)
    break
  case 'vue':
    this.account = account;
    break
  case 'express':
    res.render('index', {
      title: 'Hey',
      message: 'Hello there!',
    })
    break
}
```
