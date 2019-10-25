# 🏇 Authenticator API

> User and team management for your app

This repository provides JavaScript helper methods which may be used to access the Authenticator API.

## Features

- 🔥  Works in [Node](https://nodejs.org/en/) and on the browser.
- ⚡️  Simple integration with [React](https://reactjs.org), [Vue](https://vuejs.org/), and other browser libraries.
- 👾  Write, send, and handle [GraphQL](https://graphql.org/) queries.
- 🏋️‍  Supports [TypeScript](https://www.typescriptlang.org/) and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

## Install

Using [npm](https://www.npmjs.com/package/wga-api).

```shell
npm i --save wga-api
```

Using yarn.

```shell
yarn add wga-api
```

## Setup

Start by importing the `AuthenticatorAPI` class.

```ts
import { AuthenticatorAPI } from 'wga-api'
```

Use your app's security key to create a new instance of the class. A secret security key can be found in your [Authenticator](https://authenticator.windowgadgets.io/) app settings.

```ts
const wga = new AuthenticatorAPI({
  secret: process.env.WGA_SECRET_KEY,
})
```

**Note:** never store your secret key directly in your code as it can be a security vulnerability. Use a package such as [dotenv](https://www.npmjs.com/package/dotenv) to store your application secrets as environment variables.

## Usage

The `wga-api` library was designed to be flexible. Use the `.create()` method to create a new graphql dispatcher.

```ts
const retrieveUser = wga.create<{
  variables: {
    id: string,
  }
  data: {
    user: {
      id: string
      created: string
      updated: string
      name: string
      email: string
      username: string
      meta: { [key: string]: any }
    }
  }
}>({
  name: 'RetrieveUser',
  graphql: `
    query RetrieveUser($id: String) {
      user: RetrieveUser($id: string) {
        id
        created
        updated
        name
        email
        username
        meta
      }
    }
  `
})
```

Use the `.run(variables)` method to send the graphql query.

```ts
retrieveUser.run({ id: '1234567890' })
  .then(data => {
    console.log(`User created at ${data.user.created}`)
  })
  .catch(error => {
    console.log(`An error occurred: ${error.message}`)
  })
```

You can also listen to all incoming events from this dispatcher by using the `.listen(data)` method.

```ts
const unlisten = retrieveUser.listen(data => {
  console.log(`User created at ${data.user.created}`)
})
```

This can be helpful when building using a library such as React hooks.

```tsx
const ShowUser = props => {
  const [user, setUser] = useState()
  useEffect(() => {
    return retrieveUser.listen(data => {
      setUser(data.user)
    })
  }, [])
  return (
    <div>
      <button onClick={() => retrieveUser.run({ id: props.id })}>
        Load User
      </button>
      <pre><code>{JSON.stringify(user, null, 2)}</code></pre>
    <div>
  )
}
```

Created with ❤️ by [Window Gadgets](https://authenticator.windowgadgets.io/).
