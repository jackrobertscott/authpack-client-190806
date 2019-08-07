# 🏇 Authenticator

> The fastest way to add auth to your app

## Table of Contents

- Gettings Started Guide
- Authenticator App Boilerplate
- API

## API

The API provides you with full access to the Authenticator.

```shell
npm i --save wga-api
```

You can create a completely custom authentication system and dashboard.

```ts
const userCreate = userForm => authenticator.users.create({
    appId: app.id,
    username: userForm.username,
    password: authenticator.utils.encrypt(userForm.password),
    email: userForm.email,
    name: userForm.name,
    data: {
      time: Date.now()
      phone: userForm.phone,
      category: 'drivers',
    },
  })
  .then(user => console.log(`${user.name} logged in.`))
  .catch(error => console.log(`Error: ${error}`))
```

```ts
return Button({
  label: 'Create',
  click: userCreate(userForm) // call multiple times
});
```

```ts
switch (platform) {
  case 'react':
    setUser(user)
    break
  case 'vue':
    this.user = user;
    break
  case 'express':
    res.render('index', {
      title: 'Hey',
      message: 'Hello there!',
    })
    break
}
```
