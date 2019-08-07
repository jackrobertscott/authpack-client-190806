# Users

> Authenticator 🏇 Fastest way to add auth to your apps

## Model

The `User` model identifies a single person who has signed up to your app.

Properties.

- id `string`: unique identifier.
- name `string`: the user's fullname.
- email `string`: validated against email regex.
- username `string`: unique code.
- password `string`: encrypted string.
- created `date`: time of creation.
- updated `date`: time of last update.
- data `object?`: developer assigned attributes.

## Methods

### User Create

Used to sign up a user on your app.

```ts
authenticator.users.create({
    name: 'Fred Blogs',
    email: 'fredBlogs@example.com',
    username: 'freddy123',
    password: authenticator.utils.encrypt('SecretPassword123'),
    data: {
      dogsName: 'Bobby',
    },
  })
  .then(user => console.log(`Created: ${user.name} at ${user.created}.`))
  .catch(error => console.log`Error: ${error.message}`))
```

Options

- name `string`: full name.
- email `string`: email address.
- password `string`: unencrypted password.
- username `string`: unique phrase.

Returns

- [User](#model) `object`: the created user.

### User Update

### User Query

### User Retrieve

### User Remove
