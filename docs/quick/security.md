# Unstable 🚧 Security Quick Start

> [Authpack](https://authpack.io) 🔒 A complete user and team management system

Authpack providers you with 2 different authentication keys.

- A client key: **safe** to use on the browser.
- A secret key: **not safe** to use in the browser - keep private.

The client key has *restricted* access over on the API and will only work with routes with the `Client` suffix, for example.

- `LoginUserClient`
- `SignupUserClient`
- `GetUserClient`

The secret key has *unrestricted* access over your API and can be used for all API routes, for example.

- `LoginUserClient`
- `CreateUser`
- `ListSessions`

We highly recommend you store both your client and secret keys as an environment variables.

- [dotenv - Node.js Environment Variables](https://www.npmjs.com/package/dotenv)
- [Zeit Now - Environment Variables and Secrets](https://zeit.co/docs/v2/environment-variables-and-secrets)
- [Create React App - Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Vue JS - Environment Variables](https://cli.vuejs.org/guide/mode-and-env.html)

## Links

- [Home](https://github.com/jackrobertscott/authpack)
- [Website](https://authpack.io)
- [Dashboard](https://v1.authpack.io)