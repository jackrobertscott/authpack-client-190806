import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
  Page,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const CreateUser: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const gqlCreateUser = useCreateUser()
  const schema = useSchema({
    schema: SchemaCreateUser,
    submit: value => {
      gqlCreateUser
        .fetch({ value })
        .then(({ user }) => change && change(user.id))
    },
  })
  return create(Page, {
    title: 'New',
    subtitle: 'User',
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
              key: 'name_given',
              label: 'First Name',
              error: schema.error('name_given'),
              children: create(InputString, {
                value: schema.value('name_given'),
                change: schema.change('name_given'),
                placeholder: 'Fred',
              }),
            }),
            create(Control, {
              key: 'name_family',
              label: 'Last Name',
              error: schema.error('name_family'),
              children: create(InputString, {
                value: schema.value('name_family'),
                change: schema.change('name_family'),
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
            placeholder: 'example_username_123',
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
          loading: gqlCreateUser.loading,
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateUser = yup.object().shape({
  name_given: yup.string(),
  name_family: yup.string(),
  username: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    ),
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
    mutation CreateUser($value: CreateUserValue!) {
      user: CreateUser(value: $value) {
        id
      }
    }
  `,
})
