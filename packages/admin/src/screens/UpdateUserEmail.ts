import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import {
  useSchema,
  Poster,
  Layout,
  Control,
  InputString,
  Button,
  Page,
  useToaster,
} from 'wga-theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateUserEmail: FC<{
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
          helper: 'Email has been changed',
        })
      })
    },
  })
  return create(Page, {
    title: 'Email',
    subtitle: 'User',
    children: [
      create(Poster, {
        key: 'poster',
        icon: 'at',
        label: 'Change Email',
        helper: 'User will need to reverify their account',
      }),
      create(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: [
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
  email: yup
    .string()
    .email('Please use a valid email address')
    .required('Email is required'),
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
