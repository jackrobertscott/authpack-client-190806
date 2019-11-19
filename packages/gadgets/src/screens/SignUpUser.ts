import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
  testAlphanumeric,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { SettingsStore } from '../utils/settings'
import { createUseServer } from '../hooks/useServer'

export const SignupUser: FC = () => {
  const settings = useSettings()
  const gqlSignupUser = useSignupUser()
  const schema = useSchema({
    schema: SchemaSignupUser,
    submit: value => {
      gqlSignupUser.fetch(value).then(({ session }) => {
        schema.change('password')('')
        SettingsStore.update({
          bearer: `Bearer ${session.token}`,
        })
      })
    },
  })
  return create(Gadgets, {
    title: 'Sign Up',
    subtitle: settings.app && settings.app.name,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Layout, {
          key: 'name',
          divide: true,
          media: true,
          children: [
            create(Control, {
              key: 'given_name',
              label: 'First Name',
              error: schema.error('given_name'),
              children: create(InputString, {
                value: schema.value('given_name'),
                change: schema.change('given_name'),
                placeholder: 'Fred',
              }),
            }),
            create(Control, {
              key: 'family_name',
              label: 'Last Name',
              error: schema.error('family_name'),
              children: create(InputString, {
                value: schema.value('family_name'),
                change: schema.change('family_name'),
                placeholder: 'Blogs',
              }),
            }),
          ],
        }),
        create(Control, {
          key: 'username',
          label: 'Username',
          error: schema.error('username'),
          children: create(InputString, {
            value: schema.value('username'),
            change: schema.change('username'),
            placeholder: 'example-username-123',
          }),
        }),
        create(Control, {
          key: 'email',
          label: 'Email',
          error: schema.error('email'),
          children: create(InputString, {
            value: schema.value('email'),
            change: schema.change('email'),
            placeholder: 'example@email.com',
          }),
        }),
        create(Control, {
          key: 'password',
          label: 'Password',
          error: schema.error('password'),
          children: create(InputString, {
            value: schema.value('password'),
            change: schema.change('password'),
            placeholder: '* * * * * * * *',
            password: true,
          }),
        }),
        create(Button, {
          key: 'submit',
          label: 'Login',
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaSignupUser = yup.object().shape({
  given_name: yup.string(),
  family_name: yup.string(),
  username: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    )
    .required('Please provide your username'),
  email: yup
    .string()
    .email('Please make sure you have used a valid email address')
    .required('Please provide your email'),
  password: yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Please provide your password'),
})

const useSignupUser = createUseServer<{
  session: {
    id: string
    token: string
  }
}>({
  query: `
    mutation wgaSignupUser($email: String!, $password: String!, $username: String, $given_name: String, $family_name: String) {
      session: wgaSignupUser(email: $email, password: $password, username: $username, given_name: $given_name, family_name: $family_name) {
        id
        token
      }
    }
  `,
})
