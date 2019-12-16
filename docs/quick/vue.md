# Vue Quick Start

> [Authpack](https://authpack.io) 🔒 A complete user and team management system

Simple integration with client side Vue apps.

## 1. Install

Install using npm or yarn.

```shell
npm i --save @authpack/vue
```

Under the hood, the `@authpack/vue` library contains the `@authpack/sdk` and adds some helpers for using with Vue.

## 2. Authpack Plugin

Add the `Authpack.Plugin` to your vue app.

```ts
import Vue from 'vue'
import * as Authpack from '@authpack/vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Authpack.Plugin, { key: "wga-client-key-..." })

new Vue({
  render: h => h(App)
}).$mount("#app");
```

The plugin options will be used to construct the Authpack [gadgets](https://github.com/jackrobertscott/authpack/blob/master/docs/quick/sdk.md).

## 3. Authpack Gadgets

Access the your Authpack gadgets via the `$authpack.gadgets` variable.

```html
<template>
  <div class="login">
    <h1>Login</h1>
    <p>Please sign in to your account.</p>
    <button @click="login">Login</button>
  </div>
</template>
<script>
export default {
  name: 'login',
  methods: {
    login() {
      this.$authpack.gadgets.show()
    }
  }
}
</script>
```

You can see the full set of gadgets methods [here](https://github.com/jackrobertscott/authpack/blob/master/docs/quick/sdk.md).

## 4. Authpack State

Use the `$authpack.current` variable where ever you wish to access the authpack state.

```html
<template>
  <div class="app">
    <div v-if="!$authpack.current.ready">
      <p>Loading</p>
    </div>
    <div v-else-if="!$authpack.current.user">
      <Login/>
    </div>
    <div v-else>
      <h1>Welcome {{ $authpack.current.user.email }}</h1>
      <p>Your bearer token is: {{ $authpack.current.bearer }}</p>
      <button @click="viewAccount">View Account</button>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>
<script>
import Login from './components/Login.vue'
export default {
  name: 'app',
  components: {
    Login
  },
  methods: {
    viewAccount() {
      this.$authpack.gadgets.show()
    },
    logout() {
      this.$authpack.gadgets.logout()
    }
  }
}
</script>
```

The authpack full authpack state can be seen [here](https://github.com/jackrobertscott/authpack/blob/master/docs/quick/state.md).

## Links

- [Home](https://github.com/jackrobertscott/authpack)
- [Website](https://authpack.io)
- [Dashboard](https://v1.authpack.io)