# Gadgets

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The authenticator gadgets provide the quickest solution to account & group management.

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

The gadgets store an internal state which contains your account, session, and group details.

- [account]() `object?`: the current authenticated account.
- [group]() `object?`: the current group selected by the account.
- [session]() `object?`: the current account's authentication session containing access token.
- [permissions]() `object[]?`: the permission's assigned to the current account with this group.
- [membership]() `object?`: the membership relation between the account and group.

## Listen to state changes

Used when updating your app's current auth state.

```ts
const unlisten = gadgets.listen(state => console.log(state))
```

Parameters.

- callback `function`: fired with the [gadgets state](#Gadgets-state) every time it updates.

Returns.

- unlisten `function`: call this when you want to stop listening to state changes.

**Note:** the gadgets state is set as `undefined` when the account is not authenticated.

## Render the gadgets

Used to authenticate and manage a account and their groups.

```ts
gadgets.render({
  open: 'login',
  events: {
    login: ({ account }) => window.location.assign(`app.example.com/account/${account.id}`),
    signup: ({ account }) => window.location.assign(`app.example.com/account/${account.id}?introduction=true`),
  },
})
```

Properties.

- open `string?`: the suggested gadgets screen to open when unauthenticated.
  - `login`: login a account.
  - `signup`: create a account.
- events `object?`: gadget events fired when they occur.
  - login `function`: fired after a account logs in.
  - signup `function`: fired after a account signs up.

## Theming

Type definition of Theme.

```ts
interface Theme {
  inputs: {
    base: {
      backgroundColor: string;
      disabledColor: string;
      letterColor: string;
      borderColor: string;
      padding: number;
      shadow: string;
    }
    error: {
      backgroundColor: string;
      letterColor: string;
      borderColor: string;
    }
  }
  sidebar {
    base {
      backgroundColor: string;
      iconColor: string;
      padding: string;
    }
  }
  heading {
    base {
      backgroundColor: string;
      letterColor: string;
      padding: string;
    }
  }
  gadgets {
    base {
      backgroundColor: string;
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
   * If the account is logged in, show the authenticated routes.
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
