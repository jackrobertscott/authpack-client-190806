import * as yup from 'yup'
import { createElement as element, FC } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
  useToaster,
  Page,
} from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const UpdateUserPassword: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const settings = useSettings()
  const gqlUpdatePassword = useUpdatePassword()
  const schema = useSchema({
    schema: SchemaUpdatePassword,
    submit: value => {
      gqlUpdatePassword.fetch(value).then(({ user }) => {
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
    subtitle: settings.cluster && settings.cluster.name,
    children: [
      element(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: [
          element(Control, {
            key: 'password_current',
            label: 'Current Password',
            error: schema.error('password_current'),
            children: element(InputString, {
              value: schema.value('password_current'),
              change: schema.change('password_current'),
              placeholder: '* * * * * * * *',
              password: true,
            }),
          }),
          element(Control, {
            key: 'password_new',
            label: 'New Password',
            helper: 'Please use more than 6 characters',
            error: schema.error('password_new'),
            children: element(InputString, {
              value: schema.value('password_new'),
              change: schema.change('password_new'),
              placeholder: '* * * * * * * *',
              password: true,
            }),
          }),
          element(Button, {
            key: 'submit',
            label: 'Change',
            loading: gqlUpdatePassword.loading,
            disabled: !schema.valid,
            click: schema.submit,
          }),
        ],
      }),
    ],
  })
}

const SchemaUpdatePassword = yup.object().shape({
  password_current: yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Password is required'),
  password_new: yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Password is required'),
})

const useUpdatePassword = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation UpdateUserPasswordClient($password_current: String!, $password_new: String!) {
      user: UpdateUserPasswordClient(password_current: $password_current, password_new: $password_new) {
        id
      }
    }
  `,
})
