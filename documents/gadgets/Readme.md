# Gadgets

> Authenticator 🏇 the fastest way to add auth to your apps

## Overview

The authenticator gadgets provide the quickest solution to user & workspace management.

- [Setup](#Setup)
- [Gadgets state](#Gadgets-state)

Powered by the Authenticator: *[go to app.](https://wga.windowgadgets.io)*

## Setup

Never store your private keys in your code base - use environment variables.

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

The gadgets store an internal state which contains your user, session, and workspace details.

- [user]() `object?`: the current authenticated user.
- [workspace]() `object?`: the current workspace selected by the user.
- [session]() `object?`: the current user's authentication session containing access token.
- [scopes]() `object[]?`: the scope's assigned to the current user with this workspace.
- [membership]() `object?`: the membership relation between the user and workspace.

## Listen to state changes

Used when updating your app's current auth state.

```ts
const unlisten = gadgets.listen(state => console.log(state))
```

Returns.

- unlisten `function`: call this when you want to stop listening to state changes.

## Render the gadgets

Used to authenticate and manage a user and their workspaces.

```ts
gadgets.render({
  authenticate: true,
  screen: 'user:login',
})
```

Properties.

- authenticate `boolean?`: require the user to authenticate before closing gadgets.
- screen `string?`: the suggested screen to open when the gadgets load.
  - `user:login`: login a user.
  - `user:sign-up`: create a user.
  - `user:forgotten`: recover a user's forgotten password.
  - `user:update`: update the current user.
  - `user:logout`: logout the current user.
  - `user:password`: change the current user's password.
  - `user:providers`: list the current user's OAuth accounts.
  - `user:2fa`: update the current user's 2 factor auth settings.
  - `user:sessions`: list the current user's sessions.
  - `user:danger`: remove the current user.
  - `workspace:create`: create a new workspace.
  - `workspace:update`: update the current workspace.
  - `workspace:invite`: invite a new member to current workspace.
  - `workspace:members`: list the current workspace's members.
  - `workspace:danger`: remove the current workspace.

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
  useEffect(() => gadgets.listen(setAuthState), [gadgets, setAuthState]);
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
    <button click={() => gadgets.render({ authenticate: true })}>
      Login Or Sign Up
    </button>
  );
}
```
