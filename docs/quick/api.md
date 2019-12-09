# API Quick Start

> [Authpack](https://authpack.io) 🔒 A complete user and team management system

Simple integration with our GraphQL API.

## GraphQL

Our API was built in GraphQL because of the following advantages.

1. Access via simple HTTP request which means it works with all server languages i.e. Java, PHP, Ruby, Node, etc.
2. GraphQL lets you choose exact fields, thus reducing payload sizes and improving speed and performance.
3. All requests are handled by a single endpoint, allow us to make the API super secure.

You can see a quick overview on how GraphQL works [here](https://graphql.org/learn/queries/).

## Example

Here is quick example of how you can get a list of users from Authpack.

```gql
query {
  users: ListUsers(options: { limit: 10 }) {
    id
    email
    username
    teams {
      id
      name
    }
  } 
}
```

You can test out his GraphQL query from within the Authpack dashboard in the **developers** area.

## Requirements

The following is required to make a request to the Authpack API.

- url: `https://api.v1.authpack.io`
- method: `post`
- headers
  - `Content-Type`: `application/json`
  - `Authorization`: client or secret key + bearer token - seperated by `,` (comma).
- body
  - `query: string` the GraphQL query.
  - `variables?: object` the variables required by query.
  - `operationName?: string` optional operation name to identify GraphQL operation.

**Note:** these values are shared on both the server and client, the exception being that the client key is used on the browser and secret key on the server.

## Authorization

Every request to the API must contain either a client *or* secret key which can be found in **settings**.

- `wga-client-key-...` can be used in the browser.
- `wga-secret-key-...` *never* use in browser - store securely on your server.

Some of the `*Client` routes also require a bearer token to identify the current user.

- `Bearer ...`

You can see more details about Authpack's security [here](https://github.com/jackrobertscott/authpack/blob/master/docs/quick/security.md).

## Axios

The following demonstrates how you can use [axios](https://github.com/axios/axios) to make a request to the Authpack API and login a user.

```ts
import axios from 'axios'

const { data } = await axios({
  url: 'https://api.v1.authpack.io',
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'wga-client-key-...',
  },
  data: {
    query: `
      mutation LoginUserClient($email: String!, $password: String!) {
        session: LoginUser(email: $email, password: $password) {
          token
        }
      }
    `,
    variables: {
      email: 'example@email.com',
      password: 'SuperSecret12345'
    },
  },
})

console.log(data.session.token)
```

You will also need to add the origin of the request to whitelisted domains in the Authpack dashboard settings area.

## Links

- [Home](https://github.com/jackrobertscott/authpack)
- [Website](https://authpack.io)
- [Dashboard](https://v1.authpack.io)