import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  Poster,
  Page,
} from 'wga-theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateUserPassword: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlUpdateUser = useUpdateUser()
  const schema = useSchema({
    schema: SchemaUpdateUser,
    submit: value => {
      gqlUpdateUser
        .fetch({ id, value })
        .then(({ user }) => change && change(user.id))
    },
  })
  return create(Page, {
    title: 'Change Password',
    subtitle: 'User',
    children: [
      create(Poster, {
        key: 'poster',
        icon: 'unlock',
        label: 'Password',
        helper: 'Change password for user',
      }),
      create(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: [
          create(Control, {
            key: 'password',
            label: 'Password',
            helper: 'Please use more than 6 characters',
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
            label: 'Update',
            loading: gqlUpdateUser.loading,
            disabled: !schema.valid,
            click: schema.submit,
          }),
        ],
      }),
    ],
  })
}

const SchemaUpdateUser = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Password is required'),
})

const useUpdateUser = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation UpdateUser($id: String!, $value: UpdateUserValue!) {
      user: UpdateUser(id: $id, value: $value) {
        id
      }
    }
  `,
})
