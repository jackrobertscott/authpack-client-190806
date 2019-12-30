import * as yup from 'yup'
import { createElement as element, FC } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  Poster,
  Page,
  useToaster,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateUserPassword: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlUpdateUser = useUpdateUser()
  const schema = useSchema({
    schema: SchemaUpdateUser,
    submit: value => {
      gqlUpdateUser.fetch({ id, value }).then(({ user }) => {
        if (change) change(user.id)
        schema.reset()
        toaster.add({
          icon: 'check',
          label: 'Success',
          helper: 'Password has been changed',
        })
      })
    },
  })
  return element(Page, {
    title: 'Password',
    subtitle: 'User',
    children: [
      element(Poster, {
        key: 'poster',
        icon: 'unlock',
        label: 'Change Password',
        helper: 'Passwords are encrypted',
      }),
      element(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: [
          element(Control, {
            key: 'password',
            label: 'Password',
            helper: 'Please use more than 6 characters',
            error: schema.error('password'),
            children: element(InputString, {
              value: schema.value('password'),
              change: schema.change('password'),
              placeholder: '* * * * * * * *',
              password: true,
            }),
          }),
          element(Button, {
            key: 'submit',
            label: 'Submit',
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
