![Authpack](https://raw.githubusercontent.com/jackrobertscott/authpack/master/docs/assets/banner.png)

![npm](https://img.shields.io/npm/v/@authpack/sdk) ![language](https://img.shields.io/badge/language-typescript-blue) ![build](https://img.shields.io/badge/build-passing-green)

## Features

[Authpack](https://authpack.io) is a complete user and team management system for your app.

- 🔥 Fast render speeds.
- 🛠 Less than 8 lines of code.
- ⚛️ Complete GraphQL API.
- 🎉 SDKs for JS, React, and Vue.
- 😻 One-click social login.
- 🔒 Encrypted passwords.
- 💻 All screen sizes.
- 👨‍💻 TypeScript property hinting.
- 👩‍👧‍👦 Team membership support.
- ✌️ More coming soon...

**Note:** we have open sourced our client side code in this repository. Feel free to explore our code and learn how we built Authpack's dashboard and gadgets. The Authpack API and backend logic will *remain private* and is not included in this repository.

## Example

Create the gadgets used to authenticate users.

```ts
const authpack = new window.Authpack({
  key: 'wga-client-key-...',
})
```

Add an event listener which will observe the current user state.

```ts
authpack.gadgets.listen(({ ready, bearer, user, team }) => {
  if (ready && user) {
    console.log(user)
  }
})
```

Show the gadgets to the current user to log them in.

```ts
authpack.gadgets.show()
```

Authpack was designed to be simple, fast, and beautiful.

## Links

- [Website](https://authpack.io)
- [Dashboard](https://v1.authpack.io)