# React Quickstart

> [Authpack](https://authpack.io) 🔒 A complete user and team management system

We designed Authpack to be as simple as possible to integrate with React.

## Step 1

Start by installing the gadgets like normal.

### Install

```shell
npm i --save @authpack/sdk
```

### Setup

```ts
import * as Authpack from '@authpack/sdk'

export const authpack = new Authpack.Gadgets({
  key: 'wga-client-key-...',
})
```

## Step 2

As good practise, we will create a context which our components can access. React context provides the following benifits.

- Only need to create one authpack listener.
- Keeps all our data in sync.
- Prevents app from refreshing unnecessarily down dom tree.

```ts
export const AuthpackContext = React.createContext(authpack.current())
```

## Step 3

Create a component which will give the Authpack data to the context we just created.

```tsx
export const AuthpackProvider = () => {
  const [value, valueChange] = React.useState(authpack.current())
  React.useEffect(() => {
    return authpack.listen(value => valueChange(value))
  }, [authpack])
  return <AuthpackContext.Provider value={value} />
}
```

Then wrap you root app component in the `AuthpackProvider` component.

```tsx
const Root = () => {
  return (
    <AuthpackProvider>
      <App />
    </AuthpackProvider>
  )
}
```

## Step 4

Create a hook which allow you to listen to the authpack state.

```ts
export const useAuthpack = () => {
  return React.useContext(AuthpackContext)
}
```

## Step 5

Use the Authpack hook where ever you wish to access the authpack state.

```tsx
const App = () => {
  const { ready, user } = useAuthpack()
  if (!ready) {
    return <div>Loading</div>
  }
  if (!user) {
    return <div onClick={() => authpack.show()}>Login</div>
  }
  return <div>Current user email: {user.email}</div>
}
```

## Links

- [Quickstart](https://github.com/jackrobertscott/authpack)
- [Authpack Website](https://authpack.io)
- [Authpack Dashboard](https://v1.authpack.io)