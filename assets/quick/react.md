# Unstable 🚧 React Quick Start

> [Authpack](https://authpack.io) 🔒 A complete user and team management system

Simple integration with client side React apps.

## 1. Install

Install using npm or yarn.

```shell
npm i --save @authpack/react
```

Under the hood, the `@authpack/react` library contains the `@authpack/sdk` and adds some helpers for using with React.

## 2. Authpack Provider

Wrap your app component in the `Authpack.Provider` component.

```tsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Authpack from '@authpack/react'
import { App } from './components/App'

const Root = () => {
  return (
    <Authpack.Provider
      value={{ key: 'wga-client-key-0ef07c825de20cc322d839819' }}>
      <App />
    </Authpack.Provider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
```

The `value` property will be used to construct the Authpack [gadgets](https://github.com/jackrobertscott/authpack-client/blob/master/docs/quick/sdk.md).

## 3. Authpack Gadgets

Access the your Authpack gadgets via the `useGadgets()` hook.

```tsx
import * as React from 'react'
import { useGadgets } from '@authpack/react'

export const Login = () => {
  const gadgets = useGadgets()
  return (
    <div>
      <h1>Login</h1>
      <p>Please sign in to your account.</p>
      <button onClick={() => gadgets.show()}>Login</button>
    </div>
  )
}
```

You can see the full set of gadgets methods [here](https://github.com/jackrobertscott/authpack-client/blob/master/docs/quick/sdk.md).

## 4. Authpack State

Use the `useAuthpack()` hook where ever you wish to access the authpack state.

```tsx
import * as React from 'react'
import { useGadgets, useAuthpack } from '@authpack/react'
import { Login } from './Login'

export const App = () => {
  const gadgets = useGadgets()
  const { ready, bearer, user } = useAuthpack()
  if (!ready) {
    return <div>Loading...</div>
  }
  if (!user) {
    return <Login />
  }
  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <p>Your bearer token is: {bearer}</p>
      <button onClick={() => gadgets.show()}>View Account</button>
      <button onClick={() => gadgets.exit()}>Logout</button>
    </div>
  )
}
```

The authpack full authpack state can be seen [here](https://github.com/jackrobertscott/authpack-client/blob/master/docs/quick/state.md).

## Links

- [Home](https://github.com/jackrobertscott/authpack-client)
- [Website](https://authpack.io)
- [Dashboard](https://v1.authpack.io)