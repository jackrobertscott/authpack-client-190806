import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import {
  Gadgets,
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
} from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'

export const CreateUser: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const universal = useUniversal()
  const gqlCreateUser = useCreateUser()
  const schema = useSchema({
    schema: SchemaCreateUser,
    submit: value => {
      gqlCreateUser
        .fetch({ value })
        .then(({ user }) => change && change(user.id))
    },
  })
  return create(Gadgets, {
    title: 'Create User',
    subtitle: universal.appname,
    loading: gqlCreateUser.loading,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Layout, {
          key: 'name',
          divide: true,
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
          label: 'Create',
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateUser = yup.object().shape({
  given_name: yup.string().required('Please provide your given name'),
  family_name: yup.string().required('Please provide your family name'),
  username: yup.string().required('Please provide your username'),
  email: yup
    .string()
    .email('Please make sure you have used a valid email address')
    .required('Please provide your email'),
  password: yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Please provide your password'),
})

const useCreateUser = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation apiCreateUser($value: CreateUserValue!) {
      user: apiCreateUser(value: $value) {
        id
      }
    }
  `,
})
