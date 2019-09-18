# Gadgets

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The authenticator gadgets provide the quickest solution to user & group management.

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

## Gadgets state

The gadgets store an internal state which contains your user, session, and group details.

- [user]() `object?`: the current authenticated user.
- [group]() `object?`: the current group selected by the user.
- [session]() `object?`: the current user's authentication session containing access token.
- [permissions]() `object[]?`: the permission's assigned to the current user with this group.
- [membership]() `object?`: the membership relation between the user and group.

## Listen to state changes

Used when updating your app's current auth state.

```ts
const unlisten = gadgets.listen(state => console.log(state))
```

Parameters.

- callback `function`: fired with the [gadgets state](#Gadgets-state) every time it updates.

Returns.

- unlisten `function`: call this when you want to stop listening to state changes.

**Note:** the gadgets state is set as `undefined` when the user is not authenticated.

## Render the gadgets

Used to authenticate and manage a user and their groups.

```ts
gadgets.render({
  open: 'login',
  events: {
    login: ({ user }) => window.location.assign(`app.example.com/user/${user.id}`),
    signup: ({ user }) => window.location.assign(`app.example.com/user/${user.id}?introduction=true`),
  },
})
```

Properties.

- open `string?`: the suggested gadgets screen to open when unauthenticated.
  - `login`: login a user.
  - `signup`: create a user.
- events `object?`: gadget events fired when they occur.
  - login `function`: fired after a user logs in.
  - signup `function`: fired after a user signs up.

## Theming

Type definition of Theme.

```ts
interface Theme {
  inputs: {
    base: {
      background: string;
      disabledColor: string;
      letterColor: string;
      borderColor: string;
      padding: number;
      shadow: string;
    }
    error: {
      background: string;
      letterColor: string;
      borderColor: string;
    }
  }
  sidebar {
    base {
      background: string;
      iconColor: string;
      padding: string;
    }
  }
  heading {
    base {
      background: string;
      letterColor: string;
      padding: string;
    }
  }
  gadgets {
    base {
      background: string;
      letterColor: string;
      padding: string;
    }
  }
}
```

## React

Example code for using the gadgets in a React app.

```tsx
const RouterComponent = () => {
  /**
   * Create a state object which will be populated by the gadgets.  
   */
  const [authState, setAuthState] = useState();
  /**
   * Listen to the gadgets state and update the auth state object.
   */
  useEffect(() => {
    return gadgets.listen(state => {
      setAuthState(state);
      if (state) {
        localStorage.set('token', state.session.token);
      }
    })
  }, [gadgets, setAuthState]);
  /**
   * If the user is logged in, show the authenticated routes.
   */
  if (authState) {
    return <AuthenticatedRoutes />;
  }
  /**
   * Show a button which will open the login screen when clicked.
   */
  return (
    <button click={() => gadgets.render()}>
      Login Or Sign Up
    </button>
  );
}
```
